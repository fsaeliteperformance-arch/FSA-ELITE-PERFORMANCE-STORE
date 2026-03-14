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

const FLYWHEEL_STEPS = [
  {
    id: "content",
    title: "Content",
    description:
      "Share practical sales insights, playbooks, and brand stories that attract the right people into the FSA Elite ecosystem.",
    href: "#content",
    linkText: "Focus here",
  },
  {
    id: "training-app",
    title: "Training App",
    description:
      "Turn attention into action with structured coaching, accountability, and daily reps that sharpen performance.",
    href: "#training-app",
    linkText: "Focus here",
  },
  {
    id: "store",
    title: "Store",
    description:
      "Equip the community with branded gear, digital tools, and resources that reinforce the elite identity.",
    href: "/products",
    linkText: "Go to store",
  },
  {
    id: "community",
    title: "Community",
    description:
      "Create connection, recognition, and momentum so members keep learning from one another and showing up consistently.",
    href: "#community",
    linkText: "Focus here",
  },
  {
    id: "repeat",
    title: "Repeat",
    description:
      "Every purchase, win, and shared lesson feeds the next round of content, training, and community growth.",
    href: "#repeat",
    linkText: "Focus here",
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
          Premium branded gear for the elite salesperson. Build your personal
          brand and close more deals.
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
        id="flywheel"
        aria-labelledby="flywheel-heading"
        className="mb-16 rounded-3xl border border-brand/10 bg-slate-50 p-8 shadow-sm"
      >
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand/70">
            Growth Flywheel
          </p>
          <h2
            id="flywheel-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-brand"
          >
            Content → Training App → Store → Community → Repeat
          </h2>
          <p className="mt-4 text-base leading-7 text-gray-600">
            FSA Elite grows when each touchpoint reinforces the next. Publish
            value, coach people to perform, equip them with the right gear, and
            let the community carry the momentum back into the next wave.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-5">
          {FLYWHEEL_STEPS.map((step, index) => (
            <article
              key={step.id}
              id={step.id}
              aria-labelledby={`${step.id}-title`}
              className="rounded-2xl border border-brand/10 bg-white p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                  {index + 1}
                </span>
                <span
                  id={`${step.id}-title`}
                  className="text-xs font-semibold uppercase tracking-[0.25em] text-brand/50"
                >
                  {step.title}
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-600">
                {step.description}
              </p>
              <Link
                href={step.href}
                className="mt-5 inline-flex items-center text-sm font-semibold text-brand transition-colors hover:text-brand-accent"
              >
                {step.linkText} →
              </Link>
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
