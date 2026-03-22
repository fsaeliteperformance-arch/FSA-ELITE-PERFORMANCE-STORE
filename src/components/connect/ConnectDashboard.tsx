"use client";

import { useMemo, useState } from "react";

type AccountStatusResponse = {
  readyToProcessPayments?: boolean;
  requirementsStatus?: string | null;
  onboardingComplete?: boolean;
};

/**
 * Client dashboard for the Stripe Connect demo flow.
 *
 * This intentionally keeps state in-memory on the page so developers can read
 * each step and test the integration quickly.
 */
export default function ConnectDashboard() {
  const [displayName, setDisplayName] = useState("Demo Seller");
  const [contactEmail, setContactEmail] = useState("seller@example.com");
  const [userId, setUserId] = useState("demo-user-1");
  const [accountId, setAccountId] = useState("");

  const [productName, setProductName] = useState("Demo Training Pack");
  const [productDescription, setProductDescription] = useState(
    "A sample product created on the connected account.",
  );
  const [priceInCents, setPriceInCents] = useState("2500");
  const [currency, setCurrency] = useState("usd");

  const [status, setStatus] = useState<AccountStatusResponse | null>(null);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const storefrontUrl = useMemo(() => {
    if (!accountId.trim()) return "";
    return `/connect/storefront/${encodeURIComponent(accountId.trim())}`;
  }, [accountId]);

  async function withRequest<T>(fn: () => Promise<T>) {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      return await fn();
    } catch (requestError) {
      const messageText =
        requestError instanceof Error ? requestError.message : "Request failed.";
      setError(messageText);
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function createAccount() {
    const result = await withRequest(async () => {
      const res = await fetch("/api/connect/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName,
          contactEmail,
          userId,
        }),
      });
      const data = (await res.json()) as { error?: string; accountId?: string };
      if (!res.ok) throw new Error(data.error ?? "Unable to create account.");
      if (!data.accountId) throw new Error("Stripe did not return accountId.");
      setAccountId(data.accountId);
      setMessage(`Connected account created: ${data.accountId}`);
    });

    if (result === null) return;
  }

  async function refreshStatus() {
    await withRequest(async () => {
      const res = await fetch(
        `/api/connect/accounts/status?accountId=${encodeURIComponent(accountId.trim())}`,
      );
      const data = (await res.json()) as AccountStatusResponse & { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Unable to fetch account status.");
      setStatus(data);
      setMessage("Fetched latest onboarding status from Stripe.");
    });
  }

  async function openOnboarding() {
    await withRequest(async () => {
      const res = await fetch("/api/connect/accounts/onboarding-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId: accountId.trim() }),
      });
      const data = (await res.json()) as { error?: string; url?: string };
      if (!res.ok) throw new Error(data.error ?? "Unable to create onboarding link.");
      if (!data.url) throw new Error("Stripe did not return onboarding url.");
      window.location.href = data.url;
    });
  }

  async function createProduct() {
    await withRequest(async () => {
      const parsedPrice = Number(priceInCents);
      const res = await fetch("/api/connect/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountId: accountId.trim(),
          name: productName,
          description: productDescription,
          priceInCents: parsedPrice,
          currency,
        }),
      });

      const data = (await res.json()) as {
        error?: string;
        product?: { id?: string; default_price?: string | { id?: string } };
      };

      if (!res.ok) throw new Error(data.error ?? "Unable to create product.");

      const defaultPrice =
        typeof data.product?.default_price === "string"
          ? data.product.default_price
          : data.product?.default_price?.id;

      setMessage(
        `Created product ${data.product?.id ?? "(unknown id)"} with default price ${defaultPrice ?? "(unknown)"}.`,
      );
    });
  }

  async function startSubscriptionCheckout() {
    await withRequest(async () => {
      const res = await fetch("/api/connect/subscriptions/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId: accountId.trim() }),
      });
      const data = (await res.json()) as { error?: string; url?: string };
      if (!res.ok) throw new Error(data.error ?? "Unable to create subscription checkout.");
      if (!data.url) throw new Error("Stripe did not return a checkout URL.");
      window.location.href = data.url;
    });
  }

  async function openBillingPortal() {
    await withRequest(async () => {
      const res = await fetch("/api/connect/subscriptions/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId: accountId.trim() }),
      });
      const data = (await res.json()) as { error?: string; url?: string };
      if (!res.ok) throw new Error(data.error ?? "Unable to create billing portal session.");
      if (!data.url) throw new Error("Stripe did not return a billing portal URL.");
      window.location.href = data.url;
    });
  }

  const canUseAccountActions = Boolean(accountId.trim());

  return (
    <div className="grid gap-6">
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-brand">1) Create connected account</h2>
        <p className="mt-2 text-sm text-gray-600">
          This calls <code>stripeClient.v2.core.accounts.create</code> using only the fields requested in
          your issue.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="text-sm">
            <span className="mb-1 block font-medium text-gray-700">Display name</span>
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
            />
          </label>
          <label className="text-sm">
            <span className="mb-1 block font-medium text-gray-700">Contact email</span>
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              value={contactEmail}
              onChange={(event) => setContactEmail(event.target.value)}
              type="email"
            />
          </label>
          <label className="text-sm sm:col-span-2">
            <span className="mb-1 block font-medium text-gray-700">Demo user ID (optional mapping)</span>
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
            />
          </label>
        </div>
        <button
          className="mt-4 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand/90 disabled:opacity-50"
          onClick={createAccount}
          disabled={loading}
          type="button"
        >
          Create connected account
        </button>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-brand">2) Onboarding + status</h2>
        <p className="mt-2 text-sm text-gray-600">
          Click &quot;Onboard to collect payments&quot; to generate an account link. The status button always
          fetches the account directly from Stripe API for demo accuracy.
        </p>
        <label className="mt-4 block text-sm">
          <span className="mb-1 block font-medium text-gray-700">Connected account ID (acct_...)</span>
          <input
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            value={accountId}
            onChange={(event) => setAccountId(event.target.value)}
            placeholder="acct_..."
          />
        </label>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            className="rounded-md border border-brand px-4 py-2 text-sm font-semibold text-brand hover:bg-brand/5 disabled:opacity-50"
            onClick={refreshStatus}
            disabled={!canUseAccountActions || loading}
            type="button"
          >
            Refresh onboarding status
          </button>
          <button
            className="rounded-md bg-brand-accent px-4 py-2 text-sm font-semibold text-white hover:bg-brand-accent/90 disabled:opacity-50"
            onClick={openOnboarding}
            disabled={!canUseAccountActions || loading}
            type="button"
          >
            Onboard to collect payments
          </button>
        </div>

        {status && (
          <div className="mt-4 rounded-md bg-gray-50 p-3 text-sm text-gray-800">
            <p>
              <span className="font-semibold">Ready to process payments:</span>{" "}
              {status.readyToProcessPayments ? "Yes" : "No"}
            </p>
            <p>
              <span className="font-semibold">Requirements status:</span>{" "}
              {status.requirementsStatus ?? "unknown"}
            </p>
            <p>
              <span className="font-semibold">Onboarding complete:</span>{" "}
              {status.onboardingComplete ? "Yes" : "No"}
            </p>
          </div>
        )}
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-brand">3) Create products on connected account</h2>
        <p className="mt-2 text-sm text-gray-600">
          This uses the <code>Stripe-Account</code> header (via <code>stripeAccount</code>) so products are
          created on the connected account, not your platform account.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="text-sm">
            <span className="mb-1 block font-medium text-gray-700">Product name</span>
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              value={productName}
              onChange={(event) => setProductName(event.target.value)}
            />
          </label>
          <label className="text-sm">
            <span className="mb-1 block font-medium text-gray-700">Price in cents</span>
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              value={priceInCents}
              onChange={(event) => setPriceInCents(event.target.value)}
              inputMode="numeric"
            />
          </label>
          <label className="text-sm">
            <span className="mb-1 block font-medium text-gray-700">Currency</span>
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              value={currency}
              onChange={(event) => setCurrency(event.target.value)}
            />
          </label>
          <label className="text-sm sm:col-span-2">
            <span className="mb-1 block font-medium text-gray-700">Description</span>
            <textarea
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              value={productDescription}
              onChange={(event) => setProductDescription(event.target.value)}
              rows={3}
            />
          </label>
        </div>
        <button
          className="mt-4 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand/90 disabled:opacity-50"
          onClick={createProduct}
          disabled={!canUseAccountActions || loading}
          type="button"
        >
          Create connected product
        </button>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-brand">4) Customer storefront + purchases</h2>
        <p className="mt-2 text-sm text-gray-600">
          Use the storefront link to view products and run direct-charge checkout for this connected account.
        </p>
        {storefrontUrl ? (
          <a className="mt-3 inline-block text-sm font-semibold text-brand underline" href={storefrontUrl}>
            Open connected account storefront
          </a>
        ) : (
          <p className="mt-3 text-sm text-gray-500">Enter an account ID to open storefront.</p>
        )}
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-brand">5) Connected-account subscription + portal</h2>
        <p className="mt-2 text-sm text-gray-600">
          Start a hosted subscription checkout and open billing portal management from this dashboard.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand/90 disabled:opacity-50"
            onClick={startSubscriptionCheckout}
            disabled={!canUseAccountActions || loading}
            type="button"
          >
            Start subscription checkout
          </button>
          <button
            className="rounded-md border border-brand px-4 py-2 text-sm font-semibold text-brand hover:bg-brand/5 disabled:opacity-50"
            onClick={openBillingPortal}
            disabled={!canUseAccountActions || loading}
            type="button"
          >
            Open billing portal
          </button>
        </div>
      </section>

      {message && <p className="rounded-md bg-green-50 p-3 text-sm text-green-800">{message}</p>}
      {error && <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}
    </div>
  );
}
