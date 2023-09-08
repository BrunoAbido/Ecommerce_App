import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';


const Details = () => {
    const route: any = useRoute();

    if (!route.params || !route.params.item) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Details Page</Text>
                <Text>Item not found</Text>
            </View>
        );
    }

    const { item } = route.params;
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Details Page</Text>
            <Text>Name: {item.name}</Text>
            <Text>Price: ${item.price.toFixed(2)}</Text>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Details;
