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

    const genres = {

    }
    
    const filterValue = [
        {
            name: 'title',
            operator: 'contains',
            type: 'string',
        },
        {
            name: 'author',
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
            name: 'location',
            operator: 'equals',
            type: 'string',
        },
        {
            name: 'synopsis',
            operator: 'contains',
            type: 'string',
        }

    ];

    /**
    const [searchText, setSearchText] = useState('');
    const searchTextRef = useRef(searchText);
    searchTextRef.current = searchText;

    
    // Hook to handle search
    const renderSearchResults = useCallback(({ value }) => {
        const lowerSearchText = searchTextRef.current.toLowerCase();
        if (!lowerSearchText) {
          return value;
        }
    
        const str = value + '' // get string value
        const v = str.toLowerCase() // our search is case insesitive
        const index = v.indexOf(lowerSearchText);
    
        if (index === -1) {
          return value;
        }
    
        return [
          <span key="before">{str.slice(0, index)}</span>,
          <span key="match" style={{ background: 'yellow', fontWeight: 'bold'}}>{str.slice(index, index + lowerSearchText.length)}</span>,
          <span key="after">{str.slice(index + lowerSearchText.length)}</span>
        ]
    }, [])

    const shouldComponentUpdate = () => true;
     */

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
            defaultFlex: 1,
            width: 35,
        },
        { 
            name: 'author', 
            header: 'Author', 
            defaultFlex: 1,            
            width: 35,
        },
        { 
            name: 'genre', 
            header: 'Genre', 
            defaultFlex: 1,
            width: 15,
        },
        { 
            name: 'ageGroup', 
            header: 'Age Group', 
            defaultFlex: 1,
        },
        { 
            name: 'kitContents', 
            header: 'Kit Contents', 
            defaultFlex: 1,
        },
        { 
            name: 'location', 
            header: 'Location',
            defaultFlex: 1,            
        },
        { 
            name: 'synopsis', 
            header: 'Synopsis', 
            defaultFlex: 1,
        },
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
                dataSource = { books }
                style = { gridStyle }
                defaultFilterValue = { filterValue }
            />

        </View>

    );
}

export default Collection;