import Link from "next/link";

export default function ConnectStorefrontEntryPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-brand">Connected account storefront</h1>
        <p className="mt-3 text-sm text-gray-600">
          Use your connected account ID to open the storefront page for that account.
        </p>
        <p className="mt-2 text-sm text-gray-600">
          Example: <code>/connect/storefront/acct_1234</code>
        </p>
        <Link
          href="/connect/dashboard"
          className="mt-5 inline-block rounded-md border border-brand px-4 py-2 text-sm font-semibold text-brand hover:bg-brand/5"
        >
          Back to Connect dashboard
        </Link>
      </section>
    </div>
  );
}
