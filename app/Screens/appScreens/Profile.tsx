import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack'; 
import { RootStackParamList } from '../../Navigation/Navigation';

type ProfileProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Profile'>;
};

function Profile({ navigation }: ProfileProps) {
    const user = {
        name: 'Bruno',
        email: 'brunoabidi@gmail.com',
        profileImage: require('../../assets/images/Image.png'),
    };

    const [confirmLogout, setConfirmLogout] = useState(false);

    const handleLogout = () => {
        if (confirmLogout) {
        navigation.navigate('Initial');
        } else {
        Alert.alert(
            'Alert',
            'Do you really want to leave?',
            [
            {
                text: 'Cancel',
                onPress: () => console.log('Canceled'),
                style: 'cancel',
            },
            {
                text: 'Confirm',
                onPress: () => setConfirmLogout(true),
                style: 'destructive',
            },
            ],
            { cancelable: true }
        );
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.container1}>
            <View>
            <Image source={user.profileImage} style={styles.profileImage} />
            </View>
            <View style={styles.userContainer}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            </View>
        </View>

        <View style={styles.line} />

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Exit</Text>
        </TouchableOpacity>
        </ScrollView>
    );
    }

    const styles = StyleSheet.create({
    container: {},
    container1: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginTop: 51,
        marginLeft: 24,
    },
    userContainer: {
        marginTop: 69,
        marginLeft: 16,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    userEmail: {
        fontSize: 18,
        color: 'gray',
        marginBottom: 20,
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: 'black',
        marginTop: 40,
    },
    logoutButton: {
        borderRadius: 5,
        marginTop: 20,
        marginLeft: 24,
        width: 34,
    },
    logoutButtonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Profile;
