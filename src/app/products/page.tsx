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
import type { Category } from "@/types";

export const metadata: Metadata = {
  title: "All Products",
  description:
    "Preview the upcoming FSA Elite Performance store. The digital sales playbook is available now while merch remains in coming-soon mode.",
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
  searchParams: Promise<{ category?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category: rawCategoryParam } = await searchParams;
  const category =
    rawCategoryParam && VALID_CATEGORIES.has(rawCategoryParam as Category)
      ? (rawCategoryParam as Category)
      : undefined;

  const products = await getProducts(category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 rounded-2xl border border-brand/15 bg-brand/5 p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">
          Store preview
        </p>
        <h1 className="mt-2 text-3xl font-bold text-brand">All Products</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-700">
          The full store is still coming soon while supplier relationships are
          finalized. You can purchase the digital FSA Elite Sales Playbook now,
          and preview the rest of the collection ahead of launch.
        </p>
      </div>

      <CategoryFilter activeCategory={category} />

      <Suspense fallback={<ProductGridSkeleton count={6} />}>
        <ProductGrid products={products} />
      </Suspense>
    </div>
  );
}
