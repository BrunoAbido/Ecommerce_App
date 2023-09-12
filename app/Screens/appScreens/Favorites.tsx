import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useAppContext } from "../App.context";

type ItemType = {
    id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    categoryId: string;
    image: any;
};

function Favorites() {
    const { favoritos, items } = useAppContext(); 

    const getFavoritosItems = () => {
        return items.filter((item) => favoritos.includes(item.id));
    };

    const renderItem = ({ item }: { item: ItemType }) => (
        <TouchableOpacity>
            <View style={styles.itemContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.name}>{item.title}</Text>
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.titleScreen}>Favorites</Text>
            <FlatList
                data={getFavoritosItems()} 
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 20,
    },
    titleScreen: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
    },
    itemContainer: {
        width: 300,
        marginBottom: 16,
        backgroundColor: "white",
        borderRadius: 8,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        flexDirection: "column",
        alignItems: "center",
        padding: 16,
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 8,
        marginBottom: 8,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    price: {
        fontSize: 14,
        fontWeight: "bold",
    },
});

export default Favorites;
