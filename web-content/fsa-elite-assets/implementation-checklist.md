# FSA Elite Sales Training — Technical Implementation Checklist

**Brand:** FSA Elite Sales Training | FSA Elite Sales App  
**Entity:** Fontenots Sales Association LLC  
**Owner:** Kaygun Fontenot  
**Document Type:** Technical Implementation Checklist  

---

## Phase 1 — Affiliate Platform Setup

- [ ] Select and provision affiliate tracking platform (e.g., Rewardful, PartnerStack, Tapfiliate, or custom)
- [ ] Configure platform account with Fontenots Sales Association LLC billing and legal details
- [ ] Set cookie window to **30 days**, attribution model to **last-click**
- [ ] Enable email verification for all new affiliate sign-ups
- [ ] Create affiliate tiers matching commission schedule:
  - Tier 1: FSA Elite Sales Training Course — 20%
  - Tier 2: FSA Elite Sales App Starter Pack — 15%
  - Tier 3: FSA Elite Sales App Growth Pack — 20%
  - Tier 4: FSA Elite Sales App Performance Pack — 25%
- [ ] Configure minimum payout threshold: **$50.00 USD**
- [ ] Set payment schedule: **monthly, on or before the 15th**
- [ ] Enable PayPal, ACH, and international wire payment methods
- [ ] Set up affiliate portal branded with FSA Elite Sales Training identity
- [ ] Upload approved brand assets (logos, banners, swipe copy) to affiliate portal
- [ ] Publish affiliate policy link in portal: https://yourdomain.com/affiliate-policy

---

## Phase 2 — Product Entries

- [ ] Create product entry: **FSA Elite Sales Training Course**
  - Set price, SKU, and tax category
  - Attach commission rule: 20%
  - Link to product page copy (see product-pages.md)
- [ ] Create product entry: **FSA Elite Sales App — Starter Pack**
  - Set price, SKU, and subscription interval
  - Attach commission rule: 15%
- [ ] Create product entry: **FSA Elite Sales App — Growth Pack**
  - Set price, SKU, and subscription interval
  - Attach commission rule: 20%
- [ ] Create product entry: **FSA Elite Sales App — Performance Pack**
  - Set price, SKU, and subscription interval
  - Attach commission rule: 25%
- [ ] Verify all product prices display correctly in checkout (no broken formatting)
- [ ] Test purchase flow end-to-end for each product in staging environment
- [ ] Confirm tax handling is configured per jurisdiction requirements

---

## Phase 3 — Webhooks & Integrations

- [ ] Configure Stripe webhook endpoint for payment events:
  - `payment_intent.succeeded`
  - `checkout.session.completed`
  - `invoice.payment_succeeded`
  - `charge.refunded`
  - `customer.subscription.deleted`
- [ ] Register webhook secret in environment variables (do not commit to source control)
- [ ] Implement webhook signature verification on all incoming Stripe events
- [ ] Connect Stripe webhook to affiliate platform to trigger commission on `checkout.session.completed`
- [ ] Connect refund/chargeback events to affiliate platform to trigger commission clawback
- [ ] Set up CRM integration (e.g., email marketing platform) to add customers to post-purchase nurture sequences
- [ ] Configure FSA Elite Sales App subscription management webhooks if separate from Stripe
- [ ] Test all webhook events end-to-end in Stripe test mode before going live
- [ ] Enable webhook event logging for audit and debugging

---

## Phase 4 — Third-Party Integrations

- [ ] **Email Marketing Platform** (e.g., ActiveCampaign, Klaviyo, ConvertKit):
  - Connect to purchase events for post-purchase nurture triggers
  - Map customer tags: `course-buyer`, `app-starter`, `app-growth`, `app-performance`
  - Set up cart abandonment trigger (30-minute delay after cart creation with no purchase)
  - Set up trial-to-paid conversion sequence trigger
- [ ] **CRM** (if separate from email platform):
  - Sync customer records on purchase
  - Tag affiliate-referred customers with affiliate ID for reporting
- [ ] **Analytics**:
  - Install Google Analytics 4 (or equivalent) with ecommerce events enabled
  - Track `purchase`, `begin_checkout`, `add_to_cart`, `view_item` events
  - Enable affiliate source attribution in UTM parameters
- [ ] **Chat / In-App Messaging** (e.g., Intercom, Crisp, Drift):
  - Install on fsaeliteperformance.com
  - Configure onboarding script (see chat-onboarding.md)
  - Set up lead capture automations
  - Configure affiliate disclosure message in chat (required)

---

## Phase 5 — Payout Setup

- [ ] Verify PayPal Business account is connected and verified
- [ ] Set up ACH direct deposit details for US affiliate payouts
- [ ] Confirm international wire instructions and fee handling
- [ ] Complete internal KYB (Know Your Business) and AML requirements for payout processor
- [ ] Set automated payout run on or before the **15th of each month**
- [ ] Enable payout notifications to affiliates via email
- [ ] Configure W-9 / W-8BEN collection gate in affiliate portal (required before first payout)
- [ ] Test payout flow with a test affiliate account before live launch

---

## Phase 6 — Brand Approvals Workflow

- [ ] Set up brand approval intake form or email workflow:
  - Affiliates submit: contact name, content type, draft creative/copy, publishing channel and date
  - Auto-acknowledgment email sent within 1 business day
  - Review and respond within 5 business days
  - Approval/rejection sent in writing by Kaygun Fontenot or designated representative
- [ ] Create internal brand review checklist covering:
  - FTC disclosure present and correctly placed
  - No unauthorized income claims or earnings guarantees
  - No brand keyword bidding in paid search (unless approved)
  - Logo used correctly per brand guidelines
  - No merchandise without separate written approval
- [ ] Document approved creatives in an internal log (affiliate name, content type, approval date, expiry)
- [ ] Set reminder to review and renew approvals annually or when brand guidelines update
- [ ] Publish brand guidelines document and make available via affiliate portal

---

## Phase 7 — Pre-Launch Verification

- [ ] All Stripe webhooks verified in test mode — no errors
- [ ] Affiliate tracking links generate correctly and fire conversion on test purchase
- [ ] Commissions appear in affiliate dashboard within 5 minutes of test purchase
- [ ] Refund flow triggers commission clawback correctly
- [ ] Payout calculation is accurate (net sale, correct commission rate per product)
- [ ] All product pages load correctly on fsaeliteperformance.com
- [ ] Checkout pages display correct prices with no formatting errors
- [ ] FTC disclosures are present on all affiliate-facing promotional materials in portal
- [ ] Brand approval workflow tested with a mock submission
- [ ] Onboarding email tested and renders correctly across major email clients
- [ ] Legal review of affiliate policy completed by Fontenots Sales Association LLC counsel
- [ ] Kaygun Fontenot final sign-off obtained before launch

---

*© Fontenots Sales Association LLC. All rights reserved. Authorized by Kaygun Fontenot.*
