import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Services/firebaseConfigSignUp';
import colors from '../constants/Colors';

const SignUp = ({ navigation }: { navigation: any }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSignUp = () => {
        setError(null);

        if (!email || !password || password.length < 6 || !isValidEmail(email)) {
            setError('Please provide a valid email address and a password of at least 6 characters.');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                navigation.navigate('SignInScreen');
            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage);
            });
    };

    const isValidEmail = (email: string) => {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailRegex.test(email);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonToSignIn} onPress={() => navigation.replace('SignInScreen')}>
                <Text style={styles.buttonToSignInText}>I already have an account</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
    button: {
        backgroundColor: colors.green,
        width: '100%',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    buttonToSignIn: {
        backgroundColor: "white",
        width: '500%',
        padding: 30,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonToSignInText: {
        color: 'black',
        fontSize: 10,
        fontWeight: 'bold',
    }
});

export default SignUp;