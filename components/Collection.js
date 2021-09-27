// ./components/Collection.js

import React, { useEffect, useState, useRef } from 'react';
import { Text, View, ActivityIndicator, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase/app';

// Table dependencies
import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'

import styles from '../styling/Styles';

// Destructure navigation; passed as a property to the component.
const Collection = ({ navigation }) => {

    const [loading, setLoading] = useState(true); // Set to true on component mount
    const [books, setBooks] = useState([]); // Initialize to empty array of books
    
    const filterValue = [
        {
            name: 'title',
            operator: 'contains',
            type: 'string',
        },
        {
            name: 'authorFirstName',
            operator: 'contains',
            type: 'string',
        },
        {
            name: 'authorLastName',
            operator: 'contains',
            type: 'string',
        },
        {
            name: 'genre',
            operator: 'contains',
            type: 'string',
        },
        {
            name: 'ageGroup',
            operator: 'contains',
            type: 'string',
        },
        {
            name: 'kitContents',
            operator: 'contains',
            type: 'string',
        },
        {
            name: 'synopsis',
            operator: 'contains',
            type: 'string',
        }

    ];

    // Hook to retrieve book list from Firebase
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

    if (loading) {
        return <ActivityIndicator />;
    }

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

    // define columns
    const columns = [
        {   
            name: 'title', 
            header: 'Title',
            group: 'book',
            width: 200,
        },
        { 
            name: 'authorFirstName', 
            header: 'First Name',
            group: 'author',        
            width: 120,
        },
        { 
            name: 'authorLastName', 
            header: 'Last Name',
            group: 'author',
            width: 120,
        },
        { 
            name: 'genre', 
            header: 'Genre',
            group: 'details',
            width: 100,
        },
        { 
            name: 'ageGroup', 
            header: 'Age',
            group: 'details',
            width: 100,
        },
        { 
            name: 'kitContents', 
            header: 'Kit Contents',
            group: 'details',
            width: 200,
        },
        { 
            name: 'synopsis', 
            header: 'Synopsis',
            group: 'details',
            defaultFlex: 1,
        },
    ];

    const groups = [
        { name: 'author', header: 'Author' },
        { name: 'book', header: 'Book' },
        { name: 'details', header: 'Book Details' }
    ];
  
    // define grid styles here
    const gridStyle = { minHeight: 550 };

    /**
    const onSearchChange = ({ target: { value } }) => {
        const visibleColumns = gridRef.current.visibleColumns;
    
        setSearchText(value);
    
        const newDataSource = people.filter(p => {
            return visibleColumns.reduce((acc, col) => {
            const v = (p[col.id] + '').toLowerCase() // get string value
            return acc || v.indexOf(value.toLowerCase()) != -1 // make the search case insensitive
            }, false)
        });
    
        setDataSource(newDataSource);
    }
     */
        
    return (
        
        <View style = {styles.container}>
            <View style = {styles.titleContainer}>
                <Text style = {styles.title}>BOOK CLUB KIT COLLECTION</Text>
            </View>
            
            {/**
            <div style={{  marginBottom: 20 }}>
                <label>Search kits: <TextInput value = {searchText} onChange = { onSearchChange }/></label>
            </div>
             */}

            <ReactDataGrid
                idProperty="id"
                columns = { columns }
                groups = { groups }
                dataSource = { books }
                style = { gridStyle }
                defaultFilterValue = { filterValue }
            />

        </View>

    );
}

export default Collection;