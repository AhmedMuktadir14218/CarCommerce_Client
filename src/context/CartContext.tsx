// src/context/CartContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { ICar } from "../types/types";

interface CartItem extends ICar {
  quantityInCart: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (car: ICar) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (car: ICar) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === car._id);

      if (existing) {
        // Same product in cart, increase quantity if stock allows
        if (existing.quantityInCart < car.quantity) {
          return prev.map((item) =>
            item._id === car._id
              ? { ...item, quantityInCart: item.quantityInCart + 1 }
              : item
          );
        }
        // Stock limit reached, no change
        return prev;
      }

      // New product, add it to the cart
      return [...prev, { ...car, quantityInCart: 1 }];
    });
  };

  const increaseQuantity = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id && item.quantityInCart < item.quantity
          ? { ...item, quantityInCart: item.quantityInCart + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === id && item.quantityInCart > 1
            ? { ...item, quantityInCart: item.quantityInCart - 1 }
            : item
        )
        .filter((item) => item.quantityInCart > 0)
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, increaseQuantity, decreaseQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
