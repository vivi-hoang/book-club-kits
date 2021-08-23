// ./firebase/FirebaseHelpers.js

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Alert } from 'react-native';
// import { firebaseConfig } from './FirebaseCredentials';

export async function registration(email, password, lastName, firstName) {
    try {
        // Create account for user; automatically assign unique UID
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const currentUser = firebase.auth().currentUser;
        
        // Create Firestore collection (table) called "users"
        const db = firebase.firestore();
        db.collection("users")
            // Create a document (entry/instance) that contains a unique UID
            .doc(currentUser.uid)
            // Customized attribute for collection and store as key-value pair
            .set({
                email: currentUser.email,
                lastName: lastName,
                firstName: firstName,
                role: 'patron',
            });
    }   catch (err) {
         Alert.alert("There is something wrong.", err.message);
    }
}
  
export async function signIn(email, password) {
    try {
        // Validate user through Firebase Authentication
        await firebase
            .auth()
            .signInWithEmailAndPassword(email, password);
    } catch (err) {
      Alert.alert("There is something wrong!", err.message);
    }
}
  
export async function loggingOut() {
    try {
      await firebase.auth().signOut();
    } catch (err) {
      Alert.alert('There is something wrong!', err.message);
    }
}