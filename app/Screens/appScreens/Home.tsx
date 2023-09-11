import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { firstFlatList, secondFlatList } from '../../api/mock/data';

function Home ({navigation}: {navigation: any}) {

    type ItemType = {
        id: string;
        imageSource: any;
        name: string;
        price: number;
        subtitle: string;
        additionalText: string;
        detailsImageSource: any;
    };
    
    const [favorites, setFavorites] = useState<ItemType[]>([]);

    const renderItem = ({ item }: { item: ItemType }) => {
        const handleCardPress = () => {
            navigation.navigate('Details', {
                name: item.name,
                subtitle: item.subtitle,
                text: item.additionalText, 
                imageSource: item.detailsImageSource, 
                price: item.price, 
            });
        };

        const handleFavoriteToggle = () => {
            const isFavorite = favorites.some((favoriteItem) => favoriteItem.id === item.id);

            if (isFavorite) {
                const updatedFavorites = favorites.filter((favoriteItem) => favoriteItem.id !== item.id);
                setFavorites(updatedFavorites);
            } else {
                setFavorites([...favorites, item]);
            }
        };

        const isFavorite = favorites.some((favoriteItem) => favoriteItem.id === item.id);

        return (
            <TouchableOpacity onPress={handleCardPress}>
                <View style={styles.itemContainer1}>
                    <View style={styles.ImageContainer1}>
                        <Image source={item.imageSource} style={styles.image1} />
                    </View>
                    <View style={styles.TextContainer1}>
                        <Text style={styles.name1}>{item.name}</Text>
                        <Text style={styles.price1}>${item.price.toFixed(2)}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={handleFavoriteToggle}
                        style={[
                            styles.favoriteButton,
                            isFavorite ? styles.favoriteButtonActive : null
                        ]}
                    >
                        <Image
                            source={isFavorite ? require('../../assets/images/Favorites.png') : require('../../assets/images/Favorites.png')}
                            style={styles.favoriteIcon}
                        />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    };

    const renderItemSecondList = ({ item }: { item: ItemType }) => {
        const handleCardPress = () => {
            navigation.navigate('Details', {
                name: item.name,
                subtitle: item.subtitle,
                text: item.additionalText, 
                imageSource: item.detailsImageSource, 
                price: item.price, 
            });
        };

        const handleFavoriteToggle = () => {
            const isFavorite = favorites.some((favoriteItem) => favoriteItem.id === item.id);

            if (isFavorite) {
                const updatedFavorites = favorites.filter((favoriteItem) => favoriteItem.id !== item.id);
                setFavorites(updatedFavorites);
            } else {
                setFavorites([...favorites, item]);
            }
        };

        const isFavorite = favorites.some((favoriteItem) => favoriteItem.id === item.id);

        return (
            <TouchableOpacity onPress={handleCardPress}>
                <View style={styles.itemContainer2}>
                    <View style={styles.ImageContainer2}>
                        <Image source={item.imageSource} style={styles.image2} />
                    </View>
                    <View style={styles.TextContainer2}>
                        <Text style={styles.name2}>{item.name}</Text>
                        <Text style={styles.price2}>${item.price.toFixed(2)}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={handleFavoriteToggle}
                        style={[
                            styles.favoriteButton,
                            isFavorite ? styles.favoriteButtonActive : null
                        ]}
                    >
                        <Image
                            source={isFavorite ? require('../../assets/images/Favorites.png') : require('../../assets/images/Favorites.png')}
                            style={styles.favoriteIcon}
                        />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.Hello}> Hi, Bruno</Text>
            <Text style={styles.title}> Most Popular</Text>
            <FlatList
                data={firstFlatList}
                horizontal
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            <FlatList
                data={secondFlatList}
                horizontal={false}
                renderItem={renderItemSecondList}
                keyExtractor={(item) => item.id}
                style={styles.secondFlatList}
            />
        </View>
    );
};

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
    itemContainer1: {
        marginLeft: 6,
        width: 287,
        height: 140,
        borderRadius: 8,
        marginRight: 16,
        marginBottom: 300,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        flexDirection: 'row',
    },
    ImageContainer1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TextContainer1: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 16,
        paddingTop: 8,
    },
    image1: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    name1: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    price1: {
        fontSize: 14,
        marginTop: 8,
        fontWeight: 'bold',
    },
    secondFlatList: {
        
    },
    itemContainer2: {
        marginLeft: 6,
        width: 327,
        height: 279,
        borderRadius: 8,
        marginBottom: 16,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    ImageContainer2: {
        width: '100%',
        height: 209,
        alignItems: 'center',
    },
    TextContainer2: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 18,
        paddingTop: 9,
    },
    name2: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    price2: {
        fontSize: 14,
        marginTop: 5,
        fontWeight: 'bold',
    },
    image2: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    favoriteButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    favoriteButtonActive: {
        backgroundColor: 'red', // Altere para a cor desejada quando for marcado como favorito
    },
    favoriteIcon: {
        width: 24,
        height: 24,
    },
});

export default Home;
