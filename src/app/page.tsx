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
        <div className="mt-6 mx-auto max-w-2xl rounded-lg border border-brand/15 bg-brand/5 px-4 py-3 text-left text-sm text-gray-700">
          <p className="font-semibold text-brand">Need access through Ionos?</p>
          <p className="mt-1">
            Paste{" "}
            <span className="font-mono text-xs sm:text-sm">
              https://store.fsaeliteperformance.com
            </span>{" "}
            into Ionos when requesting access to the FSA Elite Performance
            Store.
          </p>

          {/* DNSSEC DS record — values are read from server-only env vars so
              they are never bundled into the client. DS records are publicly
              visible in the parent DNS zone, so displaying them here is safe.
              Add the values below to your Ionos control panel under:
              Domains & SSL → <domain> → DNS → DNSSEC */}
          {process.env.DNSSEC_KEY_TAG && (
            <div className="mt-3 border-t border-brand/10 pt-3">
              <p className="font-semibold text-brand mb-2">
                DNSSEC DS Record for Ionos
              </p>
              <p className="text-xs text-gray-500 mb-2">
                Enter these values in the Ionos control panel under{" "}
                <span className="font-medium">
                  Domains &amp; SSL → DNS → DNSSEC
                </span>
                .
              </p>
              <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1 text-xs">
                <dt className="text-gray-500">Key Tag</dt>
                <dd className="font-mono">{process.env.DNSSEC_KEY_TAG}</dd>
                <dt className="text-gray-500">Algorithm</dt>
                <dd className="font-mono">{process.env.DNSSEC_ALGORITHM}</dd>
                <dt className="text-gray-500">Digest Type</dt>
                <dd className="font-mono">{process.env.DNSSEC_DIGEST_TYPE}</dd>
                <dt className="text-gray-500 self-start">Digest</dt>
                <dd className="font-mono break-all">
                  {process.env.DNSSEC_DIGEST}
                </dd>
              </dl>
            </div>
          )}
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
