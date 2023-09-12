import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';

type ItemType = {
    id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    categoryId: string;
    image: any;
};

type AppContextType = {
    favoritos: string[];
    toggleFavorito: (itemId: string) => void;
    items: ItemType[];
};

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppContextProviderProps = {
    children: ReactNode;
};

export function AppContextProvider({ children }: AppContextProviderProps) {
    const [favoritos, setFavoritos] = useState<string[]>([]);
    const [items, setItems] = useState<ItemType[]>([]); 

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(
                    'https://8jcox47hg2.execute-api.us-east-2.amazonaws.com/dev/'
                );

                const { items } = response.data.body.data;

                setItems(items);
            } catch (error: any) {
                if (axios.isAxiosError(error)) {
                    console.error('Erro ao buscar dados da API:', error.message);
                } else {
                    console.error('Erro desconhecido:', error);
                }
            }
        }

        fetchData();
    }, []);

    const toggleFavorito = (itemId: string) => {
        if (favoritos.includes(itemId)) {
            setFavoritos(favoritos.filter((id) => id !== itemId));
        } else {
            setFavoritos([...favoritos, itemId]);
        }
    };

    return (
        <AppContext.Provider value={{ favoritos, toggleFavorito, items }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('error');
    }
    return context;
}
