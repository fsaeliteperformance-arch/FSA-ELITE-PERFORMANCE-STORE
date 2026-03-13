/**
 * AddToCartButton — Client Component
 *
 * This is intentionally a thin wrapper around useCartActions so that the
 * heavier CartContext logic doesn't inflate every product card's bundle.
 *
 * By subscribing only to CartActionsContext (via useCartActions), this
 * component is never re-rendered by cart state changes — it only re-renders
 * when its own local `added` state changes.
 *
 * The `compact` prop renders a small icon button suitable for use inside a
 * ProductCard; the full variant is used on the product detail page.
 */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useCartActions } from "@/context/CartContext";
import type { Product } from "@/types";

interface Props {
  product: Product;
  compact?: boolean;
}

export default function AddToCartButton({ product, compact = false }: Props) {
  const { addItem } = useCartActions();
  const [added, setAdded] = useState(false);

  // Keep a ref to the pending timer so we can cancel it on unmount or on a
  // rapid second click, preventing a state update on an unmounted component.
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, []);

  const handleAdd = useCallback(() => {
    addItem(product);
    setAdded(true);
    // Cancel any in-flight timer before starting a new one.
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    // Reset the visual feedback after 1.5 s
    timerRef.current = setTimeout(() => setAdded(false), 1500);
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
