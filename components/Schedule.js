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
const Schedule = ({ navigation }) => {

    return (
        
        <View style = {styles.container}>
            <View style = {styles.titleContainer}>
                <Text style = {styles.title}>CALENDAR</Text>
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
                // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                disableAllTouchEventsForDisabledDays = { true }
                 // Do not show days of other months in month page. Default = false
                hideExtraDays = { true }
                 // Enable the option to swipe between months. Default = false
                enableSwipeMonths = { true }
                markedDates = {{
                    '2021-09-29': {disabled: true},
                    '2021-09-30': {disabled: true},
                    '2021-10-01': {disabled: true}, 
                    '2021-10-02': {disabled: true},
                    '2021-10-03': {disabled: true},
                    '2021-10-04': {disabled: true},
                    '2021-10-05': {disabled: true},
                }}
            />
        </View>
    );
}

export default Schedule;