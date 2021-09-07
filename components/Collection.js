// ./components/Collection.js

import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase/app';

import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import styles from '../styling/Styles';

// Destructure navigation; passed as a property to the component.
const Collection = ({ navigation }) => {

    const [loading, setLoading] = useState(true); // Set to true on component mount
    const [books, setBooks] = useState([]); // Initialize to empty array of books

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

    const renderTable = () => {                

        const rowStyle = { 
            backgroundColor: '#c8e6c9' 
        };

        const headerStyle = {
            backgroundColor: '#6c757d',
            color: '#ffffff',
        };

        const sortingHeaderStyle = {
            backgroundColor: 'red'
        };

        const columns = [
            { 
                dataField: 'title', 
                text: 'Title',
                headerStyle: headerStyle,
                sort: true, 
            }, 
            { 
                dataField: 'author', 
                text: 'Author',
                headerStyle: headerStyle,
                sort: true, 
            }, 
            { 
                dataField: 'genre', 
                text: 'Genre',
                headerStyle: headerStyle,
                sort: true, 
            },
            { 
                dataField: 'ageGroup',
                text: 'Age Group',
                headerStyle: headerStyle,
                sort: true,  
            },
            { 
                dataField: 'kitContents',
                text: 'Kit Contents',
                headerStyle
            },
            { 
                dataField: 'location',
                text: 'Location',
                headerStyle: headerStyle,
                sort: true, 
            },
            { 
                dataField: 'synopsis',
                text: 'Synopsis',
                headerStyle: headerStyle
            },
        ];
        
        return(

            <View>
                <BootstrapTable 
                    keyField = 'id'
                    data = { books } 
                    columns = { columns }
                    rowStyle = { rowStyle }
                />
            </View>       
        );
        
    }

    return (
        
        <View style = {styles.container}>
            <View style = {styles.titleContainer}>
                <Text style = {styles.title}>BOOK CLUB KIT COLLECTION</Text>
            </View>

            { renderTable() }
            
            {/*<View>
                <FlatList
                    data = { books }
                    renderItem = { renderBookCard }
                />
            </View> */}
        </View>


    );
}

export default Collection;