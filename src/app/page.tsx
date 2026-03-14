/**
 * Home page — React Server Component
 *
 * Fetching products here (on the server) means the data round-trip happens
 * before any HTML is sent to the browser.  The client receives fully-rendered
 * product cards without any loading spinners or client-side fetch waterfalls.
 */

import { Suspense } from "react";
import { getProducts } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";
import ProductGridSkeleton from "@/components/ProductGridSkeleton";

// Revalidate this page at most once every hour (ISR).
// Set to 0 to opt into dynamic rendering, or `false` to never revalidate.
export const revalidate = 3600;

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-brand mb-4">
          FSA Elite Performance Store
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Premium branded gear for the elite salesperson. Build your personal
          brand and close more deals.
        </p>
        <div className="mt-6 mx-auto max-w-2xl rounded-lg border border-brand/15 bg-brand/5 px-4 py-4 text-left text-sm text-gray-700">
          <p className="font-semibold text-brand">Need access through Ionis?</p>
          <p className="mt-1">
            When requesting access to the FSA Elite Performance Store in your
            Ionis account, enter the following details:
          </p>
          <ol className="mt-3 list-decimal list-inside space-y-2">
            <li>
              <span className="font-medium">Store URL</span> — paste this into
              the <em>Website / URL</em> field:{" "}
              <span className="font-mono text-xs sm:text-sm break-all">
                https://store.fsaeliteperformance.com
              </span>
            </li>
            <li>
              <span className="font-medium">Store name</span> — enter{" "}
              <span className="font-mono text-xs sm:text-sm">
                FSA Elite Performance Store
              </span>
            </li>
          </ol>
          <p className="mt-3 text-gray-500 text-xs">
            Once submitted, your Ionis administrator will approve your request
            and you will gain access to place orders.
          </p>
        </div>
      </section>

      {/* Product catalogue */}
      <section aria-label="Products">
        <h2 className="text-2xl font-bold text-brand mb-8">Shop All</h2>
        {/*
         * Suspense boundary: React streams the shell immediately and fills in
         * the product grid once the async data is ready.  Falls back to a
         * skeleton so users see content straight away instead of a blank page.
         */}
        <Suspense fallback={<ProductGridSkeleton count={6} />}>
          <ProductGrid products={products} />
        </Suspense>
      </section>
    </div>
  );
}
