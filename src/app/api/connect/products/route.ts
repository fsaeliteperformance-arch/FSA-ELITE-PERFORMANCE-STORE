import { NextRequest, NextResponse } from "next/server";
import { createConnectedAccountProduct } from "@/lib/stripe-connect";

/**
 * POST /api/connect/products
 *
 * Creates a product + default price directly on the connected account using the
 * Stripe-Account header under the hood.
 */
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const payload = body as
    | {
        accountId?: unknown;
        name?: unknown;
        description?: unknown;
        priceInCents?: unknown;
        currency?: unknown;
      }
    | undefined;

  if (
    !payload ||
    typeof payload.accountId !== "string" ||
    !payload.accountId.trim() ||
    typeof payload.name !== "string" ||
    !payload.name.trim() ||
    typeof payload.priceInCents !== "number" ||
    !Number.isInteger(payload.priceInCents) ||
    payload.priceInCents < 1 ||
    typeof payload.currency !== "string" ||
    !payload.currency.trim()
  ) {
    return NextResponse.json(
      {
        error:
          "accountId, name, positive integer priceInCents, and currency are required.",
      },
      { status: 400 },
    );
  }

  try {
    const product = await createConnectedAccountProduct({
      accountId: payload.accountId.trim(),
      name: payload.name.trim(),
      description:
        typeof payload.description === "string" ? payload.description.trim() : undefined,
      priceInCents: payload.priceInCents,
      currency: payload.currency.trim(),
    });

    return NextResponse.json({ product });
  } catch (error) {
    console.error("Failed to create connected account product:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to create product.",
      },
      { status: 500 },
    );
  }
}
