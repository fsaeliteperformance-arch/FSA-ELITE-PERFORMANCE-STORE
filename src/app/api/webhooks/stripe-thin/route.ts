import { NextRequest, NextResponse } from "next/server";
import { parseStripeThinEvent, retrieveThinEventById } from "@/lib/stripe-connect";

/**
 * POST /api/webhooks/stripe-thin
 *
 * Handles thin events for V2 account updates. Thin events only include a small
 * payload, so we retrieve the full event from Stripe after signature validation.
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
    // Parse and verify the thin event payload.
    const thinEvent = parseStripeThinEvent(rawBody, signature);

    // Retrieve the expanded event object so we can inspect details.
    const event = await retrieveThinEventById(thinEvent.id);

    const eventType = String(event.type);

    switch (eventType) {
      case "v2.core.account[requirements].updated": {
        // TODO: Write updated requirements details to your database.
        // Example: save event.data.object.id + requirements summary/status.
        break;
      }
      case "v2.core.account[configuration.merchant].capability_status_updated": {
        // TODO: Persist merchant capability changes for account access control.
        break;
      }
      case "v2.core.account[configuration.customer].capability_status_updated": {
        // TODO: Persist customer capability changes for account access control.
        break;
      }
      case "v2.core.account[.recipient].capability_status_updated": {
        // TODO: Persist recipient capability changes if recipient config is used.
        break;
      }
      case "v2.core.account[configuration.recipient].capability_status_updated": {
        // TODO: Persist recipient capability changes if recipient config is used.
        break;
      }
      default: {
        // Keep unknown event types as no-ops for forward compatibility.
        break;
      }
    }

    return NextResponse.json({ received: true, eventType });
  } catch (error) {
    console.error("Failed to process thin webhook event:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to process thin webhook event.",
      },
      { status: 400 },
    );
  }
}
