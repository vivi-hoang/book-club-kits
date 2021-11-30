// ./navigation/StackNavigator.js

import React from "react";

// NAVIGATION
import { createStackNavigator } from '@react-navigation/stack';

// PAGES
import Loading from '../components/Loading';
import Home from '../components/Home';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import Dashboard from '../components/Dashboard';
import UserList from '../components/UserList';
import UserRecord from '../components/UserRecord';
import CreateKitRecord from '../components/CreateKitRecord';
import Collection from '../components/Collection';
import BookRecord from '../components/BookRecord';
import Schedule from '../components/Schedule';
import ReservationForm from '../components/ReservationForm';
import ReservationConfirmation from '../components/ReservationConfirmation';
import MyReservations from '../components/MyReservations';

const Stack = createStackNavigator();

/* NAVIGATION ORDER
Users will first see Loading screen.
    They will land on Home screen if not signed in.
    They will land on Dashboard if they are signed in.
If user doesn't have account:
    Sign Up button will take them to Sign Up screen.
    Once signed up, user taken to Dashboard.
If user has an account but not signed in:
    Can use sign in button
    Once signed in, user taken to Dashboard.
Dashboard displays user's name and Sign Out button
*/

const MainStackNavigator = () => {
    return (
        <Stack.Navigator  
            screenOptions = {{
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#0C3E22', // dark green
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen 
                name = 'Loading' 
                component = { Loading } 
                //options = {{ headerShown: false }}
            />
            <Stack.Screen 
                name = 'Book Club Kit Reservations'
                component = { Home } 
            />
            <Stack.Screen
                name = 'Sign Up'
                component = { SignUp }
            />
            <Stack.Screen
                name = 'Sign In'
                component = { SignIn }
            />
            <Stack.Screen
                name = 'Dashboard'
                component = { Dashboard }
            />
            <Stack.Screen
                name = 'My Reservations'
                component = { MyReservations }
            />
            <Stack.Screen
                name = 'User List'
                component = { UserList }
            />
            <Stack.Screen
                name = 'User Record'
                component = { UserRecord }
            />
            <Stack.Screen
                name = 'Create Kit Record'
                component = { CreateKitRecord }
            />
            <Stack.Screen
                name = 'Collection'
                component = { Collection }
            />
            <Stack.Screen
                name = 'Book Record'
                component = { BookRecord }
            />
            <Stack.Screen
                name = 'Schedule'
                component = { Schedule }
            />
            <Stack.Screen
                name = 'Reservation Form'
                component = { ReservationForm }
            />
            <Stack.Screen
                name = 'Reservation Confirmation'
                component = { ReservationConfirmation }
                options = {{ headerLeft: () => null }} // Hide back button on Reservation Confirmation screen
            />
        </Stack.Navigator>
    );
}

export { MainStackNavigator };