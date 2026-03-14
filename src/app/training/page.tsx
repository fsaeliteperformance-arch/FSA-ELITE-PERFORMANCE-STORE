/**
 * Training page — React Server Component
 *
 * Public-facing overview of the FSA Elite Performance training programs.
 * Store visitors can see the training curriculum from the outside before
 * committing to a program or purchasing related resources.
 */

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Training Programs",
  description:
    "Explore FSA Elite Performance training programs — proven sales frameworks, " +
    "objection-handling systems, and closing techniques for elite salespeople.",
};

// ---------------------------------------------------------------------------
// Training program data
// ---------------------------------------------------------------------------
const PROGRAMS = [
  {
    id: "core-foundation",
    icon: "🏆",
    title: "Core Sales Foundation",
    level: "Beginner",
    levelColor: "bg-emerald-100 text-emerald-800",
    duration: "4 weeks",
    description:
      "Build an unbreakable sales mindset and master the FSA Elite framework " +
      "from the ground up. Covers prospecting, first-contact scripts, and " +
      "daily activity targets that drive consistent results.",
    modules: [
      "Elite Mindset & Daily Discipline",
      "Prospecting Systems That Fill Your Pipeline",
      "First-Contact Scripts That Open Doors",
      "Daily KPI Tracking & Accountability",
    ],
  },
  {
    id: "objection-handling",
    icon: "🎯",
    title: "Objection Handling Masterclass",
    level: "Intermediate",
    levelColor: "bg-blue-100 text-blue-800",
    duration: "3 weeks",
    description:
      "Turn every 'no' into a learning opportunity and every objection into " +
      "a step closer to the close. Learn the FSA Elite reframe system and " +
      "pressure-test your skills in live role-play scenarios.",
    modules: [
      "The FSA Elite Reframe System",
      "Top 10 Objections & Exact Rebuttals",
      "Reading Buying Signals in Real Time",
      "Live Role-Play & Recorded Feedback",
    ],
  },
  {
    id: "closing-followup",
    icon: "🔑",
    title: "Closing & Follow-Up System",
    level: "Intermediate",
    levelColor: "bg-blue-100 text-blue-800",
    duration: "3 weeks",
    description:
      "A systematic approach to closing deals and keeping your pipeline warm. " +
      "Includes battle-tested follow-up cadences, CRM discipline, and the " +
      "multi-touch strategy that converts leads who said 'not right now.'",
    modules: [
      "FSA Elite 7-Touch Follow-Up Cadence",
      "Closing Techniques for Every Buyer Type",
      "CRM Setup & Pipeline Hygiene",
      "Converting Long-Term Leads",
    ],
  },
  {
    id: "personal-brand",
    icon: "⚡",
    title: "Personal Brand & Presence",
    level: "Advanced",
    levelColor: "bg-red-100 text-red-800",
    duration: "2 weeks",
    description:
      "Elite salespeople sell themselves before they sell a product. This " +
      "module covers personal brand positioning, social selling, and how to " +
      "show up as a trusted authority in your market.",
    modules: [
      "Defining Your Personal Brand Identity",
      "Social Selling on LinkedIn & Beyond",
      "Content That Builds Authority",
      "Referral Systems & Network Leverage",
    ],
  },
];

// ---------------------------------------------------------------------------
// Related products spotlight (slugs from the store catalogue)
// ---------------------------------------------------------------------------
const RELATED_PRODUCTS = [
  {
    slug: "fsa-elite-sales-playbook",
    label: "FSA Elite Sales Playbook",
    description: "The companion digital guide to every training module.",
    price: "$49.99",
  },
  {
    slug: "fsa-elite-notebook",
    label: "FSA Elite Hardcover Notebook",
    description: "Track your goals, scripts, and close ratios daily.",
    price: "$19.99",
  },
];

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default function TrainingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <section className="text-center mb-14">
        <h1 className="text-5xl font-extrabold tracking-tight text-brand mb-4">
          FSA Elite Training Programs
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A look inside the training that turns average reps into elite closers.
          These are the frameworks, scripts, and systems the FSA Elite community
          runs on.
        </p>
      </section>

      {/* Program cards */}
      <section aria-label="Training programs" className="mb-16">
        <h2 className="text-2xl font-bold text-brand mb-8">The Curriculum</h2>
        <div className="grid gap-8 sm:grid-cols-2">
          {PROGRAMS.map((program) => (
            <article
              key={program.id}
              className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              {/* Card header */}
              <div className="bg-brand/5 px-6 py-5 border-b border-gray-100 flex items-start gap-4">
                <span className="text-4xl" aria-hidden="true">
                  {program.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${program.levelColor}`}
                    >
                      {program.level}
                    </span>
                    <span className="text-xs text-gray-500">
                      {program.duration}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-brand leading-snug">
                    {program.title}
                  </h3>
                </div>
              </div>

              {/* Card body */}
              <div className="px-6 py-5 flex-1 flex flex-col gap-4">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {program.description}
                </p>

                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    What&apos;s covered
                  </h4>
                  <ul className="space-y-1.5">
                    {program.modules.map((mod) => (
                      <li
                        key={mod}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <span
                          className="mt-0.5 text-brand-accent font-bold flex-shrink-0"
                          aria-hidden="true"
                        >
                          ✓
                        </span>
                        {mod}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Training tools from the store */}
      <section
        aria-label="Training tools from the store"
        className="mb-16 rounded-xl border border-brand/15 bg-brand/5 px-6 py-8"
      >
        <h2 className="text-xl font-bold text-brand mb-2">
          Gear Up for the Training
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          These store products are built to support every module in the
          curriculum.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {RELATED_PRODUCTS.map((item) => (
            <Link
              key={item.slug}
              href={`/products/${item.slug}`}
              className="flex items-center justify-between gap-4 rounded-lg bg-white border border-gray-200 px-5 py-4 hover:border-brand-accent transition-colors group"
            >
              <div>
                <p className="font-semibold text-brand group-hover:text-brand-accent transition-colors text-sm">
                  {item.label}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {item.description}
                </p>
              </div>
              <span className="text-brand font-bold text-sm whitespace-nowrap">
                {item.price}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <p className="text-gray-600 mb-4 text-sm">
          Ready to bring the FSA Elite system into your routine?
        </p>
        <Link
          href="/products"
          className="inline-block bg-brand text-white font-semibold px-8 py-3 rounded-lg hover:bg-brand-accent transition-colors"
        >
          Shop the Store
        </Link>
      </section>
    </div>
  );
}
