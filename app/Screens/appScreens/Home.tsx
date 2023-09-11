import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

type ItemType = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  categoryId: string;
  image: string;
};

function Home({ navigation }: { navigation: any }) {
  const [mostPopular, setMostPopular] = useState<ItemType[]>([]);
  const [allItems, setAllItems] = useState<ItemType[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const responseMostPopular = await axios.get(
          'https://8jcox47hg2.execute-api.us-east-2.amazonaws.com/dev/'
        );

        const { mostPopular } = responseMostPopular.data.body.data;

        setMostPopular(mostPopular);
        const responseAllItems = await axios.get(
          'https://8jcox47hg2.execute-api.us-east-2.amazonaws.com/dev/'
        );

        const { items } = responseAllItems.data.body.data;

        setAllItems(items);
      } catch (error: any) { 
        if (axios.isAxiosError(error)) {
          console.error('Erro ao buscar dados da API:', error.message);
        } else {
          console.error('Erro desconhecido:', error);
        }
      }
    }

    fetchData();
  }, []);

  const handleCardPress = (item: ItemType) => {
    navigation.navigate('Details', {
      name: item.title,
      subtitle: item.description,
      text: '',
      imageSource: item.image,
      price: item.price,
    });
  };

  const renderItem = ({ item }: { item: ItemType }) => (
    <TouchableOpacity onPress={() => handleCardPress(item)}>
      <View style={styles.itemContainer}>
        <View style={styles.ImageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>
        <View style={styles.TextContainer}>
          <Text style={styles.name}>{item.title}</Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.Hello}> Hi, Bruno</Text>
      <Text style={styles.title}> Most Popular</Text>
      <FlatList
        data={mostPopular}
        horizontal
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <Text style={styles.title}> All Items</Text>
      <FlatList
        data={allItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.verticalFlatList} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 22,
    marginTop: 0,
  },
  Hello: {
    marginLeft: 4,
    marginTop: 39,
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    marginLeft: 4,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 24,
  },
  itemContainer: {
    marginLeft: 6,
    width: 287,
    height: 140,
    borderRadius: 8,
    marginRight: 16,
    marginBottom: 16,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'row',
  },
  ImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 16,
    paddingTop: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    marginTop: 8,
    fontWeight: 'bold',
  },
  verticalFlatList: {
  },
});

export default Home;
