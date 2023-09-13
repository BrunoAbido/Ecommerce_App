import React from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useFavorites } from "../../contextoFavorites";
import { ItemType } from '../../contextoFavorites';

function Favorites() {
  const { favorites, removeFromFavorites } = useFavorites();

  const renderItem = ({ item }: { item: ItemType }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity
        onPress={() => removeFromFavorites(item.id)}
        style={styles.favoriteButton}
      >
        <View style={styles.favoriteCircle} />
        <Image
          source={require("../../assets/images/favorite.png")} 
          style={styles.favoriteIcon}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      {favorites.length === 0 ? (
        <Text style={styles.noFavoritesText}>No items in favorites</Text>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,

  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  itemContainer: {
    flexDirection: "row",
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#ECF8F3',
    alignItems: "center",
  },
  itemImage: {
    width: 91,
    height: 73,
    borderRadius: 8,
  },
  itemTextContainer: {
    flex: 1,
    marginLeft: 8,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 7,
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "bold",
  },
  favoriteButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center", 
  },
  favoriteCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    position: "absolute",
    zIndex: 0,
  },

  favoriteIcon: {
    width: 20,
    height: 20,
  },
  noFavoritesText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default Favorites;