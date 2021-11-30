// ./components/MyReservations.js

import React, { useEffect, useState } from 'react';
import { Text, View, Alert, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase/app';
import { loggingOut } from '../firebase/FirebaseHelpers';

// Table dependencies
import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'

import styles from '../styling/Styles';

// Destructure navigation; passed as a property to the component.
const MyReservations = ({ navigation }) => {

    // Allows ID of current sign-in user
    let currentUserUID = firebase.auth().currentUser.uid;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    // For displaying book club kit collection
    const [loading, setLoading] = useState(true); // Set to true on component mount
    const [reservationList, setReservationList] = useState([]); // Initialize to empty array of reservations
  
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
                    setLastName(user.lastName);
                }
            }
        }
        getUserInfo();
        return () => { isMounted = false };
    }) // This useEffect is called every time component renders

    // Retrieve book collection from Firebase
    useEffect(() => {
        const subscriber = firebase
            .firestore()
            .collection('books')
            .orderBy('title') // Order data by title by default
            .onSnapshot(querySnapshot => {
                const retrievedBooks = [];
                querySnapshot.forEach(documentSnapshot => {
                    retrievedBooks.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id
                    });
                });

                const retrievedReservations = createReservationList(retrievedBooks);
                setReservationList(retrievedReservations);
            
                //setBooks(retrievedBooks);
                setLoading(false);
            });        
        return () => subscriber(); // Unsubscribe from events when no longer in use
    }, []); // This useEffect is called only first time component renders.
  
    const handlePress = () => {
      loggingOut();
      navigation.replace('Book Club Kit Reservations');
    };

    // Create an array holding the patron's reservations
    const createReservationList = (bookList) => {
        
        const reservationList = [];

        // Iterate through each book on booklist
        bookList.forEach((book) => {
            
            // Iterate through each reservations entry
            for (let i = 0; i < book.reservations.length; i++) {

                // If the current user's ID matches the patron ID on a reservation
                if (currentUserUID === book.reservations[i].patronID) {

                    // generate unique ID for each reservation; this is needed for React Data Grid, which requires an ID
                    const reservationID = reservationList.length;

                    let reservation = {
                        id: reservationID, 
                        title: book.title,
                        authorFirstName: book.authorFirstName,
                        authorLastName: book.authorLastName,
                        startDate: book.reservations[i].dates[0],
                        endDate: book.reservations[i].dates[20],
                        patronEmail: book.reservations[i].patronEmail,
                        patronPhone: book.reservations[i].patronPhone,
                        pickupLibrary: book.reservations[i].pickupLibrary,
                    }

                    reservationList.push(reservation);
                }
            }       
        })
        console.log('Patron reservations', reservationList)
        return reservationList;        
    }
    
    // REACT-DATA-GRID-COMMUNITY code
    // define columns
    const columns = [
        {   
            name: 'title', 
            header: 'Title',
            group: 'book',
            width: 175,
        },
        { 
            name: 'authorFirstName', 
            header: 'First Name',
            group: 'book',        
            width: 110,
        },
        { 
            name: 'authorLastName', 
            header: 'Last Name',
            group: 'book',
            width: 110,
        },
        {
            name: 'startDate',
            header: 'Start Date',
            group: 'checkout',
            width: 100,
        },
        {
            name: 'endDate',
            header: 'End Date',
            group: 'checkout',
            width: 100,
        },
        { 
            name: 'patronPhone', 
            header: 'Phone',
            group: 'checkout',        
            width: 100,
        },
        { 
            name: 'patronEmail', 
            header: 'Email',
            group: 'checkout',
            width: 200,
        },
        { 
            name: 'pickupLibrary', 
            header: 'Pickup Library',
            group: 'checkout',
            defaultFlex: 100,
        },
    ];

    const groups = [
        { name: 'book', header: 'Book and Author' },
        { name: 'checkout', header: 'Patron Checkout Details' }
    ];

    const filterValue = [
        {
            name: 'title',
            operator: 'contains',
            type: 'string',
        },
        {
            name: 'authorFirstName',
            operator: 'contains',
            type: 'string',
        },
        {
            name: 'authorLastName',
            operator: 'contains',
            type: 'string',
        },
        {
            name: 'startDate',
            operator: 'contains',
            type: 'string',
        },
        {
            name: 'endDate',
            operator: 'contains',
            type: 'string',
        },
        {
            name: 'patronPhone',
            operator: 'contains',
            type: 'string',
        },
        {
            name: 'patronEmail',
            operator: 'contains',
            type: 'string',
        },
        {
            name: 'pickupLibrary',
            operator: 'contains',
            type: 'string',
        }
    ];

    // By default, sort reservations table by chronological start date
    const defaultSortInfo = { 
        name: 'startDate',
        dir: 1,
    }

    // define grid styles
    const gridStyle = { minHeight: 550 };

    // Display reservation list as a table
    const renderPatronReservations = () => {

        return (        
                
            <ReactDataGrid
                idProperty = 'id'
                columns = { columns }
                groups = { groups }
                dataSource = { reservationList }
                style = { gridStyle }
                defaultFilterValue = { filterValue }
                defaultSortInfo={defaultSortInfo}
            />    
    
        );

    }

    return (
        <View>
            <View style = { styles.container }>
                <Text style={styles.text}>Hi, {firstName}</Text>
                <TouchableOpacity 
                    style = { styles.button }
                    onPress={handlePress}
                >
                    <Text style = { styles.buttonText }>Log Out</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Reservations for {firstName} {lastName}</Text>
                { renderPatronReservations() }
            </View>  
        </View>

    );
}

export default MyReservations;