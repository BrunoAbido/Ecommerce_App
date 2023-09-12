import React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";

type ItemType = {
    id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    categoryId: string;
    image: any;
    };

const Favorites = () => {

    const allItems: ItemType[] = [
        {
        id: "1",
        title: "Item 1",
        description: "Description of item 1",
        price: 10.0,
        category: "Indoor",
        categoryId: "1",
        image: require("../../assets/images/favorite_border.png"),
        },
        {
        id: "2",
        title: "Item 2",
        description: "Description of item 2",
        price: 15.0,
        category: "Outdoor",
        categoryId: "2",
        image: require("../../assets/images/favorite_border.png"),
        },

    ];


    const renderItem = ({ item }: { item: ItemType }) => (
        <View style={styles.itemContainer}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.name}>{item.title}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Favorites</Text>
        </View>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
    },
    itemContainer: {
        flex: 1,
        margin: 8,
        padding: 16,
        backgroundColor: "white",
        borderRadius: 8,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    image: {
        width: "100%",
        height: 120,
        borderRadius: 8,
        marginBottom: 8,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
    },
    price: {
        fontSize: 14,
        color: "green",
    },
    noFavoritesText: {
        fontSize: 16,
        textAlign: "center",
    },
});

export default Favorites;
