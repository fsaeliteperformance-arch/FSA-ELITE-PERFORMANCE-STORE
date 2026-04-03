import { NextRequest, NextResponse } from "next/server";
import { createSubscriptionCheckoutSession } from "@/lib/stripe-connect";

/**
 * POST /api/connect/subscriptions/checkout
 *
 * Starts a platform-level subscription checkout flow using customer_account
 * set to the connected account ID (acct_...).
 */
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const accountId =
    body && typeof body === "object" && typeof (body as { accountId?: unknown }).accountId === "string"
      ? (body as { accountId: string }).accountId.trim()
      : "";

  if (!accountId) {
    return NextResponse.json({ error: "accountId is required." }, { status: 400 });
  }

  try {
    const session = await createSubscriptionCheckoutSession(accountId);
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Failed to create subscription checkout session:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create subscription checkout session.",
      },
      { status: 500 },
    );
  }
}
