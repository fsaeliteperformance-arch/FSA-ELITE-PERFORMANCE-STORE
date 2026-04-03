import { NextRequest, NextResponse } from "next/server";
import { listConnectedAccountProducts } from "@/lib/stripe-connect";

/**
 * GET /api/connect/storefront?accountId=acct_...
 *
 * Returns connected-account products for rendering a sample storefront.
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
    const products = await listConnectedAccountProducts(accountId);
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Failed to list connected account products:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to list products.",
      },
      { status: 500 },
    );
  }
}
