import type { Metadata } from "next";
import Link from "next/link";
import AccessForm from "@/components/AccessForm";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Clean, accessible login flow for FSA Elite sales reps with a direct path into the skills hub.",
};

export default function LoginPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <AccessForm mode="login" />

      <section
        aria-labelledby="login-support-heading"
        className="mt-10 grid gap-6 rounded-3xl border border-brand/10 bg-brand/5 p-8 lg:grid-cols-[1.3fr_0.7fr]"
      >
        <div>
          <h2
            id="login-support-heading"
            className="text-2xl font-bold tracking-tight text-brand"
          >
            Keep the comeback simple
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-gray-600">
            Returning reps should be able to sign in fast, reset their focus,
            and get back to the fundamentals that make appointments, closes, and
            follow-up numbers move.
          </p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-accent">
            Quick links
          </p>
          <ul className="mt-4 space-y-3 text-sm font-medium text-brand">
            <li>
              <Link className="hover:underline" href="/signup">
                New here? Create access
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/skills">
                Review the sales skills hub
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/products">
                Shop the store
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
