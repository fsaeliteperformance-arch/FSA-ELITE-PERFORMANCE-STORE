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

const HASH_TABLE_SECTIONS = [
  {
    title: "Hash Function",
    items: [
      "Converts keys such as strings or numbers into indices.",
      "A good hash function spreads keys evenly across the table.",
      "Better distribution helps minimize collisions.",
    ],
  },
  {
    title: "Collisions",
    items: [
      "Collisions happen when different keys map to the same index.",
      "Chaining stores multiple entries in the same bucket, often with a linked list.",
      "Open addressing resolves collisions by probing for another empty slot.",
    ],
  },
  {
    title: "Pros",
    items: [
      "Fast average-case lookups, inserts, and deletes.",
      "Flexible support for many key types.",
      "Widely used in application code, configuration management, and data processing.",
    ],
  },
  {
    title: "Cons",
    items: [
      "Worst-case performance can degrade to O(n) when many collisions occur.",
      "Hash tables do not maintain a natural ordering of entries.",
      "Performance depends heavily on the quality of the hash function and table sizing.",
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
        <section
          aria-labelledby="hash-table-overview-heading"
          className="mt-6 mx-auto max-w-3xl rounded-2xl border border-brand/15 bg-brand/5 p-5 text-left text-sm text-gray-700"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
            Data structure overview
          </p>
          <h2
            id="hash-table-overview-heading"
            className="mt-2 text-xl font-bold text-brand"
          >
            Hash Tables — Core Concepts
          </h2>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="font-semibold text-brand">What a hash table does</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <span className="font-medium text-gray-900">
                    Key idea:
                  </span>{" "}
                  A hash table stores key-value pairs by converting each key
                  into an index.
                </li>
                <li>
                  <span className="font-medium text-gray-900">
                    Why the hash function matters:
                  </span>{" "}
                  A good hash function helps distribute entries evenly so
                  operations stay fast.
                </li>
                <li className="rounded-xl bg-white/80 px-3 py-2 ring-1 ring-brand/10">
                  <span className="font-medium text-gray-900">
                    Background note:
                  </span>{" "}
                  When multiple keys land on the same index, the table must use
                  a collision-resolution strategy to keep storing and finding
                  values correctly.
                </li>
                <li>
                  <span className="font-medium text-gray-900">
                    Common use:
                  </span>{" "}
                  Hash tables are a go-to choice when fast average-case lookups
                  are more important than keeping items ordered.
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-brand">Collision handling</h3>
              <ol className="mt-2 list-inside list-decimal space-y-2">
                <li>Chaining keeps multiple entries in the same bucket.</li>
                <li>
                  Open addressing probes for another available slot in the
                  table.
                </li>
                <li>
                  Heavy collision rates can push performance toward O(n) in the
                  worst case.
                </li>
              </ol>
            </div>
            <div>
              <h3 className="font-semibold text-brand">Why developers use them</h3>
              <ol className="mt-2 list-inside list-decimal space-y-2">
                <li>
                  Hash tables offer fast average-case operations for insert,
                  lookup, and delete workloads.
                </li>
                <li>
                  They support flexible key types, but they do not preserve a
                  natural order.
                </li>
              </ol>
            </div>
          </div>
        </section>
      </section>

      <section
        aria-labelledby="hash-table-details-heading"
        className="mb-16 rounded-3xl border border-brand/10 bg-brand/5 p-6 sm:p-8"
      >
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">
            Quick reference
          </p>
          <h2
            id="hash-table-details-heading"
            className="mt-3 text-3xl font-extrabold tracking-tight text-brand"
          >
            Hash table fundamentals at a glance
          </h2>
          <p className="mt-4 text-base text-gray-700">
            These core ideas explain how hash tables manage speed, collisions,
            and trade-offs in day-to-day programming.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {HASH_TABLE_SECTIONS.map((section) => (
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

      <section
        aria-label="Programming examples"
        className="mb-16 rounded-xl border border-gray-200 bg-gray-50 p-6"
      >
        <h2 className="text-2xl font-bold text-brand">
          Hash tables in programming languages
        </h2>
        <p className="mt-3 text-gray-700">
          In practice, hash tables power built-in collections such as Python
          <span className="font-semibold"> dict</span>, Java
          <span className="font-semibold"> HashMap</span>, and C++
          <span className="font-semibold"> unordered_map</span>.
        </p>
        <p className="mt-3 text-gray-700">
          <span className="font-semibold">
            Where might you encounter them in a GitHub repository?
          </span>{" "}
          They often appear in code that manages configuration, caches data, or
          processes records efficiently by key.
        </p>
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
