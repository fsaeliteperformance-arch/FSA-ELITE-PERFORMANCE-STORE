/**
 * Training home page — served at training.fsaeliteperformance.com
 *
 * Middleware rewrites the domain root ("/") to "/training" in this Next.js
 * app, so visitors never see the /training prefix in the URL bar.
 */

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sales Training Programs",
  description:
    "Level up your sales performance with FSA Elite's structured training programs, live coaching, and on-demand resources.",
};

// Revalidate once per hour (ISR) — same cadence as the store pages.
export const revalidate = 3600;

const PROGRAMS = [
  {
    icon: "🎯",
    title: "Prospecting Mastery",
    description:
      "Cold calling, multi-channel outreach, and pipeline generation strategies used by top FSA performers.",
  },
  {
    icon: "💬",
    title: "Discovery & Needs Analysis",
    description:
      "Structured questioning frameworks that uncover real pain points and accelerate deal qualification.",
  },
  {
    icon: "📊",
    title: "Closing Playbooks",
    description:
      "Proven closing techniques, objection handling, and negotiation scripts backed by real deal data.",
  },
  {
    icon: "🏆",
    title: "Elite Performance Coaching",
    description:
      "1-on-1 coaching sessions with FSA's top producers — recorded, reviewed, and actioned.",
  },
  {
    icon: "📈",
    title: "Performance Tracking",
    description:
      "KPI dashboards, activity benchmarks, and leaderboard access to keep you accountable every week.",
  },
  {
    icon: "🛠️",
    title: "Tools & Templates",
    description:
      "Email sequences, call scripts, CRM workflows, and proposal templates ready to deploy today.",
  },
];

export default function TrainingHomePage() {
  const storeUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://store.fsaeliteperformance.com";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <section className="text-center mb-20">
        <span className="inline-block bg-brand-accent/10 text-brand-accent text-sm font-semibold uppercase tracking-widest px-4 py-1 rounded-full mb-4">
          FSA Elite Performance
        </span>
        <h1 className="text-5xl font-extrabold tracking-tight text-brand mb-6">
          Training That Closes Deals
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Structured sales programs, live coaching, and on-demand resources
          built for elite performers who refuse to plateau.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#programs"
            className="inline-block bg-brand text-white font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            Explore Programs
          </a>
          <a
            href={storeUrl}
            className="inline-block bg-white text-brand border-2 border-brand font-semibold px-8 py-3 rounded-full hover:bg-brand/5 transition-colors"
          >
            Visit the Store
          </a>
        </div>
      </section>

      {/* Programs grid */}
      <section id="programs" aria-label="Training programs" className="mb-20">
        <h2 className="text-3xl font-bold text-brand text-center mb-12">
          What You&apos;ll Learn
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROGRAMS.map((program) => (
            <div
              key={program.title}
              className="rounded-2xl border border-gray-100 bg-brand-light p-8 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{program.icon}</div>
              <h3 className="text-lg font-bold text-brand mb-2">
                {program.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {program.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Cross-promote the store */}
      <section className="rounded-2xl bg-brand text-white px-8 py-12 text-center">
        <h2 className="text-2xl font-extrabold mb-3">
          Gear Up Like an Elite Performer
        </h2>
        <p className="text-white/80 mb-6 max-w-xl mx-auto">
          Represent FSA Elite inside and outside the office. Branded apparel,
          sales tools, and professional gear — all in one place.
        </p>
        <a
          href={storeUrl}
          className="inline-block bg-brand-accent text-white font-bold px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
        >
          Shop the FSA Elite Store →
        </a>
      </section>
    </div>
  );
}
