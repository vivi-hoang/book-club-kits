// ./components/SignIn.js

import React, { useState } from 'react';
import { Text, View, TextInput, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { signIn } from '../firebase/FirebaseHelpers';
import styles from '../styling/Styles';

// Destructure navigation; passed as a property to the component.
const SignIn = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handlePress = () => {
        if (!email) {
            Alert.alert('Email field is required.');
        }
    
        if (!password) {
            Alert.alert('Password field is required.');
        }
    
        signIn(email, password);
        setEmail('');
        setPassword('');
    };
  


    return (
        <View style = { styles.container }>
            <Text style = { styles.text }>Sign in to your account:</Text>
    
            <TextInput
                style = { styles.formInput }
                placeholder = "Enter your email"
                value = { email }
                onChangeText = {(email) => setEmail(email)}
                autoCapitalize = "none"
            />
            <TextInput
                style = { styles.formInput }
                placeholder = "Enter your password"
                value = {password}
                onChangeText = {(password) => setPassword(password)}
                secureTextEntry = {true}
            />
    
            <TouchableOpacity style = { styles.button } onPress = { handlePress }>
                <Text style = { styles.buttonText }>Submit</Text>
            </TouchableOpacity>  
        </View>        

    );
}

export default SignIn;