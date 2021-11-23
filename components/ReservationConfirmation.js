// ./components/ReservationForm.js

import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, Alert, ScrollView, Keyboard, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import styles from '../styling/Styles';

// Destructure navigation; passed as a property to the component.
const ReservationConfirmation = ({ navigation, route }) => {

    // For handling data passed from Schedule
    const item = route.params;
    const title = item.title;
    const authorFirstName = item.authorFirstName;
    const authorLastName = item.authorLastName;
    const patronFirstName = item.patronFirstName;
    const patronLastName = item.patronLastName;
    const patronEmail = item.patronEmail;
    const patronPhone = item.patronPhone;
    const startDate = item.startDate;
    const endDate = item.endDate;
    const pickupLibrary = item.pickupLibrary;

    // Write reservation to Firebase and navigate to confirmation page
    const handlePress = () => {      
        navigation.navigate('Dashboard');
    }

    return (
        // RESERVATION CONFIRMATION
        <SafeAreaView style = { styles.container }>

            <ScrollView onBlur = { Keyboard.dismiss }>               
            
                <Text>Your book club kit reservation has been confirmed!</Text>
                <Text>&nbsp;</Text>

                <Text>Book club kit reservation for: </Text>
                <Text><b><i>{ title }</i> by { authorFirstName } { authorLastName }</b></Text>
                <Text>&nbsp;</Text>

                <Text><b>Name</b>: { patronFirstName } { patronLastName }</Text>
                <Text><b>Email</b>: { patronEmail }</Text>
                <Text><b>Phone</b>: { patronPhone}</Text>
                <Text><b>Pickup Date</b>: { startDate }</Text>
                <Text><b>Due Date</b>: { endDate }</Text>
                <Text><b>Pickup Library</b>: { pickupLibrary }</Text>
                
                <TouchableOpacity style = { styles.button } onPress = { handlePress }>
                    <Text style = { styles.buttonText }>Return to Home</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
        
    );

}

export default ReservationConfirmation;