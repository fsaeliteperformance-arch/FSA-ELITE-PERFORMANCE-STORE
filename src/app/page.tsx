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
import { OLIVE_PROFILE, SKILL_TRACKS } from "@/lib/learning";

// Revalidate this page at most once every hour (ISR).
// Set to 0 to opt into dynamic rendering, or `false` to never revalidate.
export const revalidate = 3600;

export default async function HomePage() {
  const products = await getProducts();
  const featuredTracks = SKILL_TRACKS.slice(0, 3);
  const quickLinks = [
    {
      href: "/signup",
      title: "Clean sign up",
      description:
        "Get new reps into the app with a simple, accessible flow that points them to the right next step.",
    },
    {
      href: "/login",
      title: "Clean log in",
      description:
        "Bring returning reps back through a sharp, low-friction login experience that respects their time.",
    },
    {
      href: "/skills",
      title: "Skills & learning",
      description:
        "Move from access straight into coaching that improves discovery, objection handling, and follow-up.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-brand mb-4">
          FSA Elite Performance Store
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Premium gear, clean access flows, and practical coaching for the elite
          salesperson. Build your brand, sharpen your skills, and close more
          deals.
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

      <section aria-labelledby="access-hub-heading" className="mb-16">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-accent">
              Access hub
            </p>
            <h2
              id="access-hub-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-brand"
            >
              Clean sign-up, log-in, and learning paths
            </h2>
          </div>
          <Link
            href="/skills#olive"
            className="inline-flex items-center justify-center rounded-full border border-brand/15 px-5 py-3 text-sm font-semibold text-brand transition-colors hover:border-brand hover:bg-brand/5"
          >
            Meet Olive
          </Link>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {quickLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="text-xl font-bold text-brand">{item.title}</h3>
              <p className="mt-3 text-base leading-7 text-gray-600">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="skills-preview-heading" className="mb-16">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-accent">
          Skills preview
        </p>
        <h2
          id="skills-preview-heading"
          className="mt-2 text-3xl font-bold tracking-tight text-brand"
        >
          Learning that helps right away
        </h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {featuredTracks.map((track) => (
            <article
              key={track.title}
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-bold text-brand">{track.title}</h3>
              <p className="mt-3 text-base leading-7 text-gray-600">
                {track.description}
              </p>
              <p className="mt-4 text-sm leading-6 text-brand">
                <span className="font-semibold">Benefit:</span> {track.benefit}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="olive-preview-heading"
        className="mb-16 rounded-3xl border border-brand/10 bg-brand/5 p-8"
      >
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-accent">
              Olive
            </p>
            <h2
              id="olive-preview-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-brand"
            >
              Olive now operates with a human, high-trust sales voice
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600">
              {OLIVE_PROFILE.summary}
            </p>
          </div>
          <ul className="space-y-3 rounded-3xl bg-white p-6 text-sm leading-6 text-gray-600 shadow-sm">
            {OLIVE_PROFILE.traits.slice(0, 3).map((trait) => (
              <li key={trait} className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 flex-none rounded-full bg-brand-accent" />
                <span>{trait}</span>
              </li>
            ))}
          </ul>
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
