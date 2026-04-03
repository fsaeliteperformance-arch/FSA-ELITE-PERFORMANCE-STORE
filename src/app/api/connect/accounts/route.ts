import { NextRequest, NextResponse } from "next/server";
import { createConnectedAccount, getDemoMappedAccountForUser } from "@/lib/stripe-connect";

/**
 * POST /api/connect/accounts
 *
 * Creates a Stripe Connect V2 account using only the required fields from the
 * integration guide. Optionally stores an in-memory user -> account mapping
 * for this demo.
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
        displayName?: unknown;
        contactEmail?: unknown;
        userId?: unknown;
      }
    | undefined;

  if (
    !payload ||
    typeof payload.displayName !== "string" ||
    !payload.displayName.trim() ||
    typeof payload.contactEmail !== "string" ||
    !payload.contactEmail.trim()
  ) {
    return NextResponse.json(
      {
        error:
          "displayName and contactEmail are required. Example: { \"displayName\": \"Demo Seller\", \"contactEmail\": \"seller@example.com\" }",
      },
      { status: 400 },
    );
  }

  try {
    const account = await createConnectedAccount({
      displayName: payload.displayName.trim(),
      contactEmail: payload.contactEmail.trim(),
      userId: typeof payload.userId === "string" ? payload.userId.trim() : undefined,
    });

    return NextResponse.json({ accountId: account.id, account });
  } catch (error) {
    console.error("Failed to create connected account:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create connected account.",
      },
      { status: 500 },
    );
  }
}

/**
 * GET /api/connect/accounts?userId=...
 *
 * Returns the demo in-memory mapping for quick local testing.
 * TODO: Replace this with a database lookup in production.
 */
export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId")?.trim();
  if (!userId) {
    return NextResponse.json(
      { error: "Query parameter userId is required." },
      { status: 400 },
    );
  }

  return NextResponse.json({ accountId: getDemoMappedAccountForUser(userId) });
}
