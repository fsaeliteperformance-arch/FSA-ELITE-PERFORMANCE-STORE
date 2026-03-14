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

const GROWTH_LOOP_STEPS = [
  {
    title: "Content",
    description: "Publish daily sales insight that pulls ambitious closers into the FSA ecosystem.",
  },
  {
    title: "Training App",
    description: "Deliver guided coaching, drills, and AI-backed practice for salespeople across industries.",
  },
  {
    title: "Store",
    description: "Reinforce the brand with gear, tools, and digital resources that support execution.",
  },
  {
    title: "Community",
    description: "Create accountability, shared wins, and feedback loops that keep members engaged.",
  },
  {
    title: "Repeat",
    description:
      "Acknowledge the repeat loop by turning momentum into repeat buying, repeat learning, and repeat participation.",
  },
] as const;

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
          Premium branded gear, tools, and momentum for the FSA growth loop:
          content, training, store, community, and repeat.
        </p>
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
        id="ai-sales-training"
        className="mb-16 rounded-3xl border border-brand/10 bg-slate-950 px-6 py-8 text-white shadow-xl sm:px-8"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">
          Current execution focus
        </p>
        <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-start">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Build the best AI sales training system first.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-200 sm:text-lg">
              FSA&apos;s next strategic push is an AI-powered training experience
              designed to help salespeople from every industry sharpen
              objection-handling, follow-up discipline, and closing confidence.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-accent">
              What this unlocks
            </p>
            <ul className="mt-4 space-y-3 text-sm text-slate-200">
              <li>• On-demand coaching that scales beyond 1:1 mentorship</li>
              <li>• A stronger bridge from content into paid training</li>
              <li>• More reasons for members to return to the store and community</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="growth-loop" className="mb-16" aria-labelledby="growth-loop-heading">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">
              Strategic growth loop
            </p>
            <h2 id="growth-loop-heading" className="text-3xl font-bold text-brand">
              Content → Training App → Store → Community → Repeat
            </h2>
          </div>
          <p className="max-w-2xl text-sm text-gray-600">
            Each step should feed the next one so the FSA brand compounds
            attention, trust, revenue, and retention.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {GROWTH_LOOP_STEPS.map((step, index) => (
            <article
              key={step.title}
              className="rounded-2xl border border-brand/10 bg-white p-5 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
                Step {index + 1}
              </p>
              <h3 className="mt-3 text-lg font-bold text-brand">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {step.description}
              </p>
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
