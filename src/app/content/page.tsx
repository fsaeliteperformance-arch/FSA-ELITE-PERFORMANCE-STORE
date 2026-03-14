import type { Metadata } from "next";
import Link from "next/link";
import ExperienceLoop from "@/components/ExperienceLoop";

export const metadata: Metadata = {
  title: "Content",
  description:
    "Start the FSA Elite Performance loop with content that attracts and educates the right audience.",
};

export default function ContentPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <section className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">
          Step 1
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-brand">
          Lead with content that earns attention.
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Content is where the loop begins. Useful insights, stories, and sales
          education create interest, build trust, and move people toward the
          training experience.
        </p>
        <div className="mt-8">
          <Link
            href="/training-app"
            className="inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          >
            Continue to Training App
          </Link>
        </div>
      </section>

      <ExperienceLoop currentStep="Content" />
    </div>
  );
}
