/**
 * AddToCartButton — Client Component
 *
 * This is intentionally a thin wrapper around useCart so that the heavier
 * CartContext logic doesn't inflate every product card's bundle.
 *
 * The `compact` prop renders a small icon button suitable for use inside a
 * ProductCard; the full variant is used on the product detail page.
 */
"use client";

import { useCallback, useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types";

interface Props {
  product: Product;
  compact?: boolean;
}

export default function AddToCartButton({ product, compact = false }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = useCallback(() => {
    addItem(product);
    setAdded(true);
    // Reset the visual feedback after 1.5 s
    setTimeout(() => setAdded(false), 1500);
  }, [addItem, product]);

  if (compact) {
    return (
      <button
        onClick={handleAdd}
        aria-label={`Add ${product.name} to cart`}
        className="p-2 rounded-full bg-brand text-white hover:bg-brand-accent transition-colors"
      >
        {added ? "✓" : "+"}
      </button>
    );
  }

  return (
    <button
      onClick={handleAdd}
      className="w-full bg-brand text-white font-bold py-3 px-6 rounded-full hover:bg-brand-accent transition-colors disabled:opacity-50"
    >
      {added ? "Added to Cart ✓" : "Add to Cart"}
    </button>
  );
}
