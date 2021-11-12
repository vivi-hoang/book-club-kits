// ./components/Calendar.js

import React, { useEffect, useState } from 'react';
import { Text, View, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase/app';
import { loggingOut } from '../firebase/FirebaseHelpers';

// Calendar dependency
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { Feather } from "@expo/vector-icons";
import { addDays, addWeeks, addYears, format, parseISO } from 'date-fns';

import styles from '../styling/Styles';

// Destructure navigation; passed as a property to the component.
const Schedule = ({ navigation, route }) => {

    // For displaying a book's already reserved dates
    const item = route.params;
    const reservedDates = item.reservedDates;
    const [markedDates, setMarkedDates] = useState({});

    // Allows ID of current sign-in user
    let currentUserUID = firebase.auth().currentUser.uid;
    const [firstName, setFirstName] = useState('');
    const [userRole, setUserRole] = useState('');

    // Retrieves user info from Firebase
    useEffect(() => {
        
        // isMounted addresses error "Can't perform a React state update on an unmounted component"
        let isMounted = true;

        // Retrieve data from Firestore using query methods in doc
        async function getUserInfo() {

            if (isMounted) {
                let doc = await firebase
                    .firestore()
                    .collection('users')
                    .doc(currentUserUID)
                    .get();
        
                if (!doc.exists){
                    Alert.alert('No user data found!')
                } else {
                    // Retrieve data as key-value pair
                    let user = doc.data();
                    //console.log('Firebase UID: ' + currentUserUID);
                    //console.log('Name: ' + user.firstName + ' ' + user.lastName);
                    //console.log('Email: ' + user.email);
                    //console.log('Role: ' + user.role);
                    
                    setFirstName(user.firstName);
                    //setUserRole(user.role);
                }
            }
        }
        getUserInfo();
        return () => { isMounted = false };
    }) // This useEffect is called every time component renders

    // Display a books' unavailable dates on calendar
    useEffect(() => {

        const datesArr = [];
        const formattedDates = {}

        // Iterate through reservedDates to create array of the date ranges saved to this title
        reservedDates.forEach(dateSet => {
            datesArr.push({
                dates: dateSet.dates,
            });
        })

        // Iterate through each date range and then each date to add calendar formatting
        for (let i = 0; i < datesArr.length; i++) {
            for (let j = 0; j < datesArr[i].dates.length; j++) {
                
                if (j == 0) {
                    let date = datesArr[i].dates[j];
                    formattedDates[date] = { disabled: true, disableTouchEvent: true, startingDay: true, color: '#6A6E72', textColor: 'white' }
                } else if (j == datesArr[i].dates.length - 1) {
                    let date = datesArr[i].dates[j];
                    formattedDates[date] = { disabled: true, disableTouchEvent: true, endingDay: true, color: '#6A6E72', textColor: 'white' }
                } else {
                    let date = datesArr[i].dates[j];
                    formattedDates[date] = { disabled: true, disableTouchEvent: true, color: '#6A6E72', textColor: 'white' }
                }
            }
        }

        setMarkedDates(formattedDates);
      
    }, []); // This useEffect is called only once, the first time the component renders.

    // Highlight selected dates onPress
    const renderSelectedDates = (day) => {
        let selectedDayStart = day.dateString;
        let parsedDate = parseISO(selectedDayStart);
        
        // Add three weeks and format date as YYY-MM-DD
        let selectedDayEnd = convert(addWeeks(parsedDate, 3));

        // Check if selected dates conflict with current checkout dates
        let overlapping = datesOverlap(selectedDayStart, selectedDayEnd);

        // If the user chooses invalid dates (i.e., they overlap with current checkouts)
        // display an alert prompting user to choose again
        if (overlapping) {
            conflictingDateAlert();
        // Else append markedDates with selected dates
        } else {
            // Generate three-week checkout period with calendar formatting
            const checkoutPeriod = threeWeeks(selectedDayStart);

            // Display selected checkout period (in different color)
            setMarkedDates({...markedDates, ...checkoutPeriod});

             // Display alert confirming stsart and end date
            setTimeout(() => {
                confirmReservationAlert(selectedDayStart, selectedDayEnd);
            }, 500);

        }        
    };

    // Generate object holding 21 days / 3 weeks' worth of dates with calendar formatting
    const threeWeeks = (startDate) => {
        
        const formattedDates = {};
        const parsedStartDate = parseISO(startDate);

        for (let i = 0; i < 21; i++) {
            if (i === 0) {
                formattedDates[startDate] = { startingDay: true, color: '#415CE0', textColor: 'white' };
            } else if (i === 20) {
                const date = convert(addDays(parsedStartDate, i));
                formattedDates[date] = { endingDay: true, color: '#415CE0', textColor: 'white' };
            } else {
                const date = convert(addDays(parsedStartDate, i));
                formattedDates[date] = { color: '#415CE0', textColor: 'white' };
            }
        }
        return formattedDates;
    }

    // Check if first date or last date conflicts with any current checkout dates
    const datesOverlap = (startDate, endDate) => {        
        
        // Iterate through Firebase reservedDates to create array of the checkout date sets
        const dateSetArr = [];
        reservedDates.forEach(dateSet => {          
            dateSetArr.push({
                dates: dateSet.dates,
            });
        })

        // Iterate through date sets to extract individual dates and create array of the dates
        const datesArr = [];
        dateSetArr.forEach(dateSet => {
            for (let i = 0; i < dateSet.dates.length; i++) {
                datesArr.push(dateSet.dates[i]);
            }
        })

        // Iterate through array of dates and compare against startDate and endDate
        // Return true if start date or end date match any dates in reservedDates
        let overlapping = false;
        for (let i = 0; i < datesArr.length; i++) {           
            if (datesArr[i] === startDate || datesArr[i] === endDate) {
                overlapping = true;
            } 
        }
        return overlapping; 
    }

    const conflictingDateAlert = () => {
        alert(
            'You have chosen a start date or checkout period that conflicts with existing reservations. Please choose another start date.'
        );
    }

    const confirmReservationAlert = (startDate, endDate) => {

        // Reformat dates to be patron-friendly
        // M-D-Y with day

        alert(
            `You have chosen a checkout period starting on ${startDate} and ending on ${endDate}. Would you like to go forward with this reservation?`,
            [
                {text: 'Yes', onPress: () => console.log('Yes button clicked.')},
                {text: 'No', onPress: () => console.log('No button clicked.')},
            ],
            { cancelable: true }
        );
    }
    
    // Format generated dates as YYYY-MM-DD
    const convert = (date) => format(date, 'yyyy-MM-dd');

    // Variable to hold today's date
    const today = new Date();

    // Greeting at the top of the page
    const greeting = (firstName) => {
        if (firstName != '') {
            return (
                <Text style={styles.text}>Hi, {firstName}</Text>
            )
        } else {
            return (
                <Text style={styles.text}>You are not logged in.</Text>
            )
        }        
    };

    return (
        
        <View style = {styles.container}>

            { greeting(firstName) }

            <View style = {styles.titleContainer}>
                <Text style = {styles.itemTitle}>{ item.title }</Text>
                <Text>by { item.authorFirstName } { item.authorLastName }</Text>
                <Text style = {styles.instructions}>To reserve a kit, first <b>make sure you are logged in.</b> Tap on the start date of the three-week checkout period you'd like for the book club kit. (Grayed-out dates indicate
                    the kit is unavailable then.)
                </Text>
            </View>
            <Calendar 
                // Initially visible month. Default = Date()
                current = { today }
                // Minimum date that can be selected. Dates before minDate will be grayed out.
                minDate = { today }
                // Maximum date that can be selected. Dates after maxDate will be grayed out.
                maxDate = { addYears(today, 1) } // One year from today
                // Handler which gets executed on day press. 
                onDayPress = { renderSelectedDates }
                // Hide month navigation arrows. Default = false
                hideArrows = { false }
                // Replace default arrows with custom ones (direction can be 'left' or 'right')
                renderArrow = {(direction) => direction === 'left' ? 
                    <Feather name="arrow-left" size={24} color="black" /> : 
                    <Feather name="arrow-right" size={24} color="black" />
                }
                 // Do not show days of other months in month page. Default = false
                hideExtraDays = { true }
                // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                disableAllTouchEventsForDisabledDays = { true }
                 // Enable the option to swipe between months. Default = false
                enableSwipeMonths = { true }
                markingType = { 'period' }
                markedDates = { markedDates }
            />
        </View>
    );
}

export default Schedule;