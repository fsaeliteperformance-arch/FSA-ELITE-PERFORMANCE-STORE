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
        {/* Brand logo: icon + divider + two-line wordmark */}
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="FSA Elite Performance Store home"
        >
          {/* Businessperson with dollar sign — inherits white fill via currentColor */}
          <svg
            width="34"
            height="46"
            viewBox="0 0 34 46"
            fill="currentColor"
            aria-hidden="true"
            className="flex-shrink-0"
          >
            {/* Head */}
            <circle cx="17" cy="8" r="7" />
            {/* Dollar sign — upper-right of head */}
            <text
              x="21"
              y="5"
              fontSize="9"
              fontWeight="bold"
              fontFamily="Arial, sans-serif"
            >
              $
            </text>
            {/* Suit-jacket body */}
            <path d="M5,18 L1,44 L33,44 L29,18 C24,15 21,14 17,14 C13,14 10,15 5,18Z" />
          </svg>

          {/* Vertical divider */}
          <div className="w-px h-10 bg-white/40 flex-shrink-0" />

          {/* Two-line wordmark */}
          <div className="flex flex-col leading-none gap-0.5">
            <span className="font-black text-sm tracking-[0.14em]">
              FSA ELITE
            </span>
            <span className="text-xs font-light tracking-wider opacity-90">
              Performance
            </span>
          </div>
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
