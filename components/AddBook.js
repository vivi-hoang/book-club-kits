// ./components/AddBook.js

import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
        
        <View style = {styles.container}>
            <View style = {styles.titleContainer}>
                <Text style = {styles.title}>ADD BOOK FORM</Text>
            </View>
        </View>
    );
}

export default AddBook;