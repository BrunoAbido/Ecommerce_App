import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import colors from '../constants/Colors';

const SignInScreen = ( {navigation} : {navigation: any}) => {
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
                const errorMessage = error.message;
                console.error('Erro ao autenticar:', errorMessage);
                
                setErrorMessage(errorMessage);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>
            {errorMessage !== '' && (
                <Text style={styles.errorText}>{errorMessage}</Text>
            )}
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
            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonToSignIn} onPress={() => navigation.replace('SignUpScreen')}>
                <Text style={styles.buttonToSignInText}>I dont have an account</Text>
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
    errorText: {
        color: 'red',
        fontSize: 16,
        marginBottom: 10,
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

export default SignInScreen;
