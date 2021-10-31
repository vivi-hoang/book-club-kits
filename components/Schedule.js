// ./components/Calendar.js

import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase/app';
import { loggingOut } from '../firebase/FirebaseHelpers';

// Calendar dependency
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { Feather } from "@expo/vector-icons";
import dateFns from 'date-fns';

import styles from '../styling/Styles';

// Destructure navigation; passed as a property to the component.
const Schedule = ({ navigation, route }) => {

    const item = route.params;
    const reservedDates = item.reservedDates;

    //const [selectedDay, setSelectedDay] = useState({})
    const [markedDates, setMarkedDates] = useState({});

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
      
    }, [ ]); // This useEffect is called only once, the first time the component renders.

    const renderSelectedDates = (day) => {
        console.log('selected day', day)
        let selectedDate = day.dateString;
        
        // Business rules:
        // Add three weeks
        // Check if first date or last date conflicts with any current dates

        // Add three weeks

        // Append markedDates with selected dates
        setMarkedDates({...markedDates, [selectedDate]: { startingDay: true, endingDay: true, color: '#415CE0', textColor: 'white' }}); // Add to array
    };

    return (
        
        <View style = {styles.container}>
            <View style = {styles.titleContainer}>
                <Text style = {styles.itemTitle}>{ item.title }</Text>
                <Text>by { item.authorFirstName } { item.authorLastName }</Text>
            </View>
            <Calendar 
                // Initially visible month. Default = Date()
                current = { Date() }
                // Minimum date that can be selected. Dates before minDate will be grayed out.
                minDate = { Date() }
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