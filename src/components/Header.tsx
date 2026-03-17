/**
 * Header — Client Component
 *
 * Uses useCart to read the live item count from the CartContext.
 * The count badge only re-renders when the count value changes because
 * CartContext memoises it with useMemo.
 */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { TRAINING_APP_URL } from "@/lib/fsa";

export default function Header() {
  const { count } = useCart();

  return (
    <header className="bg-gray-200 text-brand sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" aria-label="FSA Elite Performance Home">
          <Image
            src="/fsa-elite-performance-logo.svg"
            alt="FSA Elite Performance"
            width={139}
            height={60}
            className="h-10 w-auto"
            priority
          />
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium">
          <a
            href={TRAINING_APP_URL}
            className="hidden rounded-full border border-brand px-4 py-2 text-brand transition-colors hover:bg-brand hover:text-white sm:inline-block"
          >
            Start Training
          </a>
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
