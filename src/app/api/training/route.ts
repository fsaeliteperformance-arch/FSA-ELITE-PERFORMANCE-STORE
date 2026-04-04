/**
 * GET /api/training
 *
 * Cross-platform endpoint used by the FSA Elite Sales Training app to verify
 * whether a customer has purchased training access through this store.
 *
 * The training platform calls this endpoint with the customer's Stripe
 * customer ID.  We query Stripe for completed Checkout Sessions that include
 * a training product and return the access status.
 *
 * Security notes
 * --------------
 * • Callers must supply a shared API secret in the Authorization header
 *   (`Bearer <TRAINING_API_SECRET>`) to prevent enumeration.
 * • The Stripe secret key is never exposed to the browser.
 * • Only GET requests are accepted; no state is mutated.
 */

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

/** Stripe price IDs that grant training platform access. */
const TRAINING_PRICE_IDS = new Set([
  "price_placeholder_007", // FSA Elite Sales Training — Full Access
  "price_placeholder_008", // FSA Elite Automotive Sales Pack
]);

function getStripeClient(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Missing STRIPE_SECRET_KEY environment variable.");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-06-20",
    appInfo: { name: "FSA Elite Performance Store — Training Verifier" },
  });
}

export async function GET(req: NextRequest) {
  // Verify shared secret so only the training platform can call this.
  const authHeader = req.headers.get("authorization") ?? "";
  const trainingSecret = process.env.TRAINING_API_SECRET;

  if (!trainingSecret) {
    // If the secret is not configured we refuse all requests to fail safe.
    return NextResponse.json(
      { error: "Training verification is not configured on this server." },
      { status: 503 },
    );
  }

  if (authHeader !== `Bearer ${trainingSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const customerId = req.nextUrl.searchParams.get("customerId");
  const email = req.nextUrl.searchParams.get("email");

  if (!customerId && !email) {
    return NextResponse.json(
      { error: "Provide customerId or email as a query parameter." },
      { status: 400 },
    );
  }

  let stripe: Stripe;
  try {
    stripe = getStripeClient();
  } catch {
    return NextResponse.json(
      { error: "Payment provider not available." },
      { status: 503 },
    );
  }

  try {
    // Look up completed checkout sessions for this customer.
    const sessions = await stripe.checkout.sessions.list({
      customer: customerId ?? undefined,
      customer_details: email && !customerId ? { email } : undefined,
      status: "complete",
      limit: 100,
      expand: ["data.line_items"],
    } as Parameters<typeof stripe.checkout.sessions.list>[0]);

    let hasAccess = false;
    const grantedProducts: string[] = [];

    for (const session of sessions.data) {
      const lineItems =
        (session as { line_items?: { data?: { price?: { id?: string }; description?: string }[] } })
          .line_items?.data ?? [];

      for (const item of lineItems) {
        const priceId = item.price?.id;
        if (priceId && TRAINING_PRICE_IDS.has(priceId)) {
          hasAccess = true;
          const desc = item.description;
          if (desc && !grantedProducts.includes(desc)) {
            grantedProducts.push(desc);
          }
        }
      }
    }

    return NextResponse.json({
      hasAccess,
      grantedProducts,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to verify training access: ${message}` },
      { status: 500 },
    );
  }
}
