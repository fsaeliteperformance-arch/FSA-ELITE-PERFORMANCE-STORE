/**
 * Header — Client Component
 *
 * Uses useCartState to read the live item count from CartStateContext.
 * The component subscribes only to the reactive state slice so it never
 * re-renders due to action-only changes (dispatch, addItem, etc.).
 * The count badge only re-renders when the count value itself changes.
 */
"use client";

import Link from "next/link";
import { useCartState } from "@/context/CartContext";

export default function Header() {
  const { count } = useCartState();

  return (
    <header className="bg-brand text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="font-extrabold text-xl tracking-tight">
          FSA Elite
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/products" className="hover:text-brand-accent transition-colors">
            Shop
          </Link>
          <Link
            href="/cart"
            className="relative hover:text-brand-accent transition-colors"
            aria-label={`Cart (${count} items)`}
          >
            🛒
            {count > 0 && (
              <span className="absolute -top-2 -right-3 bg-brand-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {count > 99 ? "99+" : count}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
