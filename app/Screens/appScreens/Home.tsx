import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import axios from "axios";
import colors from "../../constants/Colors";
import { useFavorites } from "../../contextoFavorites";
import { useCart } from "../../contextCart"; 

type ItemType = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  categoryId: string;
  image: any;
  quantity: number
};

function Home({ navigation }: { navigation: any }) {
  const [mostPopular, setMostPopular] = useState<ItemType[]>([]);
  const [allItems, setAllItems] = useState<ItemType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>("All");
  const { addToFavorites, favorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart(); 

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const responseMostPopular = await axios.get(
          "https://8jcox47hg2.execute-api.us-east-2.amazonaws.com/dev/"
        );

        const { mostPopular } = responseMostPopular.data.body.data;

        setMostPopular(mostPopular);
        const responseAllItems = await axios.get(
          "https://8jcox47hg2.execute-api.us-east-2.amazonaws.com/dev/"
        );

        const { items } = responseAllItems.data.body.data;

        setAllItems(items);
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          console.error("Erro ao buscar dados da API:", error.message);
        } else {
          console.error("Erro desconhecido:", error);
        }
      }
      setIsLoading(false);
    }

    fetchData();
  }, []);

  const handleCardPress = (item: ItemType) => {
    navigation.navigate("Details", {
      name: item.title,
      category: item.category,
      description: item.description,
      image: item.image,
      price: item.price,
    });
  };

  const handleToggleFavorite = (item: ItemType) => {
    if (isFavorite(item.id)) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item);
    }
  };

  const isFavorite = (itemId: string) => {
    return favorites.some((item) => item.id === itemId);
  };

  const filterItemsByCategory = (category: string | null) => {
    if (category === "All") {
      return allItems;
    } else {
      return allItems.filter((item) => item.category === category);
    }
  };

  const handleAddToCart = (item: ItemType) => {
    addToCart(item); 
  };

  const renderItem = ({ item }: { item: ItemType }) => (
    <TouchableOpacity onPress={() => handleCardPress(item)}>
      <View style={styles.itemContainer1}>
        <View style={styles.ImageContainer1}>
          <Image source={{ uri: item.image }} style={styles.image1} />
        </View>
        <View style={styles.TextContainer1}>
          <Text style={styles.name1}>{item.title}</Text>
          <Text style={styles.price1}>${item.price.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleToggleFavorite(item)}
          style={styles.favoriteButton}
        >
          <View style={styles.favoriteCircle} />
          <Image
            source={
              isFavorite(item.id)
                ? require("../../assets/images/favorite.png")
                : require("../../assets/images/favorite_border.png")
            }
            style={styles.favoriteIcon}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleAddToCart(item)} style={styles.addToCartButton1}>
          <Text style={styles.addToCartButtonText1}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderItemSecondList = ({ item }: { item: ItemType }) => (
    <TouchableOpacity onPress={() => handleCardPress(item)}>
      <View style={styles.itemContainer2}>
        <View style={styles.ImageContainer2}>
          <Image source={{ uri: item.image }} style={styles.image2} />
        </View>
        <View style={styles.TextContainer2}>
          <Text style={styles.name2}>{item.title}</Text>
          <Text style={styles.price2}>${item.price.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleToggleFavorite(item)}
          style={styles.favoriteButton}
        >
          <View style={styles.favoriteCircle} />
          <Image
            source={
              isFavorite(item.id)
                ? require("../../assets/images/favorite.png")
                : require("../../assets/images/favorite_border.png")
            }
            style={styles.favoriteIcon}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleAddToCart(item)} style={styles.addToCartButton2}>
        <Image
            source={require('../../assets/images/shopping_bag.png')}
            style={styles.imageCart}
        />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (isLoading)
    return (
      <ActivityIndicator
        size="large"
        style={{
          width: "100%",
          height: "100%",
          margin: "auto",
        }}
        color={colors.green}
      />
    );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.Hello}> Hi, Dear</Text>
      <Text style={styles.title}> Most Popular</Text>
      <FlatList
        data={mostPopular}
        horizontal
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.categoryButtons}>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "All" && styles.selectedCategoryButton,
          ]}
          onPress={() => setSelectedCategory("All")}
        >
          <Text
            style={[
              styles.categoryButtonText,
              selectedCategory === "All" && styles.selectedCategoryButtonText,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "Indoor" && styles.selectedCategoryButton,
          ]}
          onPress={() => setSelectedCategory("Indoor")}
        >
          <Text
            style={[
              styles.categoryButtonText,
              selectedCategory === "Indoor" && styles.selectedCategoryButtonText,
            ]}
          >
            Indoor
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "Outdoor" && styles.selectedCategoryButton,
          ]}
          onPress={() => setSelectedCategory("Outdoor")}
        >
          <Text
            style={[
              styles.categoryButtonText,
              selectedCategory === "Outdoor" && styles.selectedCategoryButtonText,
            ]}
          >
            Outdoor
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filterItemsByCategory(selectedCategory)}
        renderItem={renderItemSecondList}
        keyExtractor={(item) => item.id}
        style={styles.secondFlatList}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 24,
    marginTop: 0,
  },
  Hello: {
    marginTop: 39,
    fontSize: 24,
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 24,
  },
  itemContainer1: {
    width: 287,
    height: 140,
    borderRadius: 8,
    marginRight: 16,
    marginBottom: 16,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "row",
  },
  itemContainer2: {
    width: 327,
    height: 279,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  ImageContainer1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ImageContainer2: {
    width: "100%",
    height: 209,
    alignItems: "center",
  },
  TextContainer1: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: 16,
    paddingTop: 8,
  },
  TextContainer2: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: 18,
    paddingTop: 9,
  },
  image1: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  image2: {
    width: "100%",
    height: "100%",
    },
  name1: {
    fontSize: 14,
    fontWeight: "bold",
  },
  name2: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price1: {
    fontSize: 14,
    marginTop: 8,
    fontWeight: "bold",
  },
  price2: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: "bold",
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    left: 8,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
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
  },
  categoryButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 23,
    marginRight: 129,
  },
  categoryButton: {},
  selectedCategoryButton: {},
  categoryButtonText: {
    color: "#969595",
    fontWeight: "bold",
  },
  selectedCategoryButtonText: {
    color: "black",
  },
  secondFlatList: {},

  addToCartButton1: {
    position: "absolute",
    bottom: 8,
    right: 8,
    width: 121,
    height: 20,
    borderRadius: 8,
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
  },
  addToCartButtonText1: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  imageCart: {

  },
  addToCartButton2: {
    position: "absolute",
    bottom: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;