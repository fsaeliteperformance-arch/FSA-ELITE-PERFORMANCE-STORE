/**
 * ProductGrid — Server Component
 *
 * Renders the list of products in a responsive grid.  The first three cards
 * receive `priority` so their images are preloaded as LCP candidates.
 *
 * Performance note: This is a pure server component — no JS bundle cost.
 */

import type { Product } from "@/types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="text-center text-gray-500 py-24">
        No products found in this category.
      </p>
    );
  }

  return (
    <ul
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      role="list"
    >
      {products.map((product, index) => (
        <li key={product.id}>
          {/* Prioritise first 3 images for LCP (above the fold on most screens) */}
          <ProductCard product={product} priority={index < 3} />
        </li>
      ))}
    </ul>
  );
}
