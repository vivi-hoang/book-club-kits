// ./components/Dashboard.js

import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';

const Home = ({ navigation }) => {
    return (
        <View>
            <Text>This is the Home page</Text>
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
                onPress = {() => navigation.push('Sign Up')}
            >
                Go to Sign-Up screen    
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

export default Home;