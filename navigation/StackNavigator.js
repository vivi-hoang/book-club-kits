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

const Stack = createStackNavigator();

/* NAVIGATION ORDER
Users will first see Landing screen.
    They will land on Home screen if not signed in.
    They will land on Dashboard if they are signed in.
If user doesn't have account
    Sign Up button will take them to Sign Up screen.
    Once signed up, user taken to Dashboard.
If user has an account but not signed in
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
                    backgroundColor: '#3740FE', // blue
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
                name = 'Home'
                component = { Home } 
                //options = {{ headerShown: false }}
            />
            <Stack.Screen
                name = 'Sign Up'
                component = { SignUp }
                //options = {{ headerShown: false }}
            />
            <Stack.Screen
                name = 'Sign In'
                component = { SignIn }
                //options = {{ headerShown: false }}
            />
            <Stack.Screen
                name = 'Dashboard'
                component = { Dashboard }
                //options = {{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export { MainStackNavigator };