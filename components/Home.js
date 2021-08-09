// ./components/Home.js

import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import styles from '../styling/Styles';

// Destructure navigation; passed as a property to the component.
const Home = ({ navigation }) => {
    return (
        
        <View style = {styles.container}>
            <View style = {styles.titleContainer}>
                <Text style = {styles.title}>Welcome to Firebase/Firestore Example</Text>
            </View>
            
            <View>
            <TouchableOpacity style = {styles.button} onPress={() => navigation.navigate('Sign Up')} >
                <Text style = {styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            
            <Text style = {styles.inlineText}>Already have an account?</Text>
            
            <TouchableOpacity style = {styles.button} onPress={() => navigation.navigate('Sign In')}>
                <Text style = {styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            </View>
        </View>

        /*
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
        */
    );
}

export default Home;