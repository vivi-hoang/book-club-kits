// ./firebase/FirebaseHelpers.js

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Alert } from 'react-native';
// import { firebaseConfig } from './FirebaseCredentials';

// Create user account for authentication
// but also save account details (email, name and user role) to separate Firestore database ('users')
export async function registration(email, password, lastName, firstName) {
    try {
        // Create account for user; automatically assign unique UID
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const currentUser = firebase.auth().currentUser;
        
        // Create Firestore collection (table) called "users"
        const db = firebase.firestore();
        db.collection('users')
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

export function storeBook(title, authorFirstName, authorLastName, genre, ageGroup, kitContents, location, synopsis) {
    
    // Create Firestore collection (table) called "books"
    const db = firebase.firestore();
    db.collection('books')
        // Create a document (entry/instance) for which Firestore will auto-generate an ID
        .doc() 
        // Pass in data entered by staff as key-value pair
        .set({
            title: title,
            authorFirstName: authorFirstName,
            authorLastName: authorLastName,
            genre: genre,
            ageGroup: ageGroup,
            kitContents: kitContents,
            location: location,
            synopsis: synopsis,
            reservation: [], // Empty array to hold future reservations
        });
}

export function storeCheckout(title, author, genre, ageGroup, kitContents, location, synopsis) {
    
    // Create Firestore collection (table) called "books"
    const db = firebase.firestore();
    db.collection('books')
        // Create a document (entry/instance) for which Firestore will auto-generate an ID
        .doc() 
        // Pass in data entered by staff as key-value pair
        .set({
            title: title,
            author: author,
            genre: genre,
            ageGroup: ageGroup,
            kitContents: kitContents,
            location: location,
            synopsis, synopsis
        });
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