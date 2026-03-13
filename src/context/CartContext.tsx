/**
 * CartContext
 *
 * The context is split into two to minimise unnecessary re-renders:
 *
 *  • CartActionsContext  — dispatch + stable helper callbacks (addItem,
 *    removeItem, clearCart).  This value never changes after the first render,
 *    so components that only dispatch actions (e.g. AddToCartButton) will
 *    never re-render because of a cart state change.
 *
 *  • CartStateContext    — reactive state (items, total, count).  Only
 *    components that actually display cart data subscribe to this context.
 *
 * The derived totals are computed with useMemo so child components that
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
  cartTotal,
  cartCount,
} from "@/lib/cartReducer";
import type { CartState, CartAction, Product } from "@/types";

// ---------------------------------------------------------------------------
// Context shapes
// ---------------------------------------------------------------------------

interface CartStateContextValue {
  state: CartState;
  total: number;
  count: number;
}

interface CartActionsContextValue {
  dispatch: React.Dispatch<CartAction>;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

// ---------------------------------------------------------------------------
// Contexts
// ---------------------------------------------------------------------------

const CartStateContext = createContext<CartStateContextValue | null>(null);
const CartActionsContext = createContext<CartActionsContextValue | null>(null);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  // Derived values re-computed only when state.items reference changes.
  const total = useMemo(() => cartTotal(state.items), [state.items]);
  const count = useMemo(() => cartCount(state.items), [state.items]);

  // Stable callbacks — dispatch identity is guaranteed stable by React, so
  // these callbacks also never change, meaning CartActionsContext never
  // produces a new object reference after the initial render.
  const addItem = useCallback(
    (product: Product) => dispatch({ type: "ADD_ITEM", product }),
    [],
  );
  const removeItem = useCallback(
    (productId: string) => dispatch({ type: "REMOVE_ITEM", productId }),
    [],
  );
  const clearCart = useCallback(() => dispatch({ type: "CLEAR" }), []);

  // Actions context value is stable — created once and never recreated.
  // dispatch is guaranteed stable by React's useReducer contract.
  // addItem, removeItem, clearCart are useCallback wrappers with empty deps,
  // so they are also stable for the lifetime of the provider.
  // Including them in the dependency array satisfies exhaustive-deps while
  // still ensuring the memo runs exactly once.
  const actionsValue = useMemo<CartActionsContextValue>(
    () => ({ dispatch, addItem, removeItem, clearCart }),
    [dispatch, addItem, removeItem, clearCart],
  );

  // State context value changes whenever reactive cart data changes.
  const stateValue = useMemo<CartStateContextValue>(
    () => ({ state, total, count }),
    [state, total, count],
  );

  return (
    <CartActionsContext.Provider value={actionsValue}>
      <CartStateContext.Provider value={stateValue}>
        {children}
      </CartStateContext.Provider>
    </CartActionsContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

/** Subscribe only to reactive cart data (items, total, count). */
export function useCartState(): CartStateContextValue {
  const ctx = useContext(CartStateContext);
  if (!ctx) throw new Error("useCartState must be used inside <CartProvider>");
  return ctx;
}

/** Subscribe only to stable cart action dispatchers. Never triggers re-renders. */
export function useCartActions(): CartActionsContextValue {
  const ctx = useContext(CartActionsContext);
  if (!ctx) throw new Error("useCartActions must be used inside <CartProvider>");
  return ctx;
}

/**
 * Convenience hook that merges both contexts.
 * Prefer the granular hooks (useCartState / useCartActions) when a component
 * only needs one slice of the cart.
 */
export function useCart(): CartStateContextValue & CartActionsContextValue {
  return { ...useCartState(), ...useCartActions() };
}
