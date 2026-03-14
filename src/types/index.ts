export const CATEGORY_VALUES = [
  "apparel",
  "accessories",
  "sales-tools",
  "digital",
] as const;

export type Category = (typeof CATEGORY_VALUES)[number];

export const CATEGORY_FILTER_OPTIONS: {
  label: string;
  value: Category | "all";
}[] = [
  { label: "All", value: "all" },
  { label: "Apparel", value: "apparel" },
  { label: "Accessories", value: "accessories" },
  { label: "Sales Tools", value: "sales-tools" },
  { label: "Digital", value: "digital" },
];

export function isCategory(value: string): value is Category {
  return CATEGORY_VALUES.includes(value as Category);
}

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
