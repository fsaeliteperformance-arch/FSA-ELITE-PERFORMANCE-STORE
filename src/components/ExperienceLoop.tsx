import Link from "next/link";
import { EXPERIENCE_LOOP } from "@/lib/experienceLoop";

interface ExperienceLoopProps {
  currentStep?: string;
}

export default function ExperienceLoop({ currentStep }: ExperienceLoopProps) {
  return (
    <section
      aria-label="FSA Elite experience loop"
      className="rounded-3xl border border-brand/10 bg-brand/5 p-6 sm:p-8"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">
        Content → Training App → Store → Community → Repeat
      </p>
      <h2 className="mt-3 text-2xl font-bold text-brand">
        A simple loop that keeps momentum moving.
      </h2>
      <div className="mt-6 grid gap-4 md:grid-cols-5">
        {EXPERIENCE_LOOP.map((step, index) => {
          const isActive = step.title === currentStep;

          return (
            <article
              key={step.title}
              className={`rounded-2xl border bg-white p-5 shadow-sm transition-colors ${
                isActive
                  ? "border-brand-accent ring-2 ring-brand-accent/20"
                  : "border-brand/10"
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
                Step {index + 1}
              </p>
              <h3 className="mt-2 text-lg font-bold text-brand">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">{step.summary}</p>
              <Link
                href={step.href}
                className="mt-4 inline-flex text-sm font-semibold text-brand hover:text-brand-accent transition-colors"
              >
                {step.actionLabel} →
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
