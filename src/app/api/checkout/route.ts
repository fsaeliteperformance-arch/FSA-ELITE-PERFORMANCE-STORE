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
 * • We validate that every requested stripePriceId is non-empty and every
 *   quantity is a positive integer before forwarding to Stripe.
 * • The request body size is implicitly bounded by Next.js defaults (1 MB).
 */

import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";
import type { CheckoutLineItem } from "@/lib/stripe";

function getRawLineItems(requestBody: unknown): unknown[] | null {
  if (!requestBody || typeof requestBody !== "object") return null;

  const parsed = requestBody as {
    items?: unknown;
    lineItems?: unknown;
    line_items?: unknown;
    checkout_session?: { line_items?: unknown };
  };

  if (Array.isArray(parsed.items)) return parsed.items;
  if (Array.isArray(parsed.lineItems)) return parsed.lineItems;
  if (Array.isArray(parsed.line_items)) return parsed.line_items;
  if (Array.isArray(parsed.checkout_session?.line_items)) {
    return parsed.checkout_session.line_items;
  }

  return null;
}

export async function POST(req: NextRequest) {
  let requestBody: unknown;
  try {
    requestBody = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const requestLineItems = getRawLineItems(requestBody);
  if (!requestLineItems) {
    return NextResponse.json(
      {
        error:
          "Request body must contain items, lineItems, line_items, or checkout_session.line_items array",
      },
      { status: 400 },
    );
  }

  // Validate each line item before sending to Stripe.
  const lineItems: CheckoutLineItem[] = [];
  for (const rawLineItem of requestLineItems) {
    const parsedLineItem =
      rawLineItem && typeof rawLineItem === "object"
        ? (rawLineItem as {
            stripePriceId?: unknown;
            stripe_price_id?: unknown;
            price?: unknown;
            quantity?: unknown;
          })
        : null;
    const stripePriceId =
      parsedLineItem?.stripePriceId ??
      parsedLineItem?.stripe_price_id ??
      parsedLineItem?.price;
    const { quantity } = parsedLineItem ?? {};

    if (
      !parsedLineItem ||
      typeof stripePriceId !== "string" ||
      !stripePriceId.trim() ||
      typeof quantity !== "number" ||
      !Number.isInteger(quantity) ||
      quantity < 1
    ) {
      return NextResponse.json(
        {
          error:
            "Each item must have a valid stripePriceId and a positive integer quantity",
        },
        { status: 400 },
      );
    }
    lineItems.push({
      stripePriceId: stripePriceId.trim(),
      quantity,
    });
  }

  if (lineItems.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  try {
    const configuredSiteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    const origin = new URL(configuredSiteUrl).origin;

    const session = await createCheckoutSession(lineItems, origin);
    return NextResponse.json({
      url: session.url,
      checkout_session: {
        id: session.id,
        url: session.url,
      },
    });
  } catch (stripeError) {
    console.error("Stripe checkout error:", stripeError);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 },
    );
  }
}
