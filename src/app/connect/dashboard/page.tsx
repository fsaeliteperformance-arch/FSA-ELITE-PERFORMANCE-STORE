import type { Metadata } from "next";
import ConnectDashboard from "@/components/connect/ConnectDashboard";

export const metadata: Metadata = {
  title: "Stripe Connect Demo Dashboard",
  description: "Sample Stripe Connect onboarding, products, storefront, and subscriptions.",
};

export default function ConnectDashboardPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-brand">Stripe Connect Demo Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          End-to-end sample flow: connected account creation, onboarding, product creation, storefront checkout,
          subscription checkout, and billing portal.
        </p>
      </header>
      <ConnectDashboard />
    </div>
  );
}
