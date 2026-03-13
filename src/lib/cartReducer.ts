/**
 * Cart state management
 *
 * Performance note: using a single useReducer instead of multiple useState
 * calls reduces the number of re-renders triggered when several cart fields
 * need to change together (e.g. quantity + subtotal) because the reducer
 * batches all state into one update.
 *
 * Each case performs a single pass over `state.items` — no two-pass
 * find-then-map or map-then-filter patterns.
 */

import type { CartState, CartAction, CartItem } from "@/types";

export const initialCartState: CartState = { items: [] };

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      // Single pass: update the matching item's quantity, or append if absent.
      let found = false;
      const updated = state.items.map((i) => {
        if (i.product.id === action.product.id) {
          found = true;
          return { ...i, quantity: i.quantity + 1 };
        }
        return i;
      });
      // `updated` is already a new array from map(), so push() is safe here.
      if (!found) updated.push({ product: action.product, quantity: 1 });
      return { items: updated };
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
      // Single pass: decrement and drop items whose quantity would reach zero.
      return {
        items: state.items.reduce<CartItem[]>((acc, i) => {
          if (i.product.id === action.productId) {
            if (i.quantity > 1) acc.push({ ...i, quantity: i.quantity - 1 });
            // quantity would become 0 → drop the item entirely
          } else {
            acc.push(i);
          }
          return acc;
        }, []),
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
