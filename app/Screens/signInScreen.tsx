import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import colors from '../constants/Colors';

const SignInScreen = ({ navigation }: { navigation: any }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignIn = () => {
        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('Usuário autenticado:', user);
                navigation.navigate('Home', { userId: user.uid });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Erro ao autenticar:', errorMessage);

                setErrorMessage(errorMessage);
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Sign In</Text>
            </View>
            {errorMessage !== '' && (
                <Text style={styles.errorText}>{errorMessage}</Text>
            )}
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your password"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonToSignUp} onPress={() => navigation.replace('SignUpScreen')}>
                <Text style={styles.buttonToSignInText}>I don't have an account</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    header: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 100,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        borderRadius: 10,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
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
    errorText: {
        color: 'red',
        fontSize: 16,
        marginBottom: 10,
    },
    buttonToSignUp: {
        backgroundColor: "white",
        width: '100%',
        padding: 30,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonToSignInText: {
        color: 'black',
        fontSize: 12,
        fontWeight: 'bold',
    }
});

export default SignInScreen;
