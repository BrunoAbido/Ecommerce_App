import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import Initial from '../app/Screens/Initial'; 

const Stack = createNativeStackNavigator();

export default function App() {
    const [fontsLoaded] = useFonts({
    Poppins: require("../app/assets/fonts/Poppins-Regular.ttf")
    });

    if (!fontsLoaded) {
    return null;
    }

    return (
        <Stack.Navigator initialRouteName="Initial">
        <Stack.Screen name="Initial" component={Initial} />
        </Stack.Navigator>
    );
}
