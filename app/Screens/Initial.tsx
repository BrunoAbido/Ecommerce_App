import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../constants/Colors';

function Initial({navigation} : {navigation: any}) {
    return(
        <View style={styles.container}>
        <Image
            source={require('../assets/images/initialimage.png')}
            style={styles.image}
            resizeMode="cover"
        />
        <View style={styles.content}>
            <Text style={styles.title}>Plant Paradise</Text>
            <Text style={styles.description}>Find your favorite plants and help the environment</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.replace('SignInScreen')}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.replace('SignUpScreen')}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    </View>
)}

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    content: {
        padding: 24,
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'left',
        marginRight: 126,
    },
    description: {
        fontSize: 16,
        marginBottom: 32,
        textAlign: 'left',
    },
    button: {
        backgroundColor: colors.green,
        width: '100%',
        padding: 16,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default Initial;
