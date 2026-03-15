/**
 * CartContext
 *
 * Provides cart state to the component tree.  The context value is stable
 * across renders because dispatch (from useReducer) never changes identity,
 * and the derived totals are computed with useMemo so child components that
 * only consume totals don't re-render when an unrelated cart field changes.
 */
"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback,
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

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

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
