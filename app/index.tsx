import React from "react";
import { StatusBar } from "expo-status-bar";
import Navigation from "../app/Navigation/Navigation";
import { useFonts } from "expo-font";
import { FavoritesProvider } from "./contextoFavorites";
import { CartProvider } from "../app/api/contextCart";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins: require("../app/assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
        <FavoritesProvider>
        <CartProvider> 
            
            <StatusBar backgroundColor="#f4f0ff" style="dark" />
            <Navigation />
            
        </CartProvider>
        </FavoritesProvider>
    </>
  );
}
