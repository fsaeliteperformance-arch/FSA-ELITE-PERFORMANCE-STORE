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
 * • We validate that every requested productId exists in the server-side
 *   catalogue and every quantity is a positive integer before creating the
 *   Checkout Session.
 * • The request body size is implicitly bounded by Next.js defaults (1 MB).
 */

import { NextRequest, NextResponse } from "next/server";
import { getProductById } from "@/lib/products";
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

  // Validate each line item against the server-side catalogue before sending
  // any data to Stripe.
  const lineItems: CheckoutLineItem[] = [];
  for (const rawLineItem of requestLineItems) {
    const parsedLineItem =
      rawLineItem && typeof rawLineItem === "object"
        ? (rawLineItem as {
            productId?: unknown;
            quantity?: unknown;
          })
        : null;
    const { productId, quantity } = parsedLineItem ?? {};

    if (
      !parsedLineItem ||
      typeof productId !== "string" ||
      !productId.trim() ||
      typeof quantity !== "number" ||
      !Number.isInteger(quantity) ||
      quantity < 1
    ) {
      return NextResponse.json(
        {
          error:
            "Each item must have a valid productId and a positive integer quantity",
        },
        { status: 400 },
      );
    }

    const product = await getProductById(productId.trim());
    if (!product || !product.inStock) {
      return NextResponse.json(
        { error: "Each item must reference an in-stock product" },
        { status: 400 },
      );
    }

    lineItems.push({
      name: product.name,
      description: product.description,
      imageUrl: product.imageUrl,
      unitAmount: product.price,
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
    return NextResponse.json({ url: session.url });
  } catch (stripeError) {
    console.error("Stripe checkout error:", stripeError);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 },
    );
  }
}
