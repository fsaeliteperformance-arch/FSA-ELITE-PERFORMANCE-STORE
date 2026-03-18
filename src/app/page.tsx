/**
 * Home page — React Server Component
 *
 * Fetching products here (on the server) means the data round-trip happens
 * before any HTML is sent to the browser.  The client receives fully-rendered
 * product cards without any loading spinners or client-side fetch waterfalls.
 */

import Link from "next/link";
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
          Storefront Coming Soon
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We&apos;re lining up suppliers for the full FSA Elite Performance
          collection now. Until the merch drop is ready, get a taste of the
          movement with our live digital playbook and a message built around
          stronger communication, community, and confidence in business.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/products/fsa-elite-sales-playbook"
            className="inline-flex items-center justify-center rounded-full bg-brand px-8 py-3 font-semibold text-white transition-opacity hover:opacity-90"
          >
            Get the live digital playbook
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-full border border-brand px-8 py-3 font-semibold text-brand transition-colors hover:bg-brand/5"
          >
            Preview the upcoming collection
          </Link>
        </div>
        <div className="mt-8 grid gap-4 text-left md:grid-cols-3">
          <div className="rounded-2xl border border-brand/10 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">
              Available now
            </p>
            <h2 className="mt-2 text-xl font-bold text-brand">
              Start with the paid playbook
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              The FSA Elite Sales Playbook is the current live checkout offer
              for people who want to sharpen their pitch, follow-up, and closing
              process right away.
            </p>
          </div>
          <div className="rounded-2xl border border-brand/10 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">
              Coming soon
            </p>
            <h2 className="mt-2 text-xl font-bold text-brand">
              Merch unlocks after suppliers are set
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Apparel, accessories, and tools stay in preview mode until the
              supplier lineup is ready for a proper launch.
            </p>
          </div>
          <div className="rounded-2xl border border-brand/10 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">
              Built for people
            </p>
            <h2 className="mt-2 text-xl font-bold text-brand">
              Learn how to talk, connect, and lead
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              FSA Elite Performance is about helping salespeople, businesswomen,
              businessmen, and teams communicate better and build real social
              confidence again.
            </p>
          </div>
        </div>
        <div className="mt-6 mx-auto max-w-2xl rounded-lg border border-brand/15 bg-brand/5 px-4 py-3 text-left text-sm text-gray-700">
          <p className="font-semibold text-brand">Need access through Ionis?</p>
          <p className="mt-1">
            Paste{" "}
            <span className="font-mono text-xs sm:text-sm">
              https://store.fsaeliteperformance.com
            </span>{" "}
            into Ionis when requesting access to the FSA Elite Performance
            Store.
          </p>
        </div>
      </section>

      {/* Product catalogue */}
      <section aria-label="Products">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-brand">Preview the collection</h2>
          <p className="mt-2 max-w-3xl text-sm text-gray-600">
            The digital playbook is available for checkout now. Physical merch
            and supplier-backed products are shown below in preview mode until
            the full store goes live.
          </p>
        </div>
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
