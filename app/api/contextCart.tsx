import React, { createContext, useContext, useState, ReactNode } from "react";

export type ItemType = {
  quantity: number;
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  categoryId: string;
  image: any;
};

type CartContextType = {
  cartItems: ItemType[];
  addToCart: (item: ItemType) => void;
  removeFromCart: (itemId: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<ItemType[]>([]);

  const addToCart = (item: ItemType) => {
    setCartItems((prevCartItems) => [...prevCartItems, item]);
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== itemId)
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
