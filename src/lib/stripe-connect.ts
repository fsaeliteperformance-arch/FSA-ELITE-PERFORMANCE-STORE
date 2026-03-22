import Stripe from "stripe";
import { stripeClient } from "@/lib/stripe";
import { getUserConnectedAccount, setUserConnectedAccount } from "@/lib/connect-demo-store";

function getRequiredEnvVar(envVarName: string, placeholderHint: string) {
  const value = process.env[envVarName]?.trim();
  if (!value) {
    throw new Error(`Missing ${envVarName} environment variable. ${placeholderHint}`);
  }
  return value;
}

function getBaseUrl() {
  return getRequiredEnvVar(
    "NEXT_PUBLIC_SITE_URL",
    "Set NEXT_PUBLIC_SITE_URL in .env.local, for example: NEXT_PUBLIC_SITE_URL=http://localhost:3000",
  );
}

/**
 * Creates a V2 connected account with only the required properties.
 */
export async function createConnectedAccount(params: {
  displayName: string;
  contactEmail: string;
  userId?: string;
}) {
  const account = await stripeClient.v2.core.accounts.create({
    display_name: params.displayName,
    contact_email: params.contactEmail,
    identity: {
      country: "us",
    },
    dashboard: "full",
    defaults: {
      responsibilities: {
        fees_collector: "stripe",
        losses_collector: "stripe",
      },
    },
    configuration: {
      customer: {},
      merchant: {
        capabilities: {
          card_payments: {
            requested: true,
          },
        },
      },
    },
  });

  if (params.userId) {
    // Demo-only mapping. TODO: Persist userId -> account.id in your real database.
    setUserConnectedAccount(params.userId, account.id);
  }

  return account;
}

/**
 * Returns onboarding status by querying Stripe directly each time.
 */
export async function getConnectedAccountStatus(accountId: string) {
  const account = await stripeClient.v2.core.accounts.retrieve(accountId, {
    include: ["configuration.merchant", "requirements"],
  });

  const readyToProcessPayments =
    account?.configuration?.merchant?.capabilities?.card_payments?.status === "active";

  const requirementsStatus = account.requirements?.summary?.minimum_deadline?.status ?? null;

  const onboardingComplete =
    requirementsStatus !== "currently_due" && requirementsStatus !== "past_due";

  return {
    account,
    readyToProcessPayments,
    requirementsStatus,
    onboardingComplete,
  };
}

export async function createConnectOnboardingLink(accountId: string) {
  const baseUrl = getBaseUrl();
  const refreshUrl = `${baseUrl}/connect/dashboard?accountId=${encodeURIComponent(accountId)}&refresh=1`;
  const returnUrl = `${baseUrl}/connect/dashboard?accountId=${encodeURIComponent(accountId)}&returned=1`;

  return stripeClient.v2.core.accountLinks.create({
    account: accountId,
    use_case: {
      type: "account_onboarding",
      account_onboarding: {
        configurations: ["merchant", "customer"],
        refresh_url: refreshUrl,
        return_url: returnUrl,
      },
    },
  });
}

export async function createConnectedAccountProduct(params: {
  accountId: string;
  name: string;
  description?: string;
  priceInCents: number;
  currency: string;
}) {
  return stripeClient.products.create(
    {
      name: params.name,
      description: params.description,
      default_price_data: {
        unit_amount: params.priceInCents,
        currency: params.currency.toLowerCase(),
      },
    },
    {
      // This sets the Stripe-Account header for connected-account scoping.
      stripeAccount: params.accountId,
    },
  );
}

export async function listConnectedAccountProducts(accountId: string) {
  return stripeClient.products.list(
    {
      limit: 20,
      active: true,
      expand: ["data.default_price"],
    },
    {
      // This sets the Stripe-Account header for connected-account scoping.
      stripeAccount: accountId,
    },
  );
}

export async function createConnectedAccountCheckoutSession(params: {
  accountId: string;
  productId: string;
  quantity: number;
}) {
  const baseUrl = getBaseUrl();
  const boundedQuantity = Math.min(Math.max(params.quantity, 1), 10);

  const product = await stripeClient.products.retrieve(
    params.productId,
    {
      expand: ["default_price"],
    },
    {
      stripeAccount: params.accountId,
    },
  );

  const defaultPrice = product.default_price;
  if (!defaultPrice || typeof defaultPrice === "string") {
    throw new Error("This product has no default price configured on the connected account.");
  }

  const unitAmount = defaultPrice.unit_amount;
  if (typeof unitAmount !== "number") {
    throw new Error("The connected account product default price does not have unit_amount.");
  }

  return stripeClient.checkout.sessions.create(
    {
      line_items: [
        {
          price_data: {
            currency: defaultPrice.currency,
            product_data: {
              name: product.name ?? "Product",
              description: product.description ?? undefined,
            },
            unit_amount: unitAmount,
          },
          quantity: boundedQuantity,
        },
      ],
      payment_intent_data: {
        // Sample platform fee so the platform can monetize direct charges.
        application_fee_amount: 123,
      },
      mode: "payment",
      success_url: `${baseUrl}/connect/success?session_id={CHECKOUT_SESSION_ID}&accountId=${encodeURIComponent(
        params.accountId,
      )}`,
      cancel_url: `${baseUrl}/connect/storefront/${encodeURIComponent(params.accountId)}`,
    },
    {
      // Direct charge on connected account via Stripe-Account header.
      stripeAccount: params.accountId,
    },
  );
}

export async function createSubscriptionCheckoutSession(accountId: string) {
  const baseUrl = getBaseUrl();
  const priceId = getRequiredEnvVar(
    "PRICE_ID",
    "Set PRICE_ID in .env.local with a recurring Price ID, for example: PRICE_ID=price_***",
  );

  return stripeClient.checkout.sessions.create({
    customer_account: accountId,
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${baseUrl}/connect/dashboard?accountId=${encodeURIComponent(
      accountId,
    )}&subscription=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/connect/dashboard?accountId=${encodeURIComponent(accountId)}&subscription=cancel`,
  });
}

export async function createBillingPortalSession(accountId: string) {
  const baseUrl = getBaseUrl();
  return stripeClient.billingPortal.sessions.create({
    customer_account: accountId,
    return_url: `${baseUrl}/connect/dashboard?accountId=${encodeURIComponent(accountId)}`,
  });
}

export function getDemoMappedAccountForUser(userId: string) {
  return getUserConnectedAccount(userId);
}

export function parseStripeThinEvent(rawBody: string, signature: string) {
  const webhookSecret = getRequiredEnvVar(
    "STRIPE_CONNECT_THIN_WEBHOOK_SECRET",
    "Set STRIPE_CONNECT_THIN_WEBHOOK_SECRET in .env.local, for example: STRIPE_CONNECT_THIN_WEBHOOK_SECRET=whsec_***",
  );

  return stripeClient.parseEventNotification(rawBody, signature, webhookSecret);
}

export function constructStripeBillingEvent(rawBody: string, signature: string) {
  const webhookSecret = getRequiredEnvVar(
    "STRIPE_BILLING_WEBHOOK_SECRET",
    "Set STRIPE_BILLING_WEBHOOK_SECRET in .env.local, for example: STRIPE_BILLING_WEBHOOK_SECRET=whsec_***",
  );

  return stripeClient.webhooks.constructEvent(rawBody, signature, webhookSecret);
}

export async function retrieveThinEventById(eventId: string) {
  return stripeClient.v2.core.events.retrieve(eventId);
}

export type BillingEvent = Stripe.Event;
