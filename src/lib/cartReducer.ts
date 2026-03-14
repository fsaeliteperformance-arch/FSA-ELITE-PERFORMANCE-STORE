/**
 * Cart state management
 *
 * Performance note: using a single useReducer instead of multiple useState
 * calls reduces the number of re-renders triggered when several cart fields
 * need to change together (e.g. quantity + subtotal) because the reducer
 * batches all state into one update.
 */

import type { CartState, CartAction, CartItem } from "@/types";

export const initialCartState: CartState = { items: [] };

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      // Single-pass: map the array once, tracking whether the item was found.
      // This avoids the prior find() + map() double-scan (O(2n) → O(n)).
      let found = false;
      const updatedItems = state.items.map((cartItem) => {
        if (cartItem.product.id === action.product.id) {
          found = true;
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });
      return {
        items: found
          ? updatedItems
          : [...state.items, { product: action.product, quantity: 1 }],
      };
    }

    case "REMOVE_ITEM":
      return {
        items: state.items.filter(
          (cartItem) => cartItem.product.id !== action.productId,
        ),
      };

    case "INCREMENT":
      return {
        items: state.items.map((cartItem) =>
          cartItem.product.id === action.productId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        ),
      };

    case "DECREMENT":
      return {
        items: state.items
          .map((cartItem) =>
            cartItem.product.id === action.productId
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem,
          )
          .filter((cartItem) => cartItem.quantity > 0),
      };

    case "CLEAR":
      return initialCartState;

    default:
      return state;
  }
}

/** Derive the total order value in cents from the current cart state. */
export function cartTotal(items: CartItem[]): number {
  return items.reduce(
    (runningTotal, cartItem) =>
      runningTotal + cartItem.product.price * cartItem.quantity,
    0,
  );
}

/** Derive the total item count from the current cart state. */
export function cartCount(items: CartItem[]): number {
  return items.reduce(
    (runningTotal, cartItem) => runningTotal + cartItem.quantity,
    0,
  );
}
