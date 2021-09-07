// ./components/Collection.js

import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase/app';
import { Col, Row, Grid } from "react-native-easy-grid";

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
        return(

            <View style={tablestyle.container}>
                <Grid>
                    <Col size={50}>
                        <Row style={tablestyle.cell}>
                            <Text>A</Text>
                        </Row>
                        <Row style={tablestyle.cell}>
                            <Text>B</Text>
                        </Row>
                        <Row style={tablestyle.cell}>
                            <Text>C</Text>
                        </Row>
                        <Row style={tablestyle.cell}>
                            <Text>D</Text>
                        </Row>
                    </Col>
                    <Col size={25}>
                        <Row style={tablestyle.cell}>
                            <Text>E</Text>
                        </Row>
                        <Row style={tablestyle.cell}>
                            <Text>F</Text>
                        </Row>
                        <Row style={tablestyle.cell}>
                            <Text>G</Text>
                        </Row>
                        <Row style={tablestyle.cell}>
                            <Text>H</Text>
                        </Row>
                    </Col>
                    <Col size={25}>
                        <Row style={tablestyle.cell}>
                            <Text>1</Text>
                        </Row>
                        <Row style={tablestyle.cell}>
                            <Text>2</Text>
                        </Row>
                        <Row style={tablestyle.cell}>
                            <Text>3</Text>
                        </Row>
                        <Row style={tablestyle.cell}>
                            <Text>4</Text>
                        </Row>
                    </Col>
                </Grid>
            </View>       
        );
        
    }

    return (
        
        <View style = {styles.container}>
            <View style = {styles.titleContainer}>
                <Text style = {styles.title}>BOOK CLUB KIT COLLECTION</Text>
            </View>
            
            <View style={tablestyle.container}>
                <Grid>
                    <Col size={50}>
                        <Row style={tablestyle.cell}>
                            <Text>A</Text>
                        </Row>
                        <Row style={tablestyle.cell}>
                            <Text>B</Text>
                        </Row>
                        <Row style={tablestyle.cell}>
                            <Text>C</Text>
                        </Row>
                        <Row style={tablestyle.cell}>
                            <Text>D</Text>
                        </Row>
                    </Col>
                    <Col size={25}>
                        <Row style={tablestyle.cell}>
                            <Text>E</Text>
                        </Row>
                        <Row style={tablestyle.cell}>
                            <Text>F</Text>
                        </Row>
                        <Row style={tablestyle.cell}>
                            <Text>G</Text>
                        </Row>
                        <Row style={tablestyle.cell}>
                            <Text>H</Text>
                        </Row>
                    </Col>
                    <Col size={25}>
                        <Row style={tablestyle.cell}>
                            <Text>1</Text>
                        </Row>
                        <Row style={tablestyle.cell}>
                            <Text>2</Text>
                        </Row>
                        <Row style={tablestyle.cell}>
                            <Text>3</Text>
                        </Row>
                        <Row style={tablestyle.cell}>
                            <Text>4</Text>
                        </Row>
                    </Col>
                </Grid>
            </View>    
            
            {/*<View>
                <FlatList
                    data = { books }
                    renderItem = { renderBookCard }
                />
            </View> */}
        </View>


    );
}

const tablestyle = StyleSheet.create({
    container: {
        width: '100%',
        height: 300,
        padding: 16,
        paddingTop: 100,
        backgroundColor: '#fff',
    },
    cell: {
        borderWidth: 1,
        borderColor: '#ddd',
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default Collection;