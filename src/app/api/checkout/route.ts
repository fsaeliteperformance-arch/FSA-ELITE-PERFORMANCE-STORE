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
  let requestBody: unknown;
  try {
    requestBody = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (
    !requestBody ||
    typeof requestBody !== "object" ||
    !Array.isArray((requestBody as { items?: unknown }).items)
  ) {
    return NextResponse.json(
      { error: "Request body must contain an items array" },
      { status: 400 },
    );
  }

  const requestLineItems = (requestBody as { items: unknown[] }).items;

  // Validate each line item before sending to Stripe.
  const lineItems: CheckoutLineItem[] = [];
  for (const rawLineItem of requestLineItems) {
    if (
      !rawLineItem ||
      typeof rawLineItem !== "object" ||
      typeof (rawLineItem as { stripePriceId?: unknown }).stripePriceId !==
        "string" ||
      !(rawLineItem as { stripePriceId: string }).stripePriceId.trim() ||
      typeof (rawLineItem as { quantity?: unknown }).quantity !== "number" ||
      (rawLineItem as { quantity: number }).quantity < 1
    ) {
      return NextResponse.json(
        { error: "Each item must have a valid stripePriceId and quantity >= 1" },
        { status: 400 },
      );
    }
    lineItems.push({
      stripePriceId: (
        rawLineItem as { stripePriceId: string }
      ).stripePriceId.trim(),
      quantity: Math.floor((rawLineItem as { quantity: number }).quantity),
    });
  }

  if (lineItems.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  try {
    // Use a trusted origin for Stripe redirect URLs to avoid open-redirect
    // abuse via a spoofed Origin header. Fall back to localhost for local dev.
    const configuredOrigin =
      process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    let origin: string;
    try {
      origin = new URL(configuredOrigin).origin;
    } catch {
      origin = "http://localhost:3000";
    }

    const session = await createCheckoutSession(lineItems, origin);
    return NextResponse.json({ url: session.url });
  } catch (stripeError) {
    console.error("Stripe checkout error:", stripeError);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 },
    );
  }
}
