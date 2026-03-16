"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import {
  cartReducer,
  initialCartState,
  cartSummary,
} from "@/lib/cartReducer";
import type { CartState, CartAction, Product } from "@/types";

interface CartContextValue {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  total: number;
  count: number;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

/** localStorage key used to persist cart state across page loads. */
const CART_STORAGE_KEY = "fsa-elite-cart";

/**
 * Read the initial cart state from localStorage (SSR-safe).
 * Falls back to an empty cart if storage is unavailable, the data is
 * corrupted, or the stored shape no longer matches CartState — we never want
 * a storage error to crash the app.
 */
function loadInitialState(): CartState {
  if (typeof window === "undefined") return initialCartState;
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return initialCartState;
    const parsed: unknown = JSON.parse(stored);
    // Basic structural validation — discard data that doesn't match CartState.
    if (
      parsed !== null &&
      typeof parsed === "object" &&
      "items" in parsed &&
      Array.isArray((parsed as { items: unknown }).items)
    ) {
      return parsed as CartState;
    }
    return initialCartState;
  } catch {
    return initialCartState;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadInitialState);

  // Persist cart to localStorage whenever items change.
  // Using a separate useEffect keeps the reducer pure and avoids side-effects
  // inside dispatch.
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage unavailable (private browsing, quota exceeded, etc.) — ignore.
    }
  }, [state]);

  // Derived values re-computed only when state.items reference changes, and in
  // a single pass over the cart items.
  const { total, count } = useMemo(() => cartSummary(state.items), [state.items]);

  // Stable callbacks prevent unnecessary re-renders in consumer components.
  const addItem = useCallback(
    (product: Product) => dispatch({ type: "ADD_ITEM", product }),
    [],
  );
  const removeItem = useCallback(
    (productId: string) => dispatch({ type: "REMOVE_ITEM", productId }),
    [],
  );
  const clearCart = useCallback(() => dispatch({ type: "CLEAR" }), []);

  const value = useMemo<CartContextValue>(
    () => ({ state, dispatch, total, count, addItem, removeItem, clearCart }),
    [state, dispatch, total, count, addItem, removeItem, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const cartContextValue = useContext(CartContext);
  if (!cartContextValue)
    throw new Error("useCart must be used inside <CartProvider>");
  return cartContextValue;
}
