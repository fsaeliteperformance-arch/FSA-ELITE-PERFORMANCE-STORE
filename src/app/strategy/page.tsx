import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product & Go-to-Market Strategy",
  description:
    "Olive + FSA modular product strategy, monetization model, and 90-day go-to-market execution plan.",
};

const INDUSTRY_PACKS = [
  "SaaS",
  "E-commerce",
  "B2B services",
  "Healthcare",
  "Finance",
  "Real estate",
  "Manufacturing",
  "Retail",
];

const ROLE_PACKS = [
  "Closers",
  "Account executives",
  "SDRs/BDRs",
  "Customer success",
  "Channel partners",
  "Enterprise sellers",
];

const MONETIZATION_CHANNELS = [
  "Recurring subscriptions (starter → pro → team → enterprise)",
  "One-time purchases (playbook bundles, templates)",
  "Training and certification tickets (live/virtual)",
  "Implementation and consulting retainers (done-for-you)",
  "White-label and reseller licensing",
  "Marketplace and affiliate bundles with partners",
];

const FIRST_90_DAY_PLAN = [
  "Launch MVP: Olive Lite chat widget + Olive Pro signup + 3 industry packs (SaaS, E-commerce, B2B services).",
  "Collect top-20 intents and top-50 customer questions, then rapidly publish templated playbooks.",
  "Run a pilot with 3–5 anchor customers (agencies or existing clients) to produce case studies.",
  "Execute content + webinar campaigns (Sales Training by FSA), paid social, and CRM/community partnerships.",
  "Run self-serve signup motion with nurture sequences, then upsell onboarding and certification.",
];

const KPI_TARGETS = [
  "Activation: % users who respond to Olive's first message",
  "Conversion: free → paid conversion rate",
  "Retention: MRR churn and seat retention",
  "ARPU: average revenue per user",
  "Time-to-value: signup to first experiment run",
  "Pipeline: enterprise and training contract revenue",
];

export default function StrategyPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold tracking-tight text-brand mb-4">
        FSA Elite Product & Go-to-Market Strategy
      </h1>
      <p className="text-lg text-gray-700 mb-10">
        Goal: make Olive + FSA digital products the go-to sales training and
        execution stack for every sales role and industry through a flexible
        core platform, verticalized packs, services, and enterprise options.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-brand mb-4">Modular product vision</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            Core platform: universal workflow, playbooks, templates, and AI
            assistant support for qualification, discovery, pitching, objection
            handling, and follow-ups.
          </li>
          <li>
            Industry packs tuned to vertical needs:
            <span className="font-medium"> {INDUSTRY_PACKS.join(", ")}</span>.
          </li>
          <li>
            Role packs for execution by sales motion:
            <span className="font-medium"> {ROLE_PACKS.join(", ")}</span>.
          </li>
          <li>
            Integrations and customization with CRM, analytics, and team
            process data so Olive outputs are contextual.
          </li>
          <li>
            Human-in-the-loop options: live training and coaching to reinforce
            AI recommendations.
          </li>
        </ul>
        <p className="text-sm text-gray-600 mt-4">
          Known limitation: results improve significantly when baseline offer,
          ICP, and conversion data are available and when vertical content is
          curated with feedback loops.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-brand mb-4">Packaging model</h2>
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold text-gray-700">Tier</th>
                <th className="text-left p-3 font-semibold text-gray-700">Offer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700">
              <tr>
                <td className="p-3 font-medium">Olive Lite (Free)</td>
                <td className="p-3">Basic Q&A, 3 templates, 1 industry cheat-sheet.</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Olive Pro (SMB/Self-serve)</td>
                <td className="p-3">
                  Full AI assistant, template library, 3 industry packs, exportable plans.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Olive Team</td>
                <td className="p-3">
                  Seat bundle, shared playbooks, analytics dashboard, LMS access, role packs.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Olive Enterprise / Agency</td>
                <td className="p-3">
                  SSO, single-tenant options, custom training data, onboarding, SLA, white-label.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Add-ons / A-la-carte</td>
                <td className="p-3">
                  Industry packs, courses, workshops, coaching, done-for-you playbooks, CRM setup,
                  certification, API access, OEM white-label.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-brand mb-4">Monetization channels</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          {MONETIZATION_CHANNELS.map((channel) => (
            <li key={channel}>{channel}</li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-brand mb-4">First 90 days</h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          {FIRST_90_DAY_PLAN.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-brand mb-4">Primary KPIs</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          {KPI_TARGETS.map((kpi) => (
            <li key={kpi}>{kpi}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
