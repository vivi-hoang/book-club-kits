// ./components/ReservationForm.js

import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, Alert, ScrollView, Keyboard, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { storeCheckout } from '../firebase/FirebaseHelpers';

// Calendar dependency
import { addDays, addYears, format, parseISO } from 'date-fns';

import styles from '../styling/Styles';

// For dropdown
import {Picker} from '@react-native-picker/picker';

// Destructure navigation; passed as a property to the component.
const ReservationForm = ({ navigation, route }) => {

    // For handling data passed from Schedule
    const item = route.params;
    const title = item.title;
    const bookID = item.bookID;
    const authorFirstName = item.authorFirstName;
    const authorLastName = item.authorLastName;
    const patronFirstName = item.patronFirstName;
    const patronLastName = item.patronLastName;
    const patronID = item.patronID;
    const patronEmail = item.patronEmail;
    const startDate = item.startDate;
    const endDate = item.endDate;

    const [patronPhone, setPatronPhone] = useState('');
    const [pickupLibrary, setPickupLibrary] = useState('');
    const [pickupDate, setPickupDate] = useState('');
    const [dueDate, setDueDate] = useState('');

    // Parse and format incoming start and end dates
    useEffect(() => {
        const parsedStartDate = parseISO(startDate);
        const parsedEndDate = parseISO(endDate);
        const formattedStartDate = format(parsedStartDate, 'EEEE, LLLL dd, yyyy');
        const formattedEndDate = format(parsedEndDate, 'EEEE, LLLL dd, yyyy');

        setPickupDate(formattedStartDate);
        setDueDate(formattedEndDate);

    }, []); // This useEffect is called only once, the first time the component renders.

    // Format generated dates as YYYY-MM-DD
    const convert = (date) => format(date, 'yyyy-MM-dd');

    // Package data up to be appended to book entry in Firebase
    const createReservation = (startDate) => {
        let reservationObj = {};
        const datesArr = [];

        // Generate array to hold checkout dates
        const parsedStartDate = parseISO(startDate);
        for (let i = 0; i < 21; i++) {
            if (i == 0) {
                datesArr.push(startDate);
            } else {
                const date = convert(addDays(parsedStartDate, i));
                datesArr.push(date);
            }
        }
        
        // Populate reservation with patron and checkout details
        reservationObj = {
            dates: datesArr,
            patronFirstName: patronFirstName,
            patronLastName: patronLastName,
            patronID: patronID,
            patronPhone: patronPhone,
            patronEmail: patronEmail,
        }
        console.log('reservationObj', reservationObj);

        return reservationObj;
    }

    // REWRITE THIS TO STORE TO FIREBASE AS A RESERVATION
    const handlePress = () => {
        
        // Generation object to hold reservation details
        const reservationObj = createReservation(startDate);

        // Write reservation to Firebase
        storeCheckout(bookID, reservationObj);

    }

    return (
        // RESERVATION FORM
        <SafeAreaView style = { styles.container }>

            <ScrollView onBlur = { Keyboard.dismiss }>               
            
                <Text>Patron ID: { patronID }</Text>
                <Text>Book club kit reservation for: </Text>
                <Text>{ bookID }</Text>
                <Text><b><i>{ title }</i> by { authorFirstName } { authorLastName }</b></Text>
                <Text>&nbsp;</Text>

                <Text><b>Name</b>: { patronFirstName } { patronLastName }</Text>

                <Text><b>Email</b>: { patronEmail }</Text>

                <Text><b>Phone</b>:&nbsp; 
                    <TextInput
                        style = { styles.textInput }
                        placeholder = 'Phone'
                        value = { patronPhone }
                        onChangeText = {(patronPhone) => setPatronPhone(patronPhone)}
                    />
                </Text>
                
                <Text><b>Pickup Library</b>:&nbsp;
                    <Picker
                        selectedValue = { pickupLibrary }
                        onValueChange = {(itemValue, itemIndex) =>
                            setPickupLibrary(itemValue)
                        }>
                        <Picker.Item label="Alpine Township" value="Alpine Township" />
                        <Picker.Item label="Alto" value="Alto" />
                        <Picker.Item label="Amy Van Andel (Ada)" value="Amy Van Andel (Ada)" />
                        <Picker.Item label="Byron Township" value="Byron Township" />
                        <Picker.Item label="Caledonia Township" value="Caledonia Township" />
                        <Picker.Item label="Cascade Township" value="Cascade Township" />
                        <Picker.Item label="Comstock Park" value="Comstock Park" />
                        <Picker.Item label="East Grand Rapids" value="East Grand Rapids" />
                        <Picker.Item label="Englehardt (Lowell)" value="Englehardt (Lowell)" />
                        <Picker.Item label="Gaines Township" value="Gaines Township" />
                        <Picker.Item label="Grandville" value="Grandville" />
                        <Picker.Item label="Kelloggsville" value="Kelloggsville" />
                        <Picker.Item label="Kentwood (Richard L. Root)" value="Kentwood (Richard L. Root)" />
                        <Picker.Item label="Krause Memorial (Rockford)" value="Krause Memorial (Rockford)" />
                        <Picker.Item label="Nelson Township" value="Nelson Township" />
                        <Picker.Item label="Plainfield Township" value="Plainfield Township" />
                        <Picker.Item label="Spencer Township" value="Spencer Township" />
                        <Picker.Item label="Tyrone Township" value="Tyrone Township" />
                        <Picker.Item label="Walker" value="Walker" />
                        <Picker.Item label="Wyoming" value="Wyoming" />
                        <Picker.Item label="Service and Meeting Center" value="Service and Meeting Center" />
                    </Picker>
                </Text>
                
                <Text><b>Pickup Date</b>: { pickupDate }</Text>

                <Text><b>Due Date</b>: { dueDate }</Text>
                
                <TouchableOpacity style = { styles.button } onPress = { handlePress }>
                    <Text style = { styles.buttonText }>Reserve Kit</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
        
    );

}

export default ReservationForm;