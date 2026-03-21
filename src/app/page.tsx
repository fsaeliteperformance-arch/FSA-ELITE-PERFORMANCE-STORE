/**
 * Home page — React Server Component
 *
 * Fetching products here (on the server) means the data round-trip happens
 * before any HTML is sent to the browser.  The client receives fully-rendered
 * product cards without any loading spinners or client-side fetch waterfalls.
 */

import { Suspense } from "react";
import Link from "next/link";
import { getProducts } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";
import ProductGridSkeleton from "@/components/ProductGridSkeleton";

const BRAND_INPUT_SECTIONS = [
  {
    title: "Positioning Lines",
    items: [
      "Train under pressure. Sell with control.",
      "Elite sales performance, built not bought.",
      "Simulated pressure. Measured growth. Real deals.",
    ],
  },
  {
    title: "Hero Copy",
    items: [
      "Built for salespeople who want more confidence, more skill, and more production.",
      "Pressure-tested gear and messaging for serious closers in the FSA Elite community.",
      "Wear the standard. Represent the work. Stay sharp before the first conversation starts.",
    ],
  },
  {
    title: "CTA Language",
    items: [
      "Shop the gear",
      "Train the brand",
      "Step into the next rep with control",
    ],
  },
  {
    title: "Store Messaging",
    items: [
      "Gear for salespeople who treat performance like a profession.",
      "Branded apparel, sales tools, and daily-carry essentials for the FSA Elite standard.",
      "Built for the community behind Fontenot's Sales Association LLC.",
    ],
  },
] as const;

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
          Train under pressure. Sell with control. Premium gear, sales tools,
          and brand messaging for closers building the FSA Elite standard.
        </p>
        <p className="mt-4 inline-flex items-center rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white">
          Now Live on FSAElitePerformance.com: Your elite sales app storefront
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/products"
            className="rounded-md bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand/90"
          >
            Shop Top Sellers
          </Link>
          <Link
            href="/cart"
            className="rounded-md border border-brand px-5 py-3 text-sm font-semibold text-brand transition hover:bg-brand/5"
          >
            Open Cart
          </Link>
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

      <section
        aria-labelledby="brand-inputs-heading"
        className="mb-16 rounded-3xl border border-brand/10 bg-brand/5 p-6 sm:p-8"
      >
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">
            Brand inputs
          </p>
          <h2
            id="brand-inputs-heading"
            className="mt-3 text-3xl font-extrabold tracking-tight text-brand"
          >
            Messaging built for FSA Elite sales performance
          </h2>
          <p className="mt-4 text-base text-gray-700">
            A focused set of positioning lines, hero copy, and CTA options for
            the FSA Elite brand and the community behind Fontenot&apos;s Sales
            Association LLC.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {BRAND_INPUT_SECTIONS.map((section) => (
            <article
              key={section.title}
              className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-brand/10"
            >
              <h3 className="text-lg font-bold text-brand">{section.title}</h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-700">
                {section.items.map((item) => (
                  <li
                    key={`${section.title}-${item}`}
                    className="rounded-xl bg-brand/5 px-3 py-2"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
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
