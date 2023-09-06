import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "../app/Navigation/Navigation";
import { useFonts } from "expo-font";


export default function App() {
    const [fontsLoaded] = useFonts({
    Poppins: require("../app/assets/fonts/Poppins-Regular.ttf")
    });

    if (!fontsLoaded) {
    return null;
    }

    return (
        <>
            <StatusBar style="light" />
                <Navigation />
        </>
        );
    }
    