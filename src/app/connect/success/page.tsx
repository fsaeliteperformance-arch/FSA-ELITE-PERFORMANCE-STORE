export default function ConnectCheckoutSuccessPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-brand">Payment successful</h1>
      <p className="mt-3 text-gray-600">
        The connected-account checkout completed successfully.
      </p>
      <a
        href="/connect/dashboard"
        className="mt-6 inline-block rounded-md bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand/90"
      >
        Back to Connect dashboard
      </a>
    </div>
  );
}
