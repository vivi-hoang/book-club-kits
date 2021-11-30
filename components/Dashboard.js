// ./components/Dashboard.js

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
const Dashboard = ({ navigation }) => {

    // Allows ID of current sign-in user
    let currentUserUID = firebase.auth().currentUser.uid;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userRole, setUserRole] = useState('');

    // For displaying book club kit collection
    const [loading, setLoading] = useState(true); // Set to true on component mount
    const [books, setBooks] = useState([]); // Initialize to empty array of books
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
                    setUserRole(user.role);
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
            
                setBooks(retrievedBooks);
                setLoading(false);
            });        
        return () => subscriber(); // Unsubscribe from events when no longer in use
    }, []); // This useEffect is called only first time component renders.
  
    const handlePress = () => {
      loggingOut();
      navigation.replace('Home');
    };

    // Handles the display of the books in the FlatList
    const renderBookCard = ({ item }) => {

        return (
            <TouchableOpacity onPress = {() =>
                navigation.navigate('Book Record', { 
                    title: item.title,
                    authorFirstName: item.authorFirstName,
                    authorLastName: item.authorLastName,
                    genre: item.genre,
                    ageGroup: item.ageGroup,
                    kitContents: item.kitContents,
                    synopsis: item.synopsis,
                })
            }>
                <View style = { styles.listItem }>
                    <Text style = { styles.itemTitle }>{ item.title }</Text>
                    <Text><b>Author</b>: { item.authorFirstName } { item.authorLastName }</Text>
                    <Text><b>Genre</b>: { item.genre }</Text>
                    <Text><b>Age Group</b>: { item.ageGroup }</Text>
                    <Text><b>Kit Contents</b>: { item.kitContents }</Text>
                    <Text><b>Synopsis</b>: { item.synopsis }</Text>
                    <TouchableOpacity 
                        style = { styles.button } 
                        onPress={() => 
                            navigation.navigate('Schedule', {
                                id: item.key, // Document ID saved to retrievedBooks
                                title: item.title,
                                authorFirstName: item.authorFirstName,
                                authorLastName: item.authorLastName,
                                reservations: item.reservations,
                            })
                        }
                    >
                        <Text style = { styles.buttonText }>View Availability</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }

    // Create an array holding all reservation info
    const createReservationList = (bookList) => {
        
        const reservationList = [];

        // Iterate through each book on booklist
        bookList.forEach((book) => {
            
            // Iterate through each reservations entry
            for (let i = 0; i < book.reservations.length; i++) {

                // generate unique id for each reservation; this is needed for React Data Grid
                const reservationID = reservationList.length;

                let reservation = {
                    id: reservationID, 
                    title: book.title,
                    authorFirstName: book.authorFirstName,
                    authorLastName: book.authorLastName,
                    startDate: book.reservations[i].dates[0],
                    endDate: book.reservations[i].dates[20],
                    patronFirstName: book.reservations[i].patronFirstName,
                    patronLastName: book.reservations[i].patronLastName,
                    patronEmail: book.reservations[i].patronEmail,
                    patronPhone: book.reservations[i].patronPhone,
                    pickupLibrary: book.reservations[i].pickupLibrary,
                }
                reservationList.push(reservation);
            }       
        })
        console.log(reservationList);
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
            name: 'patronFirstName', 
            header: 'First Name',
            group: 'checkout',        
            width: 110,
        },
        { 
            name: 'patronLastName', 
            header: 'Last Name',
            group: 'checkout',
            width: 110,
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
            name: 'patronFirstName',
            operator: 'contains',
            type: 'string',
        },
        {
            name: 'patronLastName',
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

    // Sort by start date by default
    const defaultSortInfo = { 
        name: 'startDate',
        dir: 1,
    }

    // define grid styles
    const gridStyle = { minHeight: 550 };

    // Display reservation list as a table
    const renderAllReservations = () => {

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

    // Display different dashboard based on user role
    const renderPatronDashboard = (userRole) => {
        if (userRole === 'patron') {
            return (
                <View>
                    <FlatList
                        data = { books }
                        renderItem = { renderBookCard }
                    />
                </View>
            );
        }
    };
    
    const renderStaffDashboard = (userRole) => {
        if (userRole === 'staff' || userRole === 'admin') {
            return (
                <View>
                    <TouchableOpacity 
                        style = { styles.button }
                        onPress = {() => navigation.navigate('Collection')}
                    >
                        <Text style = { styles.buttonText }>Manage Collection</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style = { styles.button }
                        onPress = {() => navigation.navigate('Create Kit Record')}
                    >
                        <Text style = { styles.buttonText }>Create Kit Record</Text>
                    </TouchableOpacity>

                    <View style = {styles.titleContainer}>
                        <Text style = {styles.title}>ALL RESERVATIONS</Text>
                    </View>
                    { renderAllReservations() }
                </View>
            );
        }
    };

    const renderAdminDashboard = (userRole) => {
        if (userRole === 'admin') {
            return (
                <View>
                    <TouchableOpacity 
                        style = { styles.button }
                        onPress = {() => navigation.navigate('User List')}
                    >
                        <Text style = { styles.buttonText }>Manage Users</Text>
                    </TouchableOpacity>

                    <View style = {styles.titleContainer}>
                        <Text style = {styles.title}>ALL RESERVATIONS</Text>
                    </View>
                    { renderAllReservations() }
                </View>
            );
        }
    };

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
                { renderPatronDashboard(userRole) }
                { renderStaffDashboard(userRole) }
                { renderAdminDashboard(userRole) }
            </View>  
        </View>

    );
}

export default Dashboard;