import React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { useFavorites } from "../../contexto"; 
import { ItemType } from '../../contexto';


function Favorites() {
    const { favorites } = useFavorites(); 

    const renderItem = ({ item }: { item: ItemType }) => (
        <View style={styles.itemContainer}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.itemTextContainer}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        </View>
        </View>
    );

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Favorites</Text>
        <FlatList
            data={favorites}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
        />
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    itemImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
        marginRight: 8,
    },
    itemTextContainer: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    itemPrice: {
        fontSize: 14,
        color: "gray",
    },
    });

export default Favorites;
