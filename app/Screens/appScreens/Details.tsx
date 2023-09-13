import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { useFavorites } from "../../contextoFavorites";
import { useCart } from "../../contextCart";
import colors from "../../constants/Colors";

type RootStackParamList = {
  Details: {
    itemId: string;
  };
};

type DetailsProps = {
  route: RouteProp<RootStackParamList, "Details">;
  navigation: any;
};

export function Details({ route, navigation }: DetailsProps) {
  const { itemId, description, image, name, price, category } = route.params as any;

  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [itemQuantity, setItemQuantity] = useState(1); // Inicie com 1 item
  const { addToCart } = useCart();

  useEffect(() => {
    // Atualize o newPrice sempre que a quantidade do item mudar
    const newPrice = price * itemQuantity;
    navigation.setParams({ newPrice });
  }, [itemQuantity, price, navigation]);

  const handleAddItem = () => {
    setItemQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleRemoveItem = () => {
    if (itemQuantity > 1) {
      setItemQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: itemId,
      title: name,
      description,
      price,
      category,
      image,
      categoryId: "",
      quantity: itemQuantity,
    });
  };

  const itemIsFavorite = isFavorite(itemId);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require("../../assets/images/arrow_back_ios.png")} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details</Text>
        <TouchableOpacity
          onPress={() => {
            if (!itemIsFavorite) {
              addToFavorites({
                id: itemId,
                title: name,
                description,
                price,
                category,
                image,
                categoryId: "",
              });
            } else {
              removeFromFavorites(itemId);
            }
          }}
          style={styles.favoriteButton}
        >
          <Image
            source={
              itemIsFavorite
                ? require("../../assets/images/favorite.png")
                : require("../../assets/images/favorite_border.png")
            }
            style={styles.favoriteIcon}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.containerImage}>
        <Image
          source={{
            uri: image,
            cache: "only-if-cached",
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.containerText}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={handleRemoveItem}>
              <Image source={require("../../assets/images/Less.png")} />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{itemQuantity}</Text>
            <TouchableOpacity onPress={handleAddItem}>
              <Image source={require("../../assets/images/Plus.png")} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.text}>{description}</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.footerText}>Total price</Text>
          <Text style={styles.newPrice}>${(price * itemQuantity).toFixed(2)}</Text>
        </View>
        <TouchableOpacity onPress={handleAddToCart} style={styles.footerButton}>
          <Text style={styles.buttonText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
    height: 98,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 13,
    alignSelf: "center",
  },
  containerImage: {
    flex: 0.4,
    alignItems: "center",
  },
  containerText: {
    flex: 0.6,
  },
  image: {
    width: "100%",
    height: 247,
    resizeMode: "cover",
    borderRadius: 8,
  },
  category: {
    fontSize: 16,
    marginTop: 24,
    marginLeft: 24,
    color: "#969595",
  },
  name: {
    fontSize: 28,
    marginTop: 16,
    marginLeft: 24,
    fontWeight: "bold",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginLeft: 24,
  },
  quantityContainer: {
    flexDirection: "row",
    marginRight: 24,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 8,
  },
  newPrice: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 24,
    marginTop: 2,
  },
  text: {
    fontSize: 14,
    marginTop: 24,
    marginLeft: 21,
    color: "#969595",
  },
  footer: {
    height: 92,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
  },
  totalContainer: {},
  footerText: {
    fontSize: 12,
    marginTop: 20,
    marginLeft: 26,
  },
  footerButton: {
    borderRadius: 8,
    backgroundColor: colors.green,
    width: 114,
    height: 48,
    marginTop: 16,
    marginRight: 24,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    color: "white",
    marginTop: 14,
  },
  favoriteButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  favoriteIcon: {
    width: "100%",
    height: "100%",
  },
});

export default Details;
