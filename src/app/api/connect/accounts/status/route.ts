import { NextRequest, NextResponse } from "next/server";
import { getConnectedAccountStatus } from "@/lib/stripe-connect";

/**
 * GET /api/connect/accounts/status?accountId=acct_...
 *
 * For demo correctness, this always fetches status directly from Stripe
 * instead of reading cached status from local storage or a database.
 */
export async function GET(req: NextRequest) {
  const accountId = req.nextUrl.searchParams.get("accountId")?.trim();
  if (!accountId) {
    return NextResponse.json(
      { error: "Query parameter accountId is required." },
      { status: 400 },
    );
  }

  try {
    const status = await getConnectedAccountStatus(accountId);
    return NextResponse.json(status);
  } catch (error) {
    console.error("Failed to fetch account status:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch account status.",
      },
      { status: 500 },
    );
  }
}
