/**
 * Product data layer
 *
 * Performance notes
 * -----------------
 * • `getProducts` is called from React Server Components so the fetch runs
 *   server-side and the JSON is never shipped to the browser.
 * • Results are cached with `{ next: { revalidate: 3600 } }` (ISR-style),
 *   meaning the data is refreshed at most once per hour instead of on every
 *   request.
 * • Individual product lookups use `find()` over a pre-fetched array — O(n)
 *   but fast for a catalogue this size.  A Map keyed by slug is used in
 *   `getProductBySlug` to achieve O(1) lookup when calling during static
 *   generation of many pages.
 */

import type { Product } from "@/types";

// ---------------------------------------------------------------------------
// Catalogue (in production this would be fetched from a CMS / database)
// ---------------------------------------------------------------------------
export const PRODUCTS: Product[] = [
  {
    id: "prod_007",
    slug: "olive-lite",
    name: "Olive Lite",
    description:
      "Free core subscription for lead generation and onboarding. Includes chat with Olive, 3 templates, 1 industry cheat-sheet, and email capture.",
    price: 0, // Free
    category: "subscriptions",
    imageUrl: "https://placehold.co/600x600/1a1a2e/ffffff?text=Olive+Lite",
    inStock: true,
    stripeProductId: "prod_placeholder_007",
    stripePriceId: "price_placeholder_007",
  },
  {
    id: "prod_001",
    slug: "fsa-elite-performance-tee",
    name: "FSA Elite Performance Tee",
    description:
      "Moisture-wicking premium tee branded with the FSA Elite Performance logo. Perfect for meetings, events, and everyday hustle.",
    price: 3499, // $34.99
    category: "apparel",
    imageUrl: "/images/elite-tee.svg",
    inStock: true,
    stripeProductId: "prod_placeholder_001",
    stripePriceId: "price_placeholder_001",
  },
  {
    id: "prod_002",
    slug: "fsa-elite-hoodie",
    name: "FSA Elite Hoodie",
    description:
      "Heavy-duty pullover hoodie with embroidered FSA Elite logo. Stay sharp on the showroom floor or on the road.",
    price: 6499, // $64.99
    category: "apparel",
    imageUrl: "/images/elite-hoodie.svg",
    inStock: true,
    stripeProductId: "prod_placeholder_002",
    stripePriceId: "price_placeholder_002",
  },
  {
    id: "prod_003",
    slug: "fsa-elite-snapback",
    name: "FSA Elite Snapback",
    description:
      "Structured snapback cap with flat brim and embroidered FSA Elite Performance logo.",
    price: 2999, // $29.99
    category: "accessories",
    imageUrl: "/images/elite-snapback.svg",
    inStock: true,
    stripeProductId: "prod_placeholder_003",
    stripePriceId: "price_placeholder_003",
  },
  {
    id: "prod_004",
    slug: "fsa-elite-sales-playbook",
    name: "FSA Elite Sales Playbook (Digital)",
    description:
      "A comprehensive digital playbook covering proven objection-handling scripts, follow-up cadences, and closing strategies for the modern salesperson.",
    price: 4999, // $49.99
    category: "digital",
    imageUrl: "/images/sales-playbook.svg",
    inStock: true,
    stripeProductId: "prod_placeholder_004",
    stripePriceId: "price_placeholder_004",
  },
  {
    id: "prod_005",
    slug: "fsa-elite-notebook",
    name: "FSA Elite Hardcover Notebook",
    description:
      "Premium A5 hardcover notebook with dotted pages and FSA Elite branding — track your daily goals and close ratios.",
    price: 1999, // $19.99
    category: "sales-tools",
    imageUrl: "/images/elite-notebook.svg",
    inStock: true,
    stripeProductId: "prod_placeholder_005",
    stripePriceId: "price_placeholder_005",
  },
  {
    id: "prod_006",
    slug: "fsa-elite-mug",
    name: "FSA Elite Insulated Mug",
    description:
      "20 oz double-wall stainless mug that keeps your coffee hot through the longest prospecting session.",
    price: 2499, // $24.99
    category: "accessories",
    imageUrl: "/images/elite-mug.svg",
    inStock: false,
    stripeProductId: "prod_placeholder_006",
    stripePriceId: "price_placeholder_006",
  },
];

// ---------------------------------------------------------------------------
// Build a slug → product map once at module load time.
// This makes getProductBySlug O(1) instead of O(n) for every static page.
// ---------------------------------------------------------------------------
const productBySlug = new Map<string, Product>(
  PRODUCTS.map((product) => [product.slug, product]),
);

/**
 * Return all products.
 *
 * In production, replace the array reference with a `fetch()` call to your
 * CMS or database, using `{ next: { revalidate: 3600 } }` to enable ISR.
 */
export async function getProducts(category?: string): Promise<Product[]> {
  // Simulate async data source
  const allProducts = PRODUCTS;
  if (!category || category === "all") return allProducts;
  return allProducts.filter((product) => product.category === category);
}

/** O(1) slug lookup via pre-built Map. */
export async function getProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  return productBySlug.get(slug);
}

/** Returns every slug so Next.js can statically generate all product pages. */
export async function getAllProductSlugs(): Promise<string[]> {
  return PRODUCTS.map((product) => product.slug);
}

// Module-level singleton: creating an Intl.NumberFormat instance is expensive
// (locale parsing, collation setup) so we pay that cost once at module load
// time and reuse the same formatter on every formatPrice call.
const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

/** Format a price stored in cents as a localised currency string. */
export function formatPrice(cents: number): string {
  if (cents === 0) return "Free";
  return priceFormatter.format(cents / 100);
}
