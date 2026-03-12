/**
 * POST /api/checkout
 *
 * Receives the cart line items from the client, creates a Stripe Checkout
 * Session server-side (so the secret key never reaches the browser), and
 * returns the redirect URL.
 *
 * Security notes
 * --------------
 * • The Stripe secret key is only read from process.env on the server.
 * • We validate that every requested stripePriceId is non-empty before
 *   forwarding to Stripe to prevent crafted payloads.
 * • The request body size is implicitly bounded by Next.js defaults (1 MB).
 */

import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";
import type { CheckoutLineItem } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (
    !body ||
    typeof body !== "object" ||
    !Array.isArray((body as { items?: unknown }).items)
  ) {
    return NextResponse.json(
      { error: "Request body must contain an items array" },
      { status: 400 },
    );
  }

  const items = (body as { items: unknown[] }).items;

  // Validate each line item before sending to Stripe.
  const lineItems: CheckoutLineItem[] = [];
  for (const item of items) {
    if (
      !item ||
      typeof item !== "object" ||
      typeof (item as { stripePriceId?: unknown }).stripePriceId !== "string" ||
      !(item as { stripePriceId: string }).stripePriceId.trim() ||
      typeof (item as { quantity?: unknown }).quantity !== "number" ||
      (item as { quantity: number }).quantity < 1
    ) {
      return NextResponse.json(
        { error: "Each item must have a valid stripePriceId and quantity >= 1" },
        { status: 400 },
      );
    }
    lineItems.push({
      stripePriceId: (item as { stripePriceId: string }).stripePriceId.trim(),
      quantity: Math.floor((item as { quantity: number }).quantity),
    });
  }

  if (lineItems.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  try {
    const origin =
      req.headers.get("origin") ??
      process.env.NEXT_PUBLIC_SITE_URL ??
      "http://localhost:3000";

    const session = await createCheckoutSession(lineItems, origin);
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 },
    );
  }
}
