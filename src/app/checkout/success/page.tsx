import type { Metadata } from "next";
import Container from "@/components/Container";
import LinkButton from "@/components/LinkButton";

export const metadata: Metadata = {
  title: "Order Confirmed",
};

export default function CheckoutSuccessPage() {
  return (
    <Container maxWidth="lg" paddingY="py-24" className="text-center">
      <div className="text-6xl mb-6">🎉</div>
      <h1 className="text-3xl font-extrabold text-brand mb-4">
        Order Confirmed!
      </h1>
      <p className="text-gray-600 mb-8">
        Thanks for your order. You&apos;ll receive a confirmation email shortly.
      </p>
      <LinkButton href="/products">Continue Shopping</LinkButton>
    </Container>
  );
}
