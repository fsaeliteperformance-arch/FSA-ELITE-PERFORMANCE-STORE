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
        <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
          <a
            href="https://fsaeliteperformance.com"
            className="rounded-md bg-brand px-4 py-2 font-semibold text-white transition hover:bg-brand/90"
            rel="noopener noreferrer"
            target="_blank"
          >
            Open Production Site
          </a>
          <a
            href="https://store.fsaeliteperformance.com"
            className="rounded-md border border-brand px-4 py-2 font-semibold text-brand transition hover:bg-brand/5"
            rel="noopener noreferrer"
            target="_blank"
          >
            Open Store
          </a>
          <a
            href="https://store.fsaeliteperformance.com/checkout"
            className="rounded-md border border-brand/40 px-4 py-2 font-semibold text-brand/70 transition hover:bg-brand/5"
            rel="noopener noreferrer"
            target="_blank"
          >
            Open Checkout Preview
          </a>
        </div>
      </section>

      {/* Domain Routing Reference */}
      <section
        aria-labelledby="domain-routing-heading"
        className="mb-16 rounded-3xl border border-brand/10 bg-brand/5 p-6 sm:p-8"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">
          Domain routing
        </p>
        <h2
          id="domain-routing-heading"
          className="mt-3 text-3xl font-extrabold tracking-tight text-brand"
        >
          Domain forwarding vs DNS setup: use the right one for the job
        </h2>
        <p className="mt-4 text-base leading-7 text-gray-700">
          Forwarding is a redirect shortcut. DNS setup is authoritative routing.
          If you need a fast redirect from one domain to another, use forwarding.
          If you want full control, SSL, and app-level records, use DNS.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {/* Option A */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand/10">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-accent">
              Option A · Domain Forwarding
            </p>
            <p className="mt-1 text-[0.65rem] font-bold uppercase tracking-widest text-gray-400">
              Best for simple redirects
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-gray-700">
              <li>Quickest setup when one domain should always send visitors to another.</li>
              <li>Minimal DNS knowledge required.</li>
              <li>Common use: send www to apex or old domain to new domain.</li>
            </ul>
          </div>
          {/* Option B */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand/10">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-accent">
              Option B · DNS Records
            </p>
            <p className="mt-1 text-[0.65rem] font-bold uppercase tracking-widest text-gray-400">
              Best for production control
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-gray-700">
              <li>Use A, AAAA, CNAME, TXT records for app hosting and verification.</li>
              <li>Required when configuring custom hostnames with providers like Vercel.</li>
              <li>Gives precise control over subdomains and email records.</li>
            </ul>
          </div>
        </div>

        {/* Decision table */}
        <div className="mt-8 overflow-x-auto rounded-2xl ring-1 ring-brand/10">
          <table className="w-full text-sm">
            <thead className="bg-brand text-white">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Decision area</th>
                <th className="px-4 py-3 text-left font-semibold">Forwarding</th>
                <th className="px-4 py-3 text-left font-semibold">DNS setup</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand/10 bg-white">
              <tr>
                <td className="px-4 py-3 font-medium text-gray-900">Primary outcome</td>
                <td className="px-4 py-3 text-gray-700">Redirect traffic to another URL</td>
                <td className="px-4 py-3 text-gray-700">Serve your app directly from a host</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-gray-900">Control level</td>
                <td className="px-4 py-3 text-gray-700">Low</td>
                <td className="px-4 py-3 text-gray-700">High</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-gray-900">Best use case</td>
                <td className="px-4 py-3 text-gray-700">Temporary migration or canonical redirect</td>
                <td className="px-4 py-3 text-gray-700">Long-term production architecture</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-gray-900">Typical records</td>
                <td className="px-4 py-3 text-gray-700">Registrar forwarding settings</td>
                <td className="px-4 py-3 font-mono text-gray-700">A, AAAA, CNAME, TXT</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Fast execution checklist */}
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand/10">
          <h3 className="font-bold text-brand">Fast execution checklist</h3>
          <ol className="mt-4 space-y-2 text-sm leading-6 text-gray-700 list-decimal list-outside pl-5">
            <li>Choose one canonical domain for production traffic.</li>
            <li>Forward every alternate domain to the canonical host.</li>
            <li>Configure DNS records at the canonical host only.</li>
            <li>Verify SSL and redirect behavior for apex and www variants.</li>
            <li>Document final values so future changes are safe and repeatable.</li>
          </ol>
        </div>

        {/* IONOS DNS records */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand/10">
            <h3 className="font-bold text-brand">
              <span className="font-mono text-sm">fsaeliteperformance.com</span> → Vercel
            </h3>
            <table className="mt-4 w-full text-xs">
              <thead className="text-left text-gray-500">
                <tr>
                  <th className="pb-2 pr-2 font-semibold">Type</th>
                  <th className="pb-2 pr-2 font-semibold">Host</th>
                  <th className="pb-2 pr-2 font-semibold">Value</th>
                  <th className="pb-2 font-semibold">TTL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-mono text-gray-700">
                <tr>
                  <td className="py-1.5 pr-2">A</td>
                  <td className="py-1.5 pr-2">@</td>
                  <td className="py-1.5 pr-2">76.76.21.21</td>
                  <td className="py-1.5">3600</td>
                </tr>
                <tr>
                  <td className="py-1.5 pr-2">CNAME</td>
                  <td className="py-1.5 pr-2">www</td>
                  <td className="py-1.5 pr-2">cname.vercel-dns.com</td>
                  <td className="py-1.5">3600</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-3 text-xs text-gray-500">
              Add any TXT verification record shown in Vercel Project Settings → Domains when attaching the domain.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand/10">
            <h3 className="font-bold text-brand">
              <span className="font-mono text-sm">fsaelite.org</span> → GitHub Pages
            </h3>
            <table className="mt-4 w-full text-xs">
              <thead className="text-left text-gray-500">
                <tr>
                  <th className="pb-2 pr-2 font-semibold">Type</th>
                  <th className="pb-2 pr-2 font-semibold">Host</th>
                  <th className="pb-2 pr-2 font-semibold">Value</th>
                  <th className="pb-2 font-semibold">TTL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-mono text-gray-700">
                <tr>
                  <td className="py-1.5 pr-2">A</td>
                  <td className="py-1.5 pr-2">@</td>
                  <td className="py-1.5 pr-2">185.199.108.153</td>
                  <td className="py-1.5">3600</td>
                </tr>
                <tr>
                  <td className="py-1.5 pr-2">A</td>
                  <td className="py-1.5 pr-2">@</td>
                  <td className="py-1.5 pr-2">185.199.109.153</td>
                  <td className="py-1.5">3600</td>
                </tr>
                <tr>
                  <td className="py-1.5 pr-2">A</td>
                  <td className="py-1.5 pr-2">@</td>
                  <td className="py-1.5 pr-2">185.199.110.153</td>
                  <td className="py-1.5">3600</td>
                </tr>
                <tr>
                  <td className="py-1.5 pr-2">A</td>
                  <td className="py-1.5 pr-2">@</td>
                  <td className="py-1.5 pr-2">185.199.111.153</td>
                  <td className="py-1.5">3600</td>
                </tr>
                <tr>
                  <td className="py-1.5 pr-2">AAAA</td>
                  <td className="py-1.5 pr-2">@</td>
                  <td className="py-1.5 pr-2">2606:50c0:8000::153</td>
                  <td className="py-1.5">3600</td>
                </tr>
                <tr>
                  <td className="py-1.5 pr-2">AAAA</td>
                  <td className="py-1.5 pr-2">@</td>
                  <td className="py-1.5 pr-2">2606:50c0:8001::153</td>
                  <td className="py-1.5">3600</td>
                </tr>
                <tr>
                  <td className="py-1.5 pr-2">AAAA</td>
                  <td className="py-1.5 pr-2">@</td>
                  <td className="py-1.5 pr-2">2606:50c0:8002::153</td>
                  <td className="py-1.5">3600</td>
                </tr>
                <tr>
                  <td className="py-1.5 pr-2">AAAA</td>
                  <td className="py-1.5 pr-2">@</td>
                  <td className="py-1.5 pr-2">2606:50c0:8003::153</td>
                  <td className="py-1.5">3600</td>
                </tr>
                <tr>
                  <td className="py-1.5 pr-2">CNAME</td>
                  <td className="py-1.5 pr-2">www</td>
                  <td className="py-1.5 pr-2">fsaeliteperformance-arch.github.io</td>
                  <td className="py-1.5">3600</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-3 text-xs text-gray-500">
              After DNS propagates, set the custom domain in GitHub repository → Settings → Pages and enable Enforce HTTPS.
            </p>
          </div>
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
