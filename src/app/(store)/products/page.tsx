/**
 * /products — React Server Component
 *
 * Fetches and renders the full catalogue server-side.  Category filtering,
 * full-text search, and sort order are all handled via searchParams so every
 * combination is bookmarkable / shareable.
 */

import { Suspense } from "react";
import { getProducts } from "@/lib/products";
import type { SortOrder } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";
import ProductGridSkeleton from "@/components/ProductGridSkeleton";
import CategoryFilter from "@/components/CategoryFilter";
import SearchBar from "@/components/SearchBar";
import SearchAndSort from "@/components/SearchAndSort";
import type { Metadata } from "next";
import { isCategory, type Category } from "@/types";

export const metadata: Metadata = {
  title: "All Products",
  description: "Browse all FSA Elite Performance merchandise.",
};

// ISR: revalidate every hour
export const revalidate = 3600;

const VALID_SORTS = new Set<SortOrder>([
  "name-asc",
  "name-desc",
  "price-asc",
  "price-desc",
]);

interface ProductsPageProps {
  searchParams: Promise<{ category?: string; query?: string; sort?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category: rawCategoryParam, query: rawQuery, sort: rawSort } = await searchParams;
  const category =
    rawCategoryParam && isCategory(rawCategoryParam)
      ? rawCategoryParam
      : undefined;

  // Sanitize the query: trim whitespace, limit length to prevent abuse.
  const query =
    typeof rawQuery === "string" ? rawQuery.trim().slice(0, 200) : undefined;

  const sort =
    rawSort && VALID_SORTS.has(rawSort as SortOrder)
      ? (rawSort as SortOrder)
      : undefined;

  const products = await getProducts({ category, query, sort });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-brand mb-8">All Products</h1>

      <SearchBar defaultValue={query} activeCategory={category} />
      <SearchAndSort initialQuery={query ?? ""} initialSort={sort ?? ""} />

      <CategoryFilter activeCategory={category} />

      {query && (
        <p className="mb-4 text-sm text-gray-500">
          {products.length === 0
            ? `No products found for "${query}".`
            : `Showing ${products.length} result${products.length === 1 ? "" : "s"} for "${query}".`}
        </p>
      )}

      <Suspense fallback={<ProductGridSkeleton count={6} />}>
        <ProductGrid products={products} />
      </Suspense>
    </div>
  );
}
