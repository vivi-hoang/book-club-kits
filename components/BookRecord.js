// ./components/BookRecord.js

import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase/app';
import { loggingOut } from '../firebase/FirebaseHelpers';

import styles from '../styling/Styles';

// Destructure navigation; passed as a property to the component.
const BookRecord = ({ route }) => {

    const item = route.params;

    return (
        
        <View style = {styles.container}>
            <View style = {styles.titleContainer}>
                <Text style = {styles.title}>BOOK RECORD</Text>
            </View>
            <View style = { styles.listItem }>
                <Text style = { styles.itemTitle }>{ item.title }</Text>
                <Text><b>Author</b>: { item.authorFirstName } { item.authorLastName }</Text>
                <Text><b>Genre</b>: { item.genre }</Text>
                <Text><b>Age Group</b>: { item.ageGroup }</Text>
                <Text><b>Kit Contents</b>: { item.kitContents }</Text>
                <Text><b>Synopsis</b>: { item.synopsis }</Text>
            </View>
        </View>
    );
}

export default BookRecord;