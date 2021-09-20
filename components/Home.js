// ./components/Home.js

import React, { useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase/app';

import styles from '../styling/Styles';

// Destructure navigation; passed as a property to the component.
const Home = ({ navigation }) => {

    // For displaying book club kit collection
    const [loading, setLoading] = useState(true); // Set to true on component mount
    const [books, setBooks] = useState([]); // Initialize to empty array of books

    // Retrieve book collection from Firebase
    useEffect(() => {
        const subscriber = firebase
            .firestore()
            .collection('books')
            .onSnapshot(querySnapshot => {
                const retrievedBooks = [];
                querySnapshot.forEach(documentSnapshot => {
                    retrievedBooks.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id
                    });
                });
            
                setBooks(retrievedBooks);
                setLoading(false);
            });        
        return () => subscriber(); // Unsubscribe from events when no longer in use
    }, []); // This useEffect is called only first time component renders.

    const renderBookCard = ({ item }) => {

        return (
            <TouchableOpacity onPress = {() =>
                navigation.navigate('Book Record', { item })
            }>
                <View style = { styles.listItem }>
                    <Text>Title: { item.title }</Text>
                    <Text>Synopsis: { item.synopsis }</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        
        <View style = {styles.container}>
            <View style = {styles.titleContainer}>
                <Text style = {styles.title}>BOOK CLUB KIT RESERVATIONS</Text>
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

            <View>
                <FlatList
                    data = { books }
                    renderItem = { renderBookCard }
                />
            </View>
        </View>

    );
}

export default Home;