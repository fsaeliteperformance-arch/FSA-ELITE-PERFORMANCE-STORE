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
  const paymentUiOptions = [
    {
      title: "Hosted checkout form",
      subtitle: "Stripe-hosted page",
      description:
        "Customers enter payment details on a Stripe-hosted Checkout page and return to your site after payment completion.",
      details: [
        "UI: Checkout",
        "API: Checkout Sessions",
        "Integration effort: Low code",
        "Hosting: Stripe-hosted page with optional custom domains",
      ],
    },
    {
      title: "Embedded Checkout form",
      subtitle: "Embedded page",
      description:
        "Customers enter payment details in an embedded Checkout form on your site without a redirect.",
      details: [
        "UI: Checkout",
        "API: Checkout Sessions",
        "Integration effort: Low code",
        "Hosting: Embedded directly on your site",
      ],
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
        aria-labelledby="payment-ui-options"
        className="mb-16 rounded-3xl border border-brand/10 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            Payment UIs
          </p>
          <h2
            id="payment-ui-options"
            className="mt-3 text-3xl font-bold tracking-tight text-brand"
          >
            Checkout Sessions supports two low-code payment experiences
          </h2>
          <p className="mt-4 text-base text-gray-600 sm:text-lg">
            Use the same Stripe Checkout Sessions API with either a hosted
            checkout page or an embedded payment form. The current FSA Elite
            Performance Store uses the Stripe-hosted page for a secure redirect
            flow.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {paymentUiOptions.map((option) => (
            <article
              key={option.title}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-6"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-brand">
                {option.subtitle}
              </p>
              <h3 className="mt-2 text-2xl font-bold text-brand">
                {option.title}
              </h3>
              <p className="mt-4 text-gray-600">{option.description}</p>
              <ul className="mt-6 space-y-3 text-sm text-gray-700">
                {option.details.map((detail) => (
                  <li key={detail} className="flex gap-2">
                    <span aria-hidden="true" className="text-brand">
                      ✓
                    </span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl bg-brand/5 px-5 py-4 text-sm text-gray-700">
          <p className="font-semibold text-brand">
            Shared Checkout capabilities
          </p>
          <p className="mt-2">
            Both options support customizing the checkout experience, collecting
            additional customer information and taxes, dynamically updating the
            checkout session, and enabling recurring or future payments through
            Stripe Checkout.
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
