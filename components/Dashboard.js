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
  
    useEffect(() => {
        // Retrieve data from Firestore using query methods in doc
        async function getUserInfo(){
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
                console.log("Firebase UID: " + currentUserUID);
                console.log("Name: " + user.firstName + ' ' + user.lastName);
                console.log("Email: " + user.email);

                setFirstName(user.firstName)
            }
        }
        getUserInfo();
    })
  
    const handlePress = () => {
      loggingOut();
      navigation.replace('Home');
    };



    return (
        
        <View style={styles.container}>
            <Text style={styles.titleText}>Dashboard</Text>
            <Text style={styles.text}>Hi, {firstName}</Text>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
        </View>

        /*
        <View>
            <Text>This is the Dashboard page</Text>
            <Text
                onPress = {() => navigation.push('Sign In')}
            >
                Go to Sign-In screen    
            </Text>
            <Text
                onPress = {() => navigation.push('Loading')}
            >
                Go to Loading screen    
            </Text>
            <Text
                onPress = {() => navigation.push('Home')}
            >
                Go to Home screen    
            </Text>
            <Text
                onPress = {() => navigation.push('Sign Up')}
            >
                Go to Sign-Up screen    
            </Text>
        </View>
        */
    );
}

export default Dashboard;