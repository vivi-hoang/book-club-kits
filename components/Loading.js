// ./components/Loading.js
// The Loading page listens for the current user.

import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import firebase from 'firebase/app';

import styles from '../styling/Styles';

// Destructure navigation; passed as a property to the component.
const Loading = ({ navigation }) => {

    useEffect(() => {
            /*
            onAuthStateChanged method is the crux of Firebase Authentication:
            Lets you handle user state changes; registers a callback that gets called whenever page's
            authentication state changes. If page loads and there's no authentication tokens in
            localStorage, callback is called with null argument. Otherwise, onAuthStateChanged
            is called with Firebase Authentication's currentUser.
            */
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    navigation.replace('Dashboard');
                } else {
                    navigation.replace('Home');
                }
            });
        }
     );

    return (
        
        <View style = { styles.container }>
            <ActivityIndicator size = 'large' />
        </View>

    );
}

export default Loading;