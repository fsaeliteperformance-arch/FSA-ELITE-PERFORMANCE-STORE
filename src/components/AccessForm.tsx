"use client";

import { FormEvent, useId, useState } from "react";
import Link from "next/link";

interface AccessFormProps {
  mode: "login" | "signup";
}

function getDisplayName(formData: FormData) {
  const rawName = String(
    formData.get("fullName") || formData.get("email") || "Elite member",
  ).trim();
  const firstWord = rawName.includes("@")
    ? rawName.split("@")[0]
    : rawName.split(" ")[0];
  const cleanedName = firstWord.replace(/[._-]+/g, " ").trim().split(" ")[0];
  const normalizedName =
    cleanedName.charAt(0).toUpperCase() + cleanedName.slice(1).toLowerCase();

  return normalizedName || "Elite member";
}

export default function AccessForm({ mode }: AccessFormProps) {
  const hintId = useId();
  const [submittedName, setSubmittedName] = useState("");

  const isLogin = mode === "login";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    setSubmittedName(getDisplayName(formData));
    form.reset();
  };

  return (
    <div className="rounded-3xl border border-brand/10 bg-white p-8 shadow-sm">
      <div className="max-w-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-accent">
          {isLogin ? "Member login" : "New member signup"}
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-brand">
          {isLogin ? "Log in clean and get to work" : "Sign up with a clean, simple flow"}
        </h1>
        <p className="mt-4 text-lg leading-8 text-gray-600">
          {isLogin
            ? "This login screen keeps the essentials up front, makes every field easy to read, and points you straight into training that sharpens your next conversation."
            : "This sign-up flow is built to feel calm, clear, and accessible so new reps can get set up fast and move right into practical sales learning."}
        </p>
      </div>

      <form
        className="mt-8 grid gap-6"
        aria-describedby={hintId}
        noValidate
        onSubmit={handleSubmit}
      >
        {!isLogin && (
          <div>
            <label
              htmlFor="fullName"
              className="mb-2 block text-sm font-semibold text-brand"
            >
              Full name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              required
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-base text-gray-900 shadow-sm transition-colors focus:border-brand-accent focus:outline-none"
              placeholder="Jordan Smith"
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold text-brand">
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete={isLogin ? "email" : "username"}
            inputMode="email"
            required
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-base text-gray-900 shadow-sm transition-colors focus:border-brand-accent focus:outline-none"
            placeholder="you@fsaeliteperformance.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-semibold text-brand"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={isLogin ? "current-password" : "new-password"}
            minLength={8}
            required
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-base text-gray-900 shadow-sm transition-colors focus:border-brand-accent focus:outline-none"
            placeholder="Use at least 8 characters"
          />
        </div>

        {!isLogin && (
          <div>
            <label
              htmlFor="goal"
              className="mb-2 block text-sm font-semibold text-brand"
            >
              Biggest sales goal right now
            </label>
            <textarea
              id="goal"
              name="goal"
              rows={4}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-base text-gray-900 shadow-sm transition-colors focus:border-brand-accent focus:outline-none"
              placeholder="Example: tighten my discovery and convert more second looks"
            />
          </div>
        )}

        <p id={hintId} className="text-sm leading-6 text-gray-500">
          {isLogin
            ? "Use this clean front door to jump back into your routines, review the skills hub, and sharpen your next close."
            : "Tell us your goal so the training experience can stay practical, helpful, and immediately useful."}
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
          >
            {isLogin ? "Log in cleanly" : "Create my access"}
          </button>
          <Link
            href="/skills"
            className="inline-flex items-center justify-center rounded-full border border-brand/20 px-6 py-3 font-semibold text-brand transition-colors hover:border-brand hover:bg-brand/5"
          >
            Explore the skills hub
          </Link>
        </div>
      </form>

      <div className="mt-6 min-h-20 rounded-2xl bg-gray-50 p-4">
        <div aria-live="polite" role="status">
          {submittedName ? (
            <div className="space-y-2">
              <p className="font-semibold text-brand">
                Nice work, {submittedName}.
              </p>
              <p className="text-sm leading-6 text-gray-600">
                Your {isLogin ? "login" : "signup"} flow is clean and ready. Keep the
                momentum going in the skills hub with Olive&apos;s calm, high-trust sales
                guidance.
              </p>
            </div>
          ) : (
            <p className="text-sm leading-6 text-gray-500">
              Submit the form to confirm the clean access flow and get your next
              coaching step.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
