"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type CartItem = {
  id: number;
  name: string;
  priceCents: number;
  image: string;
  quantity: number;
};

type CartContextProps = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;
  clearCart: () => void;
  totalCents: number;
  itemCount: number;
};

const CartContext = createContext<CartContextProps | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("needle-hue-cart");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load cart", e);
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("needle-hue-cart", JSON.stringify(items));
  }, [items]);

  const addItem = (item: CartItem) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
  };

  const removeItem = (id: number) => setItems(prev => prev.filter(i => i.id !== id));
  
  const increment = (id: number) => setItems(prev => 
    prev.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i)
  );

  const decrement = (id: number) => setItems(prev => 
    prev.map(i => i.id === id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i)
  );

  const clearCart = () => setItems([]);

  const totalCents = items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, increment, decrement, clearCart, totalCents, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
