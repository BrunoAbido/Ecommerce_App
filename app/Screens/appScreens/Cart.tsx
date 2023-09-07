import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

function Favorites() {
    return(
        <View style={styles.container}>
        <View style={styles.content}>
            <Text style={styles.title}>Cart</Text>
        </View>
    </View>
)}

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
    },
    content: {
        padding: 24,
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'left',
        marginRight: 126,
    },
})

export default Favorites;
