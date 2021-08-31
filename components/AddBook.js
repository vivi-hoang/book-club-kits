// ./components/AddBook.js

import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, View, Keyboard, TextInput } from 'react-native';
import { Button, Input  } from 'react-native-elements';
import firebase from 'firebase/app';
import { loggingOut } from '../firebase/FirebaseHelpers';

import styles from '../styling/Styles';

// Destructure navigation; passed as a property to the component.
const AddBook = ({ navigation }) => {

/*
Inputs needed:
Title
Author
Genre
Age Group
Kit Contents
Location
Synopsis
*/


    return (
        
        <SafeAreaView style = {styles.container}>
            <View style = {styles.titleContainer}>
                <Text style = {styles.title}>ADD BOOK FORM</Text>
            </View>
            <Input
                label = 'Title'
            />
            <Input
                label = 'Author'
            />
            <Input
                label = 'Genre'
            />
            <Input
                label = 'Age Group'
            />
            <Input
                label = 'Kit Contents'
            />
            <Input
                label = 'Location'
            />
            <Input
                label = 'Synopsis'
            />
        </SafeAreaView>
    );
}

export default AddBook;