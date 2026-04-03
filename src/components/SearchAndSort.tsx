/**
 * SearchAndSort — Client Component
 *
 * Provides a search text box and a sort-order dropdown.  Both controls update
 * the URL search-params so the server re-renders the filtered/sorted product
 * grid without a full page reload and keeps the URL bookmarkable.
 */
"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition, useCallback, useRef } from "react";
import type { SortOrder } from "@/lib/products";

const SORT_OPTIONS: { label: string; value: SortOrder | "" }[] = [
  { label: "Default", value: "" },
  { label: "Name: A → Z", value: "name-asc" },
  { label: "Name: Z → A", value: "name-desc" },
  { label: "Price: Low → High", value: "price-asc" },
  { label: "Price: High → Low", value: "price-desc" },
];

interface Props {
  initialQuery?: string;
  initialSort?: SortOrder | "";
}

export default function SearchAndSort({ initialQuery = "", initialSort = "" }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** Merge updated params with whatever else is in the URL (e.g. category). */
  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    },
    [router, pathname, searchParams],
  );

  /** Debounced wrapper used for the search text box. */
  const updateSearchDebounced = useCallback(
    (value: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => updateParam("q", value), 300);
    },
    [updateParam],
  );

  return (
    <div
      className="flex flex-col sm:flex-row gap-3 mb-6"
      aria-label="Search and sort products"
    >
      {/* Search box */}
      <div className="relative flex-1">
        <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
          🔍
        </span>
        <input
          type="search"
          placeholder="Search products…"
          defaultValue={initialQuery}
          aria-label="Search products"
          className="w-full pl-9 pr-4 py-2 rounded-full border border-gray-200 bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition"
          onChange={(e) => updateSearchDebounced(e.target.value)}
        />
      </div>

      {/* Sort dropdown */}
      <div className="relative">
        <select
          defaultValue={initialSort}
          aria-label="Sort products"
          className="appearance-none pl-4 pr-8 py-2 rounded-full border border-gray-200 bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition cursor-pointer"
          onChange={(e) => updateParam("sort", e.target.value)}
        >
          {SORT_OPTIONS.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {/* Custom caret */}
        <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400 text-xs">
          ▾
        </span>
      </div>

      {/* Navigation-pending indicator */}
      {isPending && (
        <span className="sr-only" aria-live="polite">
          Updating products…
        </span>
      )}
    </div>
  );
}
