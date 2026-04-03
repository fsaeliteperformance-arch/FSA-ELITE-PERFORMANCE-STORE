/**
 * /products — React Server Component
 *
 * Fetches and renders the full catalogue server-side.  Category filtering and
 * text search are handled via searchParams so URLs are bookmarkable/shareable.
 *
 * SearchInput is a Client Component wrapped in Suspense because it calls
 * `useSearchParams()`, which requires a Suspense boundary when used in a
 * Server Component page.
 */

import { Suspense } from "react";
import Link from "next/link";
import { getProducts } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";
import ProductGridSkeleton from "@/components/ProductGridSkeleton";
import CategoryFilter from "@/components/CategoryFilter";
import SearchInput from "@/components/SearchInput";
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
  searchParams: Promise<{ category?: string; search?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category: rawCategoryParam, search: rawSearchParam } =
    await searchParams;

  const category =
    rawCategoryParam && VALID_CATEGORIES.has(rawCategoryParam as Category)
      ? (rawCategoryParam as Category)
      : undefined;

  // Sanitise the search query: trim whitespace and cap at 200 chars.
  const searchQuery = rawSearchParam?.trim().slice(0, 200) || undefined;

  const products = await getProducts(category, searchQuery);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-brand mb-8">All Products</h1>

      {/* SearchInput uses useSearchParams so it needs a Suspense boundary */}
      <Suspense fallback={null}>
        <SearchInput />
      </Suspense>

      <CategoryFilter activeCategory={category} />

      {products.length === 0 ? (
        <p className="mt-8 text-center text-gray-500">
          No products match your search. Try a different term or{" "}
          <Link href="/products" className="text-brand underline">
            clear all filters
          </Link>
          .
        </p>
      ) : (
        <Suspense fallback={<ProductGridSkeleton count={6} />}>
          <ProductGrid products={products} />
        </Suspense>
      )}
    </div>
  );
}
