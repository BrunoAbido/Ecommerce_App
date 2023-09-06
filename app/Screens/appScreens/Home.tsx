import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Home = ({ route } : { route: any}) => {
    const { userId } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Home</Text>
            <Text style={styles.text}>User ID: {userId}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default Home;
