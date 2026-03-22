import { NextRequest, NextResponse } from "next/server";
import { createConnectOnboardingLink } from "@/lib/stripe-connect";

/**
 * POST /api/connect/accounts/onboarding-link
 *
 * Creates a V2 account link for account onboarding.
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
    const accountLink = await createConnectOnboardingLink(accountId);
    return NextResponse.json({ url: accountLink.url });
  } catch (error) {
    console.error("Failed to create account onboarding link:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create onboarding link." },
      { status: 500 },
    );
  }
}
