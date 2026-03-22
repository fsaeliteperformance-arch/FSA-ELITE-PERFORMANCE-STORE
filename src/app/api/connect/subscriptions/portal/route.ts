import { NextRequest, NextResponse } from "next/server";
import { createBillingPortalSession } from "@/lib/stripe-connect";

/**
 * POST /api/connect/subscriptions/portal
 *
 * Creates a billing portal session for managing the connected account's
 * platform-level subscription.
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
    const session = await createBillingPortalSession(accountId);
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Failed to create billing portal session:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to create billing portal session.",
      },
      { status: 500 },
    );
  }
}
