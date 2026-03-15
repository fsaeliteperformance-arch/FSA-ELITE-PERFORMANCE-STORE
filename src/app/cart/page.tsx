/**
 * /cart — Cart page
 *
 * This is a Client Component because it reads from the CartContext which
 * manages ephemeral client-side state.  The checkout action is sent to a
 * Route Handler (Server-side) so the Stripe secret key is never exposed.
 */
"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/products";
import Container from "@/components/Container";
import LinkButton from "@/components/LinkButton";
import QuantitySelector from "@/components/QuantitySelector";

export default function CartPage() {
  const { state, total, count, removeItem, dispatch } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Derive shipping estimate only when total changes — avoids re-running on
  // every unrelated render.
  const shippingNote = useMemo(
    () =>
      total >= 7500
        ? "Free shipping on this order 🎉"
        : `Add ${formatPrice(7500 - total)} more for free shipping`,
    [total],
  );

  const handleCheckout = useCallback(async () => {
    setIsCheckingOut(true);
    try {
      const checkoutApiResponse = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: state.items.map(({ product, quantity }) => ({
            stripePriceId: product.stripePriceId,
            quantity,
          })),
        }),
      });
      const checkoutSessionData = await checkoutApiResponse.json();
      if (checkoutSessionData.url) {
        window.location.href = checkoutSessionData.url;
      }
    } finally {
      setIsCheckingOut(false);
    }
  }, [state.items]);

  if (count === 0) {
    return (
      <Container maxWidth="2xl" paddingY="py-24" className="text-center">
        <h1 className="text-3xl font-bold text-brand mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">
          Time to gear up — browse the store and add some items.
        </p>
        <LinkButton href="/products">Shop Now</LinkButton>
      </Container>
    );
  }

  return (
    <Container maxWidth="5xl">
      <h1 className="text-3xl font-bold text-brand mb-10">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Line items */}
        <ul className="lg:col-span-2 divide-y divide-gray-100 space-y-4">
          {state.items.map(({ product, quantity }) => (
            <li key={product.id} className="flex gap-4 py-4">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-brand truncate">{product.name}</p>
                <p className="text-gray-500 text-sm">{formatPrice(product.price)}</p>
                <div className="flex items-center gap-3 mt-2">
                  <QuantitySelector
                    quantity={quantity}
                    onDecrement={() =>
                      dispatch({ type: "DECREMENT", productId: product.id })
                    }
                    onIncrement={() =>
                      dispatch({ type: "INCREMENT", productId: product.id })
                    }
                  />
                  <button
                    onClick={() => removeItem(product.id)}
                    className="ml-auto text-sm text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <p className="font-bold text-brand self-center">
                {formatPrice(product.price * quantity)}
              </p>
            </li>
          ))}
        </ul>

        {/* Order summary */}
        <aside className="lg:col-span-1">
          <div className="bg-gray-50 rounded-2xl p-6 sticky top-6">
            <h2 className="text-xl font-bold text-brand mb-6">Order Summary</h2>
            <p className="text-sm text-gray-500 mb-4">{shippingNote}</p>
            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-brand-accent text-white font-bold py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isCheckingOut ? "Redirecting…" : "Checkout with Stripe"}
            </button>
          </div>
        </aside>
      </div>
    </Container>
  );
}
