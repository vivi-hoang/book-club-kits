// ./components/Dashboard.js

import React, { useEffect, useState } from 'react';
import { Text, View, Alert } from 'react-native';
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
  
    // This useEffect is called every time component renders
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
                    console.log('Firebase UID: ' + currentUserUID);
                    console.log('Name: ' + user.firstName + ' ' + user.lastName);
                    console.log('Email: ' + user.email);
                    console.log('Role: ' + user.role);
                    
                    setFirstName(user.firstName);
                    setUserRole(user.role);
                }
            }
        }
        getUserInfo();
        return () => { isMounted = false };
    })
  
    const handlePress = () => {
      loggingOut();
      navigation.replace('Home');
    };

    // Display different dashboard based on user role  
    const renderUI = (userRole) => {
        if (userRole === 'patron') {
            return (
                <Text style={styles.titleText}>THIS IS THE PATRON DASHBOARD</Text>
            );
        } else if (userRole === 'librarian') {
            return (
                <Text style={styles.titleText}>THIS IS THE LIBRARIAN DASHBOARD</Text>
            );
        }  else if (userRole === 'admin') {
            return (
                <Text style={styles.titleText}>THIS IS THE ADMIN DASHBOARD</Text>
            );
        } else {
            return (
                <Text style={styles.titleText}>DASHBOARD - USER ROLE UNRECOGNIZED</Text>
            );
        }
    };

    return (
        <View>
            <View style={styles.container}>
                { renderUI(userRole) }
                <Text style={styles.text}>Hi, {firstName}</Text>
                    <TouchableOpacity style={styles.button} onPress={handlePress}>
                        <Text style={styles.buttonText}>Log Out</Text>
                    </TouchableOpacity>
                </View>            
        </View>

    );
}

export default Dashboard;