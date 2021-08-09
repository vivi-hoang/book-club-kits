// ./components/Signup.js

import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';

// Destructure navigation; passed as a property to the component.
const Signup = ({ navigation }) => {
    return (
        <View>
            <Text>This is the Sign-up page</Text>
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
                onPress = {() => navigation.push('Dashboard')}
            >
                Go to Dashboard screen    
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({});

export default Signup;