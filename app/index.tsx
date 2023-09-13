import React from "react";
import { StatusBar } from "expo-status-bar";
import Navigation from "../app/Navigation/Navigation";
import { useFonts } from "expo-font";
import { FavoritesProvider } from "./contextoFavorites";
import { CartProvider } from "./contextCart";
import { StyleSheet, View } from "react-native"; 

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins: require("../app/assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <View style={styles.container}> 
        <FavoritesProvider>
          <CartProvider> 
            <StatusBar />
            <Navigation />
          </CartProvider>
        </FavoritesProvider>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: "white", 
  },
});
