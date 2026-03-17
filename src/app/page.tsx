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
import { TRAINING_APP_URL } from "@/lib/fsa";

const BRAND_INPUT_SECTIONS = [
  {
    title: "Core positioning lines",
    items: [
      "Train under pressure. Sell with control.",
      "Elite sales performance for reps who want more confidence, more skill, and more production.",
      "Gear for closers who treat sales like a profession, not a hobby.",
    ],
  },
  {
    title: "Homepage hero options",
    items: [
      "Built for salespeople who want more.",
      "Wear the standard. Live the standard. Close at a higher level.",
      "FSA Elite Performance gives the sales community a sharper look and a stronger identity.",
    ],
  },
  {
    title: "CTA ideas",
    items: [
      "Shop the gear",
      "Represent the standard",
      "Sharpen your brand",
      "Step into the elite",
    ],
  },
  {
    title: "Fontenot's Sales Association LLC inputs",
    items: [
      "Founder-led by Kaygun Fontenot, Fontenot's Sales Association LLC stands for discipline, presence, and real sales performance.",
      "FSA Elite Performance reflects a community built around personal brand, daily standards, and consistent production.",
      "From the showroom floor to the next big opportunity, this brand is made for serious sales professionals.",
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
          FSA Elite Performance
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Built for salespeople who want more confidence, more skill, more
          production, and a personal brand that looks as sharp as they sell.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/products"
            className="inline-block rounded-full bg-brand px-8 py-3 font-semibold text-white transition-opacity hover:opacity-90"
          >
            Shop the Gear
          </Link>
          <a
            href={TRAINING_APP_URL}
            className="inline-block rounded-full border border-brand px-8 py-3 font-semibold text-brand transition-colors hover:bg-brand/5"
          >
            Start FSA Elite Sales Training
          </a>
        </div>
        <div className="mt-6 mx-auto max-w-2xl rounded-lg border border-brand/15 bg-brand/5 px-4 py-3 text-left text-sm text-gray-700">
          <p className="font-semibold text-brand">Need access through Ionis?</p>
          <p className="mt-1">
            Paste{" "}
            <span className="font-mono text-xs sm:text-sm">
              https://fsaeliteperformance.store
            </span>{" "}
            into Ionis when requesting access to the FSA Elite Performance
            Store.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="brand-inputs-heading"
        className="mb-16 rounded-3xl border border-brand/10 bg-slate-50 p-6 sm:p-8"
      >
        <div className="max-w-3xl">
          <h2
            id="brand-inputs-heading"
            className="text-2xl font-bold text-brand sm:text-3xl"
          >
            Brand inputs built from the store&apos;s current direction
          </h2>
          <p className="mt-3 text-gray-600">
            After reviewing the copy, catalogue, and positioning already in
            this repository, these inputs fit FSA Elite Performance, Kaygun
            Fontenot, and Fontenot&apos;s Sales Association LLC. Use them across
            the store, decks, emails, and social channels.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {BRAND_INPUT_SECTIONS.map((section, sectionIndex) => (
            <article
              key={section.title}
              className="rounded-2xl border border-brand/10 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-brand">{section.title}</h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-700">
                {section.items.map((item, itemIndex) => (
                  <li key={`${sectionIndex}-${itemIndex}`} className="flex gap-3">
                    <span className="mt-1 text-brand-accent">•</span>
                    <span>{item}</span>
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
