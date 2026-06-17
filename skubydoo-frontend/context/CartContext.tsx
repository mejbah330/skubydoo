"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface CartItem {
  productId: string;
  variationId: string;
  name: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (variationId: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  setItems: (items: CartItem[]) => void;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
  itemCount: 0,
  subtotal: 0,
  setItems: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.variationId === item.variationId);
      if (existing) {
        return prev.map((i) =>
          i.variationId === item.variationId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const removeItem = (variationId: string) => {
    setItems((prev) => prev.filter((i) => i.variationId !== variationId));
  };

  const clearCart = () => setItems([]);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart, itemCount, subtotal, setItems }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
