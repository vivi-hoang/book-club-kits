// ./components/Home.js

import React, { useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase/app';

import styles from '../styling/Styles';

// Destructure navigation; passed as a property to the component.
const Home = ({ navigation }) => {

    // For displaying book club kit collection
    const [loading, setLoading] = useState(true); // Set to true on component mount
    const [books, setBooks] = useState([]); // Initialize to empty array of books

    // For search bar
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

    // Retrieve book collection from Firebase
    useEffect(() => {
        const subscriber = firebase
            .firestore()
            .collection('books')
            .orderBy('title')
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

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
          // Inserted text is not blank
          // Filter the masterDataSource
          // Update FilteredDataSource
            const newData = masterDataSource.filter(function (item) {
                const itemData = item.title
                    ? item.title.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
          // Inserted text is blank
          // Update FilteredDataSource with masterDataSource
          setFilteredDataSource(masterDataSource);
          setSearch(text);
        }
    };

    const renderBookCard = ({ item }) => {

        return (
            <TouchableOpacity onPress = {() =>
                navigation.navigate('Book Record', { 
                    title: item.title,
                    authorFirstName: item.authorFirstName,
                    authorLastName: item.authorLastName,
                    genre: item.genre,
                    ageGroup: item.ageGroup,
                    kitContents: item.kitContents,
                    synopsis: item.synopsis,
                })
            }>
                <View style = { styles.listItem }>
                    <Text style = { styles.itemTitle }>{ item.title }</Text>
                    <Text><b>Author</b>: { item.authorFirstName } { item.authorLastName }</Text>
                    <Text><b>Genre</b>: { item.genre }</Text>
                    <Text><b>Age Group</b>: { item.ageGroup }</Text>
                    <Text><b>Kit Contents</b>: { item.kitContents }</Text>
                    <Text><b>Synopsis</b>: { item.synopsis }</Text>
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
                <SearchBar
                    round
                    searchIcon={{size: 24}}
                    onChangeText={(text) => searchFilterFunction(text)}
                    onClear={(text) => searchFilterFunction('')}
                    placeholder="Type Here..."
                    value={search}
                />
                <FlatList
                    data = { books }
                    keyExtractor = { (item, index) => index.toString() }
                    renderItem = { renderBookCard }
                />
            </View>
        </View>

    );
}

export default Home;