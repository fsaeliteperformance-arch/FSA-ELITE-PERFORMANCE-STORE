import { NextRequest, NextResponse } from "next/server";
import { createConnectedAccountCheckoutSession } from "@/lib/stripe-connect";

/**
 * POST /api/connect/checkout
 *
 * Creates a direct-charge hosted checkout session on the connected account and
 * applies a sample application fee.
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
        productId?: unknown;
        quantity?: unknown;
      }
    | undefined;

  const quantity =
    typeof payload?.quantity === "number" && Number.isInteger(payload.quantity)
      ? payload.quantity
      : 1;

  if (
    !payload ||
    typeof payload.accountId !== "string" ||
    !payload.accountId.trim() ||
    typeof payload.productId !== "string" ||
    !payload.productId.trim() ||
    quantity < 1
  ) {
    return NextResponse.json(
      { error: "accountId, productId, and positive integer quantity are required." },
      { status: 400 },
    );
  }

  try {
    const session = await createConnectedAccountCheckoutSession({
      accountId: payload.accountId.trim(),
      productId: payload.productId.trim(),
      quantity,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Failed to create connected account checkout session:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to create checkout session.",
      },
      { status: 500 },
    );
  }
}
