// ./components/UserList.js

import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase/app';
import { loggingOut } from '../firebase/FirebaseHelpers';

import styles from '../styling/Styles';

// Destructure navigation; passed as a property to the component.
const UserList = ({ navigation }) => {

    const [loading, setLoading] = useState(true); // Set to true on component mount
    const [users, setUsers] = useState([]); // Initialize to empty array of users

    useEffect(() => {
        const subscriber = firebase
            .firestore()
            .collection('users')
            .onSnapshot(querySnapshot => {
                const retrievedUsers = [];
                querySnapshot.forEach(documentSnapshot => {
                    retrievedUsers.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id
                    });
                });
            
                setUsers(retrievedUsers);
                setLoading(false);
            });        
        return () => subscriber(); // Unsubscribe from events when no longer in use
    }, []); // This useEffect is called only first time component renders.

    if (loading) {
        return <ActivityIndicator />;
    }

    const renderUserCard = ({ item }) => {
        return (
            <TouchableOpacity onPress = {() =>
                navigation.navigate('User Record', { item })
            }>
                <View style = { styles.listItem }>
                    <Text>Name: { item.firstName } { item.lastName }</Text>
                    <Text>Email: { item.email }</Text>
                    <Text>Role: { item.role }</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        
        <View style = {styles.container}>
            <View style = {styles.titleContainer}>
                <Text style = {styles.title}>USER LIST</Text>
            </View>
            <View>
                <FlatList
                    data = { users }
                    renderItem = { renderUserCard }
                />
            </View>
        </View>
    );
}

export default UserList;