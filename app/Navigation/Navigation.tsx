import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Initial from '../Screens/Initial';
import LogInScreen from '../Screens/LogInScreen'; 

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
    <Stack.Navigator initialRouteName="Initial">
        <Stack.Screen name="Initial" component={Initial} />
        <Stack.Screen name="LogInScreen" component={LogInScreen} />
    </Stack.Navigator>
    );
};

export default Navigation;
