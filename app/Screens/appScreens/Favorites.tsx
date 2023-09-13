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
    marginLeft: 24,
    marginTop: 39,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  itemContainer: {
    flexDirection: "row",
    marginBottom: 16,
    width: 327,
    height: 72,
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
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 16, 
  },
  
  noFavoritesText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  favoriteIcon: {
    width: 16,
    height: 16,
    position: "absolute",
    zIndex: 1,
},
favoriteCircle: {
    width: 30,
    height: 30,
    borderRadius: 18,
    backgroundColor: "white",
    position: "absolute",
    zIndex: 0,
    shadowColor: 'black', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.3,
    shadowRadius: 4,
},

});

export default Favorites;
