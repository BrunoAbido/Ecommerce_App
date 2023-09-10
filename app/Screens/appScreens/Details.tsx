import React, { useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export type RootStackParamList = {
    Initial: undefined; 
    SignUpScreen: undefined;
    SignInScreen: undefined;
    Details: {
        name: string;
        subtitle: string;
        text: string;
        imageSource: any;
        price: number;
    };
    Home: undefined;
};

type DetailsProps = {
    route: RouteProp<RootStackParamList, 'Details'>;
    navigation: NativeStackNavigationProp<RootStackParamList, 'Details'>;
};

export function Details({ route, navigation }: DetailsProps) {
    const { name, subtitle, text, imageSource, price } = route.params;
    const [itemQuantity, setItemQuantity] = useState(0);

    const handleAddItem = () => {
        setItemQuantity(itemQuantity + 1);
    };

    const handleRemoveItem = () => {
        if (itemQuantity > 0) {
            setItemQuantity(itemQuantity - 1);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Image source={require('../../assets/images/arrow_back_ios.png')} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Details</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/images/favorite_border.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.containerImage}>
                <Image source={imageSource} style={styles.image} />
            </View>
            <View style={styles.containerText}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>${price}</Text>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity onPress={handleRemoveItem}>
                            <Image source={require('../../assets/images/Less.png')} />
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{itemQuantity}</Text>
                        <TouchableOpacity onPress={handleAddItem}>
                            <Image source={require('../../assets/images/Plus.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.text}>{text}</Text>
            </View>
            <View style={styles.footer}>
                <View style={styles.totalContainer}>
                    <Text style={styles.footerText}>Total price </Text>
                    <Text style={styles.newPrice}>${(price * itemQuantity).toFixed(2)}</Text>
                </View>
                <TouchableOpacity onPress={() => {}} style={styles.footerButton}>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#dddddd',
    },
    headerTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 13,
        alignSelf: 'center',
    },
    containerImage: {
        flex: 0.4,
        alignItems: 'center',
    },
    containerText: {
        flex: 0.6,
    },
    image: {
        width: '100%',
        height: 247,
        resizeMode: 'cover',
        borderRadius: 8,
    },
    name: {
        fontSize: 16,
        marginTop: 24,
        marginLeft: 24,
        color: '#969595',
    },
    subtitle: {
        fontSize: 28,
        marginTop: 16,
        marginLeft: 24,
        fontWeight: 'bold',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', 
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16,
        marginLeft: 24,
    },
    quantityContainer: {
        flexDirection: 'row',
        marginRight: 24,

    },
    quantityText: {
        fontSize: 18,
        marginHorizontal: 8,
    },
    newPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 24,
        marginTop: 2,

    },
    text: {
        fontSize: 14,
        marginTop: 24,
        marginLeft: 21,
        color: '#969595',
    },
    footer: {
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
    },
    totalContainer: {
    },
    footerText: {
        fontSize: 12,
        marginTop: 20,
        marginLeft: 26,
    },
    footerButton: {
        borderRadius: 8,
        backgroundColor: 'green',
        width: 114,
        height: 48,
        marginTop: 16,
        marginRight: 24,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 14,
        color: 'white',
        marginTop: 14,
    },
});

export default Details;
