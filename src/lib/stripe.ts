/**
 * Stripe helpers
 *
 * Performance / security notes
 * ----------------------------
 * • The Stripe client is instantiated once and reused across requests
 *   (module-level singleton) to avoid the overhead of creating a new HTTP
 *   connection pool on every API call.
 * • The secret key is read exclusively from an environment variable so it is
 *   never embedded in source code or shipped to the browser.
 * • All Stripe interactions happen in Server Actions / Route Handlers only —
 *   the secret key is never exposed to the client bundle.
 */

import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error(
    "Missing STRIPE_SECRET_KEY environment variable. " +
      "Add it to .env.local for local development.",
  );
}

// Module-level singleton — created once per server process / warm Lambda.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
  maxNetworkRetries: 2,
  // Tell Stripe which app is making this call so they can surface usage data.
  appInfo: {
    name: "FSA Elite Performance Store",
    version: "0.1.0",
  },
});

export default stripe;

// ---------------------------------------------------------------------------
// Checkout session factory
// ---------------------------------------------------------------------------

export interface CheckoutLineItem {
  stripePriceId: string;
  quantity: number;
}

/**
 * Create a Stripe Checkout Session for the provided line items.
 *
 * @param lineItems  Array of Stripe price IDs + quantities from the cart.
 * @param origin     The configured site origin (e.g. https://store.example.com)
 *                   used to build the success/cancel redirect URLs.
 * @returns          The full Stripe Checkout Session object.
 */
export async function createCheckoutSession(
  lineItems: CheckoutLineItem[],
  origin: string,
) {
  return stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems.map(({ stripePriceId, quantity }) => ({
      price: stripePriceId,
      quantity,
    })),
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cart`,
    // Collect a billing address to satisfy card-network requirements.
    billing_address_collection: "required",
    // The descriptor shown on the customer's bank statement.
    payment_intent_data: {
      statement_descriptor: "FSA ELITE PERFORMANCE",
    },
  });
}

export async function getCheckoutSession(sessionId: string) {
  return stripe.checkout.sessions.retrieve(sessionId);
}
