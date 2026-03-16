/**
 * /products — React Server Component
 *
 * Fetches and renders the full catalogue server-side.  Category filtering and
 * text search are handled via searchParams so URLs are bookmarkable/shareable.
 */

import { Suspense } from "react";
import { getProducts } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";
import ProductGridSkeleton from "@/components/ProductGridSkeleton";
import CategoryFilter from "@/components/CategoryFilter";
import SearchBar from "@/components/SearchBar";
import type { Metadata } from "next";
import type { Category } from "@/types";

export const metadata: Metadata = {
  title: "All Products",
  description: "Browse all FSA Elite Performance merchandise.",
};

// ISR: revalidate every hour
export const revalidate = 3600;

const VALID_CATEGORIES = new Set<Category>([
  "apparel",
  "accessories",
  "sales-tools",
  "digital",
]);

interface ProductsPageProps {
  searchParams: Promise<{ category?: string; query?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category: rawCategoryParam, query: rawQuery } = await searchParams;
  const category =
    rawCategoryParam && VALID_CATEGORIES.has(rawCategoryParam as Category)
      ? (rawCategoryParam as Category)
      : undefined;

  // Sanitize the query: trim whitespace, limit length to prevent abuse.
  const query =
    typeof rawQuery === "string" ? rawQuery.trim().slice(0, 200) : undefined;

  const products = await getProducts({ category, query });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-brand mb-8">All Products</h1>

      <SearchBar defaultValue={query} activeCategory={category} />

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
