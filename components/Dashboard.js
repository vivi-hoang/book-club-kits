// ./components/Dashboard.js

import React, { useEffect, useState } from 'react';
import { Text, View, Alert, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase/app';
import { loggingOut } from '../firebase/FirebaseHelpers';

import styles from '../styling/Styles';

// Destructure navigation; passed as a property to the component.
const Dashboard = ({ navigation }) => {

    // Allows ID of current sign-in user
    let currentUserUID = firebase.auth().currentUser.uid;
    const [firstName, setFirstName] = useState('');
    const [userRole, setUserRole] = useState('');

    // For displaying book club kit collection
    const [loading, setLoading] = useState(true); // Set to true on component mount
    const [books, setBooks] = useState([]); // Initialize to empty array of books
  
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
            .onSnapshot(querySnapshot => {
                const retrievedBooks = [];
                querySnapshot.forEach(documentSnapshot => {
                    retrievedBooks.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id
                    });
                });
            
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
                navigation.navigate('Book Record', { item })
            }>
                <View style = { styles.listItem }>
                    <Text>Title: { item.title }</Text>
                    <Text>Synopsis: { item.synopsis }</Text>
                </View>
            </TouchableOpacity>
        )
    }

    // Display different dashboard based on user role
    const renderPatronDashboard = (userRole) => {
        if (userRole === 'patron') {
            return (
                <View>
                    <Text style={styles.titleText}>THIS IS THE PATRON DASHBOARD</Text>

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
                    <Text style={styles.titleText}>THIS IS THE STAFF DASHBOARD</Text>
                    <TouchableOpacity 
                        style = { styles.button }
                        onPress = {() => navigation.navigate('Collection')}
                    >
                        <Text style = { styles.buttonText }>Manage Collection</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style = { styles.button }
                        onPress = {() => navigation.navigate('Add Book')}
                    >
                        <Text style = { styles.buttonText }>Add Book</Text>
                    </TouchableOpacity>
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