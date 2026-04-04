/**
 * SearchBar — Client Component
 *
 * Controlled text input that navigates to /products?query=… on submit so the
 * server can render a filtered product grid.  The active query is reflected
 * back into the input so the field stays filled on page load.
 */
"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

interface Props {
  /** The current query string (from searchParams), used to pre-fill the input. */
  defaultValue?: string;
  /** The active category param to preserve when searching. */
  activeCategory?: string;
}

export default function SearchBar({ defaultValue = "", activeCategory }: Props) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);

  function navigate(query: string) {
    const params = new URLSearchParams();
    if (activeCategory) params.set("category", activeCategory);
    if (query) params.set("query", query);
    const qs = params.toString();
    router.push(`/products${qs ? `?${qs}` : ""}`);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate(value.trim());
  }

  function handleClear() {
    setValue("");
    navigate("");
  }

  return (
    <form
      role="search"
      aria-label="Search products"
      onSubmit={handleSubmit}
      className="flex items-center gap-2 mb-6"
    >
      <div className="relative flex-1 max-w-md">
        <input
          type="search"
          name="query"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search products…"
          aria-label="Product search"
          className="w-full rounded-full border border-gray-300 bg-white px-4 py-2 pr-10 text-sm text-gray-900 placeholder-gray-400 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>
      <button
        type="submit"
        className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand/90 transition-colors"
      >
        Search
      </button>
    </form>
  );
}
