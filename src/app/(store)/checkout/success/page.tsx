import Link from "next/link";
import type { Metadata } from "next";
import { primaryCtaLinkStyles } from "@/lib/buttonStyles";

export const metadata: Metadata = {
  title: "Order Confirmed",
};

export default function CheckoutSuccessPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <div className="text-6xl mb-6">🎉</div>
      <h1 className="text-3xl font-extrabold text-brand mb-4">
        Order Confirmed!
      </h1>
      <p className="text-gray-600 mb-8">
        Thanks for your order. You&apos;ll receive a confirmation email shortly.
      </p>
      <Link
        href="/products"
        className={primaryCtaLinkStyles}
      >
        Continue Shopping
      </Link>
    </div>
  );
}
