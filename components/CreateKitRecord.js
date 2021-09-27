// ./components/CreateKitRecord.js

import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, Alert, ScrollView, Keyboard, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { storeBook } from '../firebase/FirebaseHelpers';

import styles from '../styling/Styles';

// Destructure navigation; passed as a property to the component.
const CreateKitRecord = ({ navigation }) => {

    const [title, setTitle] = useState('');
    const [authorFirstName, setAuthorFirstName] = useState('');
    const [authorLastName, setAuthorLastName] = useState('');
    const [genre, setGenre] = useState('');
    const [ageGroup, setAgeGroup] = useState('');
    const [kitContents, setKitContents] = useState('');
    const [location, setLocation] = useState('');
    const [synopsis, setSynopsis] = useState('');

    const emptyState = () => {
        setTitle('');
        setAuthorFirstName('');
        setAuthorLastName('');
        setGenre('');
        setAgeGroup('');
        setKitContents('');
        setLocation('');
        setSynopsis('');
    };

    const handlePress = () => {
        // Entered info passed in as arguments to storeBook function
        storeBook(
            title,
            authorFirstName,
            authorLastName,
            genre,
            ageGroup,
            kitContents,
            location,
            synopsis
        );
        navigation.navigate('Loading');
        emptyState();
    }

    return (

        <SafeAreaView style = { styles.container }>
            <View style = {styles.titleContainer}>
                <Text style = {styles.title}>CREATE KIT RECORD FORM</Text>
            </View>

            <ScrollView onBlur = { Keyboard.dismiss }>               
                <TextInput
                    style = { styles.textInput }
                    placeholder = 'Title'
                    value = { title }
                    onChangeText = {(title) => setTitle(title)}
                />
                
                <TextInput
                    style = { styles.textInput }
                    placeholder = 'Author First Name'
                    value = { authorFirstName }
                    onChangeText = {(authorFirstName) => setAuthorFirstName(authorFirstName)}
                />

                <TextInput
                    style = { styles.textInput }
                    placeholder = 'Author Last Name'
                    value = { authorLastName }
                    onChangeText = {(authorLastName) => setAuthorLastName(authorLastName)}
                />

                <TextInput
                    style = { styles.textInput }
                    placeholder = 'Genre'
                    value = { genre }
                    onChangeText = {(genre) => setGenre(genre)}
                />

                <TextInput
                    style = { styles.textInput }
                    placeholder = 'Age group'
                    value = { ageGroup }
                    onChangeText = {(ageGroup) => setAgeGroup(ageGroup)}
                />
                
                <TextInput
                    style = { styles.textInput }
                    placeholder = 'Kit contents'
                    value = { kitContents }
                    onChangeText = {(kitContents) => setKitContents(kitContents)}
                />

                <TextInput
                    style = { styles.textInput }
                    placeholder = 'Location'
                    value = { location }
                    onChangeText = {(location) => setLocation(location)}
                />

                <TextInput
                    style = { styles.textInput }
                    placeholder = 'Synopsis'
                    value = { synopsis }
                    onChangeText = {(synopsis) => setSynopsis(synopsis)}
                />
                
                <TouchableOpacity style = { styles.button } onPress = { handlePress }>
                    <Text style = { styles.buttonText }>Save Kit Record</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
        
    );

}

export default CreateKitRecord;