import { StatusBar } from "expo-status-bar";
import Navigation from "../app/Navigation/Navigation";
import { useFonts } from "expo-font";
import { AppContextProvider } from "../app/Screens/App.context";


export default function App() {
    const [fontsLoaded] = useFonts({
    Poppins: require("../app/assets/fonts/Poppins-Regular.ttf")
    });

    if (!fontsLoaded) {
    return null;
    }

    return (
        <AppContextProvider>
            <>
                <StatusBar backgroundColor='#f4f0ff' style='dark' />
                    <Navigation />
            </>
        </AppContextProvider>
        );
    }
    