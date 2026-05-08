"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface WishlistItem {
  id: number;
  name: string;
  priceCents: number;
  image: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  toggleWishlist: (item: WishlistItem) => void;
  isInWishlist: (id: number) => boolean;
  itemCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<WishlistItem[]>([]);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    if (saved) setItems(JSON.parse(saved));
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(items));
  }, [items]);

  const toggleWishlist = (item: WishlistItem) => {
    setItems(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.filter(i => i.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const isInWishlist = (id: number) => items.some(i => i.id === id);

  return (
    <WishlistContext.Provider value={{ items, toggleWishlist, isInWishlist, itemCount: items.length }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
