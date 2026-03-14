import type { Metadata } from "next";
import Link from "next/link";
import ExperienceLoop from "@/components/ExperienceLoop";

export const metadata: Metadata = {
  title: "Training App",
  description:
    "Move from content into daily execution with the FSA Elite Performance training app.",
};

export default function TrainingAppPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <section className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">
          Step 2
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-brand">
          Turn attention into action with the training app.
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Once people discover the brand through content, the training app gives
          them a place to practice, stay accountable, and keep progressing every
          day before they move deeper into the ecosystem.
        </p>
        <div className="mt-8">
          <Link
            href="/products"
            className="inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          >
            Continue to Store
          </Link>
        </div>
      </section>

      <ExperienceLoop currentStep="Training App" />
    </div>
  );
}
