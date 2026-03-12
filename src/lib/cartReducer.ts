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
      const existing = state.items.find(
        (i) => i.product.id === action.product.id,
      );
      if (existing) {
        // Already in cart → increment quantity in-place
        return {
          items: state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          ),
        };
      }
      return {
        items: [...state.items, { product: action.product, quantity: 1 }],
      };
    }

    case "REMOVE_ITEM":
      return {
        items: state.items.filter((i) => i.product.id !== action.productId),
      };

    case "INCREMENT":
      return {
        items: state.items.map((i) =>
          i.product.id === action.productId
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        ),
      };

    case "DECREMENT":
      return {
        items: state.items
          .map((i) =>
            i.product.id === action.productId
              ? { ...i, quantity: i.quantity - 1 }
              : i,
          )
          .filter((i) => i.quantity > 0),
      };

    case "CLEAR":
      return initialCartState;

    default:
      return state;
  }
}

/** Derive the total order value in cents from the current cart state. */
export function cartTotal(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
}

/** Derive the total item count from the current cart state. */
export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}
