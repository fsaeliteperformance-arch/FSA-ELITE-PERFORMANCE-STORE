/**
 * CategoryFilter — Client Component
 *
 * Renders category filter links.  Uses Next.js Link with shallow navigation
 * so the product grid re-renders with filtered results without a full page
 * reload.  This is a Client Component only because it needs access to the
 * current URL for the active-state highlight; no heavy JS is shipped.
 */
"use client";

import Link from "next/link";
import type { Category } from "@/types";

const CATEGORIES: { label: string; value: Category | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Core Subscriptions", value: "subscriptions" },
  { label: "Apparel", value: "apparel" },
  { label: "Accessories", value: "accessories" },
  { label: "Sales Tools", value: "sales-tools" },
  { label: "Digital", value: "digital" },
];

interface Props {
  activeCategory?: Category;
}

export default function CategoryFilter({ activeCategory }: Props) {
  const active = activeCategory ?? "all";

  return (
    <nav
      aria-label="Filter by category"
      className="flex flex-wrap gap-2 mb-8"
    >
      {CATEGORIES.map(({ label, value }) => {
        const href =
          value === "all" ? "/products" : `/products?category=${value}`;
        const isActive = value === active;
        return (
          <Link
            key={value}
            href={href}
            className={[
              "px-4 py-2 rounded-full text-sm font-semibold transition-colors",
              isActive
                ? "bg-brand text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200",
            ].join(" ")}
            aria-current={isActive ? "page" : undefined}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
