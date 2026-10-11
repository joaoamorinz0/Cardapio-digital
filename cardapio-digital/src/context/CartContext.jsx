/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

const storageKey = (slug) => `cardapio:${slug}:cart`;

function readCart(slug) {
  try {
    const savedCart = window.sessionStorage.getItem(storageKey(slug));
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children, slug }) {
  const [items, setItems] = useState(() => readCart(slug));

  useEffect(() => {
    window.sessionStorage.setItem(storageKey(slug), JSON.stringify(items));
  }, [items, slug]);

  const value = useMemo(() => {
    const addToCart = (product, quantity = 1, note = '') => {
      const lineId = `${product.id}::${note}`;

      setItems((currentItems) => {
        const existing = currentItems.find((item) => item.lineId === lineId);

        if (existing) {
          return currentItems.map((item) => (
            item.lineId === lineId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ));
        }

        return [...currentItems, { ...product, lineId, quantity, note }];
      });
    };

    const updateItemQuantity = (lineId, delta) => {
      setItems((currentItems) => currentItems
        .map((item) => (
          item.lineId === lineId
            ? { ...item, quantity: item.quantity + delta }
            : item
        ))
        .filter((item) => item.quantity > 0));
    };

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return { items, addToCart, updateItemQuantity, subtotal };
  }, [items]);

  return <CartContext.Provider value={value} key={slug}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart deve ser usado dentro de CartProvider.');
  }

  return context;
}
