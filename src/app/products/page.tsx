/**
 * /products — React Server Component
 *
 * Fetches and renders the full catalogue server-side.  Category filtering is
 * handled via a searchParam so the URL is bookmarkable / shareable.
 */

import { Suspense } from "react";
import { getProducts } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";
import ProductGridSkeleton from "@/components/ProductGridSkeleton";
import CategoryFilter from "@/components/CategoryFilter";
import type { Metadata } from "next";
import { isCategory, type Category } from "@/types";

export const metadata: Metadata = {
  title: "All Products",
  description: "Browse all FSA Elite Performance merchandise.",
};

// ISR: revalidate every hour
export const revalidate = 3600;

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category: rawCategoryParam } = await searchParams;
  const category =
    rawCategoryParam && isCategory(rawCategoryParam)
      ? rawCategoryParam
      : undefined;

  const products = await getProducts(category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-brand mb-8">All Products</h1>

      <CategoryFilter activeCategory={category} />

      <Suspense fallback={<ProductGridSkeleton count={6} />}>
        <ProductGrid products={products} />
      </Suspense>
    </div>
  );
}
