// ./styles/Styles.js

import { StyleSheet } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    titleContainer: {
        
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
    },
    text: {

    },
    listItem: {
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#FFF',
        flexDirection: 'column', 
    },
    itemTitle: {
        fontSize: 18,        
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    instructions: {
        fontSize: 13,
        marginTop: 5,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#6B591D',
        marginTop: 5,
        padding: 10,
        width: 150,
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'white',
    },
    inlineText: {

    },
    textInput: {

    },
    formInput: {

    },
});

export default styles;