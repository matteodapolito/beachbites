"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { CartContextType, CartItem } from "@/app/constants/constants";

// Creiamo il contesto del carrello con un valore iniziale vuoto
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (i) => i.menu_item.id === item.menu_item.id
      );
      if (existingItem) {
        return prevItems.map((i) =>
          i.menu_item.id === item.menu_item.id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        return [...prevItems, item];
      }
    });
  };

  const removeFromCart = (itemId: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.menu_item.id === itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeEntireProduct = (itemId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.menu_item.id !== itemId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        removeEntireProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
