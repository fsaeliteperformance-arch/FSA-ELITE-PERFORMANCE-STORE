/** Canonical product record used throughout the store. */
export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number; // in cents to avoid floating-point rounding errors
  category: Category;
  imageUrl: string;
  inStock: boolean;
  stripeProductId?: string;
  stripePriceId?: string;
}

export type Category =
  | "apparel"
  | "accessories"
  | "sales-tools"
  | "digital";

/** A single item held in the shopping cart. */
export interface CartItem {
  product: Product;
  quantity: number;
}

/** Shape of the cart state managed by useReducer. */
export interface CartState {
  items: CartItem[];
}

/** Discriminated union of every cart action. */
export type CartAction =
  | { type: "ADD_ITEM"; product: Product }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "INCREMENT"; productId: string }
  | { type: "DECREMENT"; productId: string }
  | { type: "CLEAR" };
