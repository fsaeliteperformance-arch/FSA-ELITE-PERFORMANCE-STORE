import type { Metadata } from "next";
import Link from "next/link";
import {
  DAILY_SALES_SYSTEM,
  OLIVE_PROFILE,
  SKILL_TRACKS,
} from "@/lib/learning";

export const metadata: Metadata = {
  title: "Skills Hub",
  description:
    "Practical sales learning for FSA Elite reps, including daily routines, skill drills, and Olive's coaching profile.",
};

export default function SkillsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <section
        aria-labelledby="skills-hero-heading"
        className="rounded-3xl border border-brand/10 bg-brand text-white p-8 sm:p-10"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-accent">
          Skills & learning
        </p>
        <h1
          id="skills-hero-heading"
          className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight"
        >
          Practical coaching that makes reps sharper, calmer, and more useful to
          the customer.
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-white/80">
          Everything here is built to be immediately beneficial: better
          discovery, warmer objection handling, cleaner follow-up, and a daily
          system that keeps momentum high without turning the rep into a robot.
        </p>
      </section>

      <section aria-labelledby="daily-system-heading" className="mt-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-accent">
              Daily system
            </p>
            <h2
              id="daily-system-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-brand"
            >
              Three habits that keep your day under control
            </h2>
          </div>
          <Link
            href="/products/fsa-elite-sales-playbook"
            className="inline-flex items-center justify-center rounded-full border border-brand/15 px-5 py-3 text-sm font-semibold text-brand transition-colors hover:border-brand hover:bg-brand/5"
          >
            Pair it with the sales playbook
          </Link>
        </div>
        <ol className="mt-8 grid gap-6 lg:grid-cols-3">
          {DAILY_SALES_SYSTEM.map((item, index) => (
            <li
              key={item}
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-accent">
                Step {index + 1}
              </p>
              <p className="mt-3 text-base leading-7 text-gray-600">{item}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="skill-tracks-heading" className="mt-12">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-accent">
          Skill tracks
        </p>
        <h2
          id="skill-tracks-heading"
          className="mt-2 text-3xl font-bold tracking-tight text-brand"
        >
          Learning blocks that are actually beneficial on the floor
        </h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {SKILL_TRACKS.map((track) => (
            <article
              key={track.title}
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-bold text-brand">{track.title}</h3>
              <p className="mt-3 text-base leading-7 text-gray-600">
                {track.description}
              </p>
              <p className="mt-4 rounded-2xl bg-brand/5 p-4 text-sm leading-6 text-brand">
                <span className="font-semibold">Why it matters:</span> {track.benefit}
              </p>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
                {track.drills.map((drill) => (
                  <li key={drill} className="flex gap-3">
                    <span className="mt-1 h-2.5 w-2.5 flex-none rounded-full bg-brand-accent" />
                    <span>{drill}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section
        id="olive"
        aria-labelledby="olive-heading"
        className="mt-12 rounded-3xl border border-brand/10 bg-brand/5 p-8"
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-accent">
              Olive profile
            </p>
            <h2
              id="olive-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-brand"
            >
              Human settings and traits for Olive
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600">
              {OLIVE_PROFILE.summary}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-brand">Traits</h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-600">
                {OLIVE_PROFILE.traits.map((trait) => (
                  <li key={trait} className="flex gap-3">
                    <span className="mt-1 h-2.5 w-2.5 flex-none rounded-full bg-brand-accent" />
                    <span>{trait}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-brand">Operating rules</h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-600">
                {OLIVE_PROFILE.operatingRules.map((rule) => (
                  <li key={rule} className="flex gap-3">
                    <span className="mt-1 h-2.5 w-2.5 flex-none rounded-full bg-brand-accent" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
