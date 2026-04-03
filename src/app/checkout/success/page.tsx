import Link from "next/link";
import type { Metadata } from "next";
import Stripe from "stripe";
import { retrieveCheckoutSession } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Order Confirmed",
};

interface CheckoutSuccessPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

function getCustomerEmail(session: Stripe.Checkout.Session): string | null {
  if (session.customer_details?.email) {
    return session.customer_details.email;
  }

  if (!session.customer || typeof session.customer === "string") {
    return null;
  }

  return "deleted" in session.customer ? null : session.customer.email ?? null;
}

export default async function CheckoutSuccessPage({
  searchParams,
}: CheckoutSuccessPageProps) {
  const { session_id: sessionId } = await searchParams;

  let customerEmail: string | null = null;

  if (sessionId) {
    try {
      const session = await retrieveCheckoutSession(sessionId);
      customerEmail = getCustomerEmail(session);
    } catch (error) {
      if (!(error instanceof Stripe.errors.StripeError)) {
        throw error;
      }
      console.error("Unable to retrieve checkout session:", error);
    }
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <div className="text-6xl mb-6">🎉</div>
      <h1 className="text-3xl font-extrabold text-brand mb-4">
        Order Confirmed!
      </h1>
      <p className="text-gray-600 mb-8">
        Thanks for your order.
        {customerEmail
          ? ` A confirmation email will be sent to ${customerEmail}.`
          : " You'll receive a confirmation email shortly."}
      </p>
      <Link
        href="/products"
        className="inline-block bg-brand text-white font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
