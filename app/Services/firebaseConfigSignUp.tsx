import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAwf8hXW0gP3t7lQzgXBp9al6SqeDEtX8E",
    authDomain: "challenge3-2d83d.firebaseapp.com",
    projectId: "challenge3-2d83d",
    storageBucket: "challenge3-2d83d.appspot.com",
    messagingSenderId: "229650276456",
    appId: "1:229650276456:web:21af3799a722cd6d2d9bdd",
    measurementId: "G-MSFR09YC97"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth (app);