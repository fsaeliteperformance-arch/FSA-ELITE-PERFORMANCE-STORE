import { NextRequest, NextResponse } from "next/server";
import { BillingEvent, constructStripeBillingEvent } from "@/lib/stripe-connect";

function handleSubscriptionUpdated(event: BillingEvent) {
  // customer_account is the acct_ ID for V2 account-based billing flows.
  const subscription = event.data.object as { customer_account?: string };
  const accountId = subscription.customer_account;

  // TODO: Persist subscription changes (plan, quantity, pause state, cancel_at_period_end)
  // in your database, keyed by accountId and subscription ID.
  return { accountId };
}

/**
 * POST /api/webhooks/stripe-billing
 *
 * Handles non-thin billing events for subscriptions and portal/customer updates.
 */
export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header." },
      { status: 400 },
    );
  }

  const rawBody = await req.text();

  try {
    const event = constructStripeBillingEvent(rawBody, signature);

    switch (event.type) {
      case "customer.subscription.updated": {
        handleSubscriptionUpdated(event);
        break;
      }
      case "customer.subscription.deleted": {
        // TODO: Revoke customer access in your DB for this subscription/account.
        break;
      }
      case "payment_method.attached": {
        // TODO: Update stored billing metadata in your DB if needed.
        break;
      }
      case "payment_method.detached": {
        // TODO: Update stored billing metadata in your DB if needed.
        break;
      }
      case "customer.updated": {
        // TODO: Sync billing-only customer profile changes to your DB.
        break;
      }
      case "customer.tax_id.created":
      case "customer.tax_id.updated":
      case "customer.tax_id.deleted": {
        // TODO: Sync tax ID status updates into your DB for billing records.
        break;
      }
      case "billing_portal.configuration.created":
      case "billing_portal.configuration.updated":
      case "billing_portal.session.created": {
        // TODO: Optionally log these events in your DB for auditing.
        break;
      }
      default: {
        // Intentionally ignore unrelated events.
        break;
      }
    }

    return NextResponse.json({ received: true, eventType: event.type });
  } catch (error) {
    console.error("Failed to process billing webhook event:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to process billing webhook event.",
      },
      { status: 400 },
    );
  }
}
