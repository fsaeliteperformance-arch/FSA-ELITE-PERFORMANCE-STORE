import type { Metadata } from "next";
import Link from "next/link";
import ExperienceLoop from "@/components/ExperienceLoop";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Keep the FSA Elite Performance loop moving with a community built on accountability and momentum.",
};

export default function CommunityPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <section className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">
          Step 4
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-brand">
          Build belonging through community.
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          The community keeps wins visible, reinforces accountability, and
          creates the feedback loop that sends members back into fresh content to
          start the process again.
        </p>
        <div className="mt-8">
          <Link
            href="/content"
            className="inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          >
            Repeat with Content
          </Link>
        </div>
      </section>

      <ExperienceLoop currentStep="Community" />
    </div>
  );
}
