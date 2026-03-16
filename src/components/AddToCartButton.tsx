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

import { useCallback, useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import {
  compactPrimaryButtonStyles,
  primaryButtonStyles,
} from "@/lib/buttonStyles";
import type { Product } from "@/types";

interface Props {
  product: Product;
  compact?: boolean;
}

export default function AddToCartButton({ product, compact = false }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  // Keep a ref to the pending timer so we can cancel it on unmount and prevent
  // a setState call on an already-unmounted component.
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cancel the pending reset timer when the component unmounts.
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, []);

  const handleAddToCart = useCallback(() => {
    addItem(product);
    setAdded(true);
    // Clear any existing timer before starting a new one so rapid clicks don't
    // stack multiple timeouts.
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setAdded(false);
      timerRef.current = null;
    }, 1500);
  }, [addItem, product]);

  if (compact) {
    return (
      <button
        onClick={handleAddToCart}
        aria-label={`Add ${product.name} to cart`}
        className={compactPrimaryButtonStyles}
      >
        {added ? "✓" : "+"}
      </button>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      className={primaryButtonStyles}
    >
      {added ? "Added to Cart ✓" : "Add to Cart"}
    </button>
  );
}
