import type { Metadata } from "next";
import Link from "next/link";
import AccessForm from "@/components/AccessForm";

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Clean, accessible sign-up flow for new FSA Elite members with direct access to skills and learning.",
};

export default function SignupPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <AccessForm mode="signup" />

      <section
        aria-labelledby="signup-support-heading"
        className="mt-10 grid gap-6 rounded-3xl border border-brand/10 bg-brand/5 p-8 lg:grid-cols-[1.3fr_0.7fr]"
      >
        <div>
          <h2
            id="signup-support-heading"
            className="text-2xl font-bold tracking-tight text-brand"
          >
            Set the tone from day one
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-gray-600">
            New members should feel welcomed, know what to do next, and move
            straight into training that helps them sell like pros without
            sounding forced or robotic.
          </p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-accent">
            Best next steps
          </p>
          <ul className="mt-4 space-y-3 text-sm font-medium text-brand">
            <li>
              <Link className="hover:underline" href="/skills">
                Start with the skills hub
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/login">
                Already have access? Log in
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/products/fsa-elite-sales-playbook">
                View the digital sales playbook
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
