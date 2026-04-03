# Payments — Stripe & Shopify Setup Guide

## Overview
This guide covers everything you need to start accepting payments for FSA Elite Performance's digital courses and merchandise.  
No developer required. All steps use GUI dashboards unless noted.

> **Compliance reference:** Review your Stripe account's ecommerce compliance requirements at:  
> https://dashboard.stripe.com/acct_1T4wxs7Ssw0Qx6df/settings/compliance/ecommerce/complete  
> Complete all required compliance items before going live with real customer charges.

---

## 1. Stripe Payment Links (Digital Courses & Merch Fallback)

### What Are Payment Links?
Stripe Payment Links let you accept payments with zero code. You create a link in the Stripe Dashboard and share it — Stripe handles checkout, receipts, and confirmation emails automatically.

### Creating a Payment Link (Step-by-Step)
1. Log in to the [Stripe Dashboard](https://dashboard.stripe.com).
2. Navigate to **Products → Payment Links → + New link**.
3. Click **+ Add a product** and either select an existing product or create a new one on the fly.
4. Set the **price** (one-time or subscription).
5. Optionally enable:
   - **Collect phone numbers** (for course delivery SMS)
   - **Allow customers to adjust quantity** (for team orders)
   - **Custom success URL** (redirect to your member portal after payment)
6. Click **Create link**.
7. Copy the URL (e.g., `https://buy.stripe.com/xxxxx`) and store it as the matching environment variable:

| Course / Product | Env Var |
|---|---|
| Objection Masterclass ($197) | `STRIPE_PAYMENT_LINK_COURSE_01` |
| Sales Playbook Starter ($147) | `STRIPE_PAYMENT_LINK_COURSE_02` |
| Micro-Coaching Subscription ($49/month) | `STRIPE_PAYMENT_LINK_COURSE_03` |
| Merch Starter Bundle ($79) | `STRIPE_PAYMENT_LINK_MERCH_BUNDLE` |

---

## 2. Pricing Strategies

### One-Time Payments
Best for: Objection Masterclass, Sales Playbook Starter, Tee, Workbook  
- Set as a **one-time price** in Stripe Products.
- No recurring billing complexity.
- Create a separate Payment Link per product.

### Subscriptions (Recurring)
Best for: Micro-Coaching Subscription ($49/month)  
1. In Stripe Dashboard → **Products → + Add product**.
2. Set price type to **Recurring** → **Monthly**.
3. Stripe handles retries, dunning, and cancellations automatically.
4. Enable **Customer Portal** (Stripe Dashboard → Settings → Billing → Customer portal) so subscribers can cancel themselves.

### Bundles
Best for: Starter Bundle ($79)  
- Option A: Create a single Stripe product priced at $79 that manually fulfils both items.
- Option B: Use Shopify's bundle feature (recommended for physical products with variants).
- Option C: Create a Stripe Coupon for $5 off and apply it at checkout.

---

## 3. Shopify Integration

### Setup
1. Create a Shopify account at [shopify.com](https://shopify.com).
2. Add the three merch products (Tee, Workbook, Bundle) using the specs in `stores/merch-resources/products/`.
3. Enable **Shopify Payments** to accept cards without a third-party gateway.
4. Or add Stripe as a third-party payment provider (Shopify Settings → Payments → Third-party providers → Stripe).

> **Note:** Using Stripe as a third-party gateway on Shopify incurs a 0.5–2% transaction fee from Shopify on top of Stripe fees. Use Shopify Payments where available to eliminate this fee.

### Shopify Pricing Settings
- Set currency to **USD** (or your primary market currency).
- Enable **automatic tax calculation** (Shopify Settings → Taxes and duties).
- For physical goods shipped to US customers, Shopify Payments automatically handles US sales tax nexus.

---

## 4. Taxes

| Product Type | Tax Treatment |
|---|---|
| Digital courses (US) | Generally taxable in states with digital goods tax (e.g., WA, NY). Consult a tax advisor. |
| Digital courses (EU) | VAT applies. Stripe Tax can automate this — enable in Stripe Dashboard → Tax. |
| Physical merch (US) | Sales tax applies based on nexus. Use Shopify's built-in tax engine. |
| Physical merch (International) | Customs duties apply. Enable **Duties & Taxes** in Shopify for DDP pricing. |

> **Recommended:** Enable [Stripe Tax](https://stripe.com/tax) for digital products (automatically calculates and collects tax in all required jurisdictions). Cost: 0.5% of tax-enabled transactions.

---

## 5. Testing Checklist

Before going live, complete all items below in **test mode**:

### Stripe Test Mode
- [ ] Create test Payment Links for each product
- [ ] Complete a test purchase using card number `4242 4242 4242 4242`, any future expiry, any CVC
- [ ] Confirm Stripe Dashboard shows a test payment
- [ ] Confirm customer receives confirmation email
- [ ] Test a subscription sign-up and cancellation via Customer Portal
- [ ] Test a failed payment using card `4000 0000 0000 9995` (insufficient funds)
- [ ] Verify webhook events fire correctly (if using webhooks)

### Shopify Test Mode
- [ ] Place a test order using Shopify's Bogus Gateway
- [ ] Confirm order confirmation email is sent
- [ ] Confirm Printful/Printify receives the order and shows a test fulfilment
- [ ] Test refund flow in Shopify admin

### Go-Live Checklist
- [ ] Complete Stripe compliance requirements (link above)
- [ ] Switch Stripe from test mode to live mode
- [ ] Replace test Payment Link URLs with live URLs in `landing.html`
- [ ] Set real Shopify Payment credentials
- [ ] Enable Stripe Tax or consult a tax advisor
- [ ] Add Terms of Service and Privacy Policy links to checkout
- [ ] Test a real $1 transaction before full launch
