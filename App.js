// ./App.js

// DEPENDENCIES
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import { firebaseConfig } from './firebase/FirebaseCredentials';
import { MainStackNavigator } from './navigation/StackNavigator';

export default function App() {   
    
    // Checks that Firebase app was not called anywhere else before initialization
    if (!firebase.apps.length) {
        console.log('Connected with Firebase')
        firebase.initializeApp(firebaseConfig);
    }
    
    return (
        <NavigationContainer>
            <MainStackNavigator />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
