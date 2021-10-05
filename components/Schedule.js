// ./components/Calendar.js

import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase/app';
import { loggingOut } from '../firebase/FirebaseHelpers';

// Calendar dependency
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { Feather } from "@expo/vector-icons";

import styles from '../styling/Styles';

// Destructure navigation; passed as a property to the component.
const Schedule = ({ navigation, route }) => {

    const item = route.params;
    const reservedDates = item.reservedDates;

    const [markedDates, setMarkedDates] = useState({});

    const testDates = {
        '2021-10-10': {disabled: true, disableTouchEvent: true, startingDay: true, color: '#6A6E72', textColor: 'white' },
		'2021-10-11': {disabled: true, disableTouchEvent: true, color: '#6A6E72', textColor: 'white' },
		'2021-10-12': {disabled: true, disableTouchEvent: true, endingDay: true, color: '#6A6E72', textColor: 'white' },
    }
    
    // Display a books' unavailable dates on calendar
    useEffect(() => {

        const formattedDates = {};
        reservedDates.forEach((day) => {
            formattedDates[day] = { disabled: true, disableTouchEvent: true, color: '#6A6E72', textColor: 'white' }
        });
        console.log(formattedDates);
        setMarkedDates(formattedDates);
      
    }, []); // This useEffect is called only once, the first time the component renders.

    return (
        
        <View style = {styles.container}>
            <View style = {styles.titleContainer}>
                <Text style = {styles.itemTitle}>{ item.title }</Text>
                <Text>by { item.authorFirstName } { item.authorLastName }</Text>
            </View>
            <Calendar 
                // Initially visible month. Default = Date()
                current = { Date() }
                // Handler which gets executed on day press. Default = undefined
                onDayPress = {(day) => {console.log('selected day', day)}}
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
                disableAllTouchEventsForDisabledDays={true}
                 // Enable the option to swipe between months. Default = false
                enableSwipeMonths = { true }
                markingType = { 'period' }
                markedDates = { markedDates }
                theme = {{
                    textSectionTitleDisabledColor: '#red',
                    textDisabledColor: '#green',
                }}
            />
        </View>
    );
}

export default Schedule;