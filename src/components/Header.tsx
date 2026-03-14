/**
 * Header — Client Component
 *
 * Uses useCart to read the live item count from the CartContext.
 * The count badge only re-renders when the count value changes because
 * CartContext memoises it with useMemo.
 */
"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { count } = useCart();

  return (
    <header className="bg-brand text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="font-extrabold text-xl tracking-tight">
          FSA Elite
        </Link>

        <nav className="flex items-center gap-3 text-xs font-medium sm:gap-6 sm:text-sm">
          <Link
            href="/#content"
            className="hover:text-brand-accent transition-colors"
          >
            Content
          </Link>
          <Link
            href="/#training-app"
            className="hover:text-brand-accent transition-colors"
          >
            Training App
          </Link>
          <Link href="/products" className="hover:text-brand-accent transition-colors">
            Shop
          </Link>
          <Link
            href="/#community"
            className="hover:text-brand-accent transition-colors"
          >
            Community
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
