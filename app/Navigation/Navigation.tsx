import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Initial from '../Screens/Initial';
import SignUpScreen from '../Screens/SignUpScreen'; 
import SignInScreen from '../Screens/signInScreen'; 
import Home from '../Screens/appScreens/Home';
import Favorites from '../Screens/appScreens/Favorites';
import Cart from '../Screens/appScreens/Cart'

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
    <Stack.Navigator initialRouteName="Initial">
        <Stack.Screen name="Initial" component={Initial} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Favorites" component={Favorites} />
        <Stack.Screen name="Cart" component={Cart} />
        
    </Stack.Navigator>
    );
};

export default Navigation;
