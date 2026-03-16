import Link from "next/link";
import type { Metadata } from "next";
import { getCheckoutSession } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Order Confirmed",
};

interface CheckoutSuccessPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function CheckoutSuccessPage({
  searchParams,
}: CheckoutSuccessPageProps) {
  const { session_id: rawSessionId } = await searchParams;
  const sessionId =
    typeof rawSessionId === "string" && rawSessionId.trim()
      ? rawSessionId.trim()
      : null;

  let confirmationHeading = "Payment Pending";
  let confirmationMessage =
    "We’re waiting for Stripe to confirm your payment. If checkout was interrupted, no charge was created and you can safely return to your cart.";

  if (sessionId) {
    try {
      const session = await getCheckoutSession(sessionId);
      const isConfirmed =
        session.payment_status === "paid" || session.status === "complete";

      if (isConfirmed) {
        confirmationHeading = "Order Confirmed!";
        confirmationMessage =
          "Stripe confirmed your payment and your confirmation email should arrive shortly.";
      } else {
        confirmationMessage =
          "Stripe has your checkout session, but payment is still processing. Please wait for the confirmation email before placing another order.";
      }
    } catch (checkoutSessionError) {
      console.error("Stripe checkout confirmation error:", checkoutSessionError);
      confirmationMessage =
        "We couldn’t verify Stripe’s final payment status yet. If you don’t receive a confirmation email soon, check your Stripe receipt before trying again.";
    }
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <div className="text-6xl mb-6">🎉</div>
      <h1 className="text-3xl font-extrabold text-brand mb-4">
        {confirmationHeading}
      </h1>
      <p className="text-gray-600 mb-8">{confirmationMessage}</p>
      <Link
        href="/products"
        className="inline-block bg-brand text-white font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
