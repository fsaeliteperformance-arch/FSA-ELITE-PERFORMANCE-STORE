# FSA Elite Sales Training — Inputs Checklist & Decision Checkboxes

**Brand:** FSA Elite Sales Training | FSA Elite Sales App  
**Entity:** Fontenots Sales Association LLC  
**Owner & Decision Authority:** Kaygun Fontenot  

---

> **Purpose:** This checklist captures all required inputs and key decisions needed to complete the FSA Elite Sales Training and FSA Elite Sales App launch. Review each item with Kaygun Fontenot before proceeding. Items marked with **[DECISION]** require an explicit choice. Items marked **[DEFAULT]** have a recommended default that applies unless overridden.

---

## Section 1 — Brand & Legal Inputs

- [ ] **[INPUT]** Confirm legal entity name on file: **Fontenots Sales Association LLC** *(verify with registered documents)*
- [ ] **[INPUT]** Confirm owner/author credit for all content: **Kaygun Fontenot** *(confirm spelling and preferred title)*
- [ ] **[INPUT]** Confirm canonical brand names:
  - "FSA Elite Sales Training" ✓
  - "FSA Elite Sales App" ✓
  - "Fontenots Sales Association LLC" ✓
- [ ] **[INPUT]** Confirm affiliate policy URL: `https://yourdomain.com/affiliate-policy` *(replace with live URL before launch)*
- [ ] **[INPUT]** Legal review of affiliate-policy.md completed by counsel? *(Required before launch)*
- [ ] **[INPUT]** Registered state of Fontenots Sales Association LLC *(for governing law clause in affiliate policy)*

---

## Section 2 — Pricing Inputs

All prices below are placeholders. Kaygun Fontenot must confirm final pricing before content is published.

- [ ] **[DECISION]** FSA Elite Sales Training Course — One-Time Price: `$_______`
- [ ] **[DECISION]** FSA Elite Sales Training Course — Payment Plan: `$_______ × _______ months`
- [ ] **[DECISION]** FSA Elite Sales App — Starter Pack — Monthly Price: `$_______/month`
- [ ] **[DECISION]** FSA Elite Sales App — Starter Pack — Annual Price: `$_______/year`
- [ ] **[DECISION]** FSA Elite Sales App — Growth Pack — Monthly Price: `$_______/month`
- [ ] **[DECISION]** FSA Elite Sales App — Growth Pack — Annual Price: `$_______/year`
- [ ] **[DECISION]** FSA Elite Sales App — Performance Pack — Monthly Price: `$_______/month`
- [ ] **[DECISION]** FSA Elite Sales App — Performance Pack — Annual Price: `$_______/year`
- [ ] **[DECISION]** Annual plan discount percentage to display on pricing page: `_______% off`

---

## Section 3 — Free Trial Decision

- [ ] **[DECISION]** Offer a free trial on app plans? `Yes / No`
  - **[DEFAULT]** Yes — 7-day free trial on Starter and Growth plans, no credit card required.
- [ ] **[DECISION]** Trial length: `_______ days`
- [ ] **[DECISION]** Credit card required to start trial? `Yes / No`
  - **[DEFAULT]** No credit card required.
- [ ] **[DECISION]** Free trial available on Performance plan? `Yes / No`
  - **[DEFAULT]** No — Performance plan requires direct contact/demo.

---

## Section 4 — Refund & Guarantee Policy

- [ ] **[DECISION]** Course refund window: `_______ days`
  - **[DEFAULT]** 14 days.
- [ ] **[DECISION]** App subscription refund window: `_______ days`
  - **[DEFAULT]** 7 days.
- [ ] **[DECISION]** Refund policy conditions (e.g., must complete X% of course): `_______________________`
  - **[DEFAULT]** No conditions — satisfaction guarantee, contact support team within window.

---

## Section 5 — Affiliate Program Configuration

- [ ] **[DECISION]** Affiliate platform selection: `_______________________`
  - **[DEFAULT]** Rewardful (integrates with Stripe; recommended for simplicity).
- [ ] **[DECISION]** Cookie window: `_______ days`
  - **[DEFAULT]** 30 days.
- [ ] **[DECISION]** Attribution model: `_______________________`
  - **[DEFAULT]** Last-click.
- [ ] **[DECISION]** Recurring commissions offered? `Yes / No`
  - **[DEFAULT]** No — commission on initial term only unless separate addendum signed by Kaygun Fontenot.
- [ ] **[DECISION]** Payout threshold: `$_______`
  - **[DEFAULT]** $50.00 USD.
- [ ] **[DECISION]** Payout day of month: `_______ th`
  - **[DEFAULT]** On or before the 15th.
- [ ] **[INPUT]** PayPal Business account email for affiliate payouts: `_______________________`
- [ ] **[INPUT]** ACH bank details for US payout processing: `_______________________` *(store securely — do not commit to source control)*

---

## Section 6 — Coaching & Community

- [ ] **[DECISION]** Group coaching call frequency: `Monthly / Bi-monthly / Other: _______`
  - **[DEFAULT]** Monthly.
- [ ] **[DECISION]** Group coaching call platform: `Zoom / Google Meet / Other: _______`
  - **[DEFAULT]** Zoom.
- [ ] **[DECISION]** 1-on-1 coaching session length (Performance plan): `_______ minutes`
  - **[DEFAULT]** 30 minutes.
- [ ] **[INPUT]** Community platform (for student/member community): `_______________________`
  - **[DEFAULT]** Circle (integrate with course platform).
- [ ] **[INPUT]** Community URL to include in onboarding emails: `_______________________`

---

## Section 7 — Technical & Hosting

- [ ] **[INPUT]** Confirm hosting environment: `Vercel / VPS / Other: _______`
- [ ] **[INPUT]** Confirm Stripe account mode: `Live / Test` *(must confirm before launch)*
- [ ] **[INPUT]** `STRIPE_SECRET_KEY` — stored in environment variables? `Yes / No`
- [ ] **[INPUT]** `STRIPE_WEBHOOK_SECRET` — stored in environment variables? `Yes / No`
- [ ] **[INPUT]** `NEXT_PUBLIC_SITE_URL` set to `https://fsaeliteperformance.com`? `Yes / No`
- [ ] **[DECISION]** Canonical hostname: `fsaeliteperformance.com (apex)` *(confirmed as per prior conversation)*
- [ ] **[INPUT]** TLS certificate installed and valid? `Yes / No`
- [ ] **[DECISION]** Chat platform for onboarding automations: `Intercom / Crisp / Drift / Other: _______`

---

## Section 8 — Analytics & A/B Testing

- [ ] **[DECISION]** Analytics platform: `Google Analytics 4 / Other: _______`
  - **[DEFAULT]** Google Analytics 4.
- [ ] **[INPUT]** GA4 measurement ID: `G-_______________________`
- [ ] **[DECISION]** A/B testing platform: `_______________________`
  - **[DEFAULT]** Use analytics platform native experimentation or Google Optimize (if available) / VWO / Optimizely.
- [ ] **[DECISION]** Which two experiments to launch first (Day 8)? See priority-experiments.md.
  - **[DEFAULT]** Experiment 1 (Hero Headline) and Experiment 2 (CTA Button Copy).

---

## Section 9 — Content & Approvals

- [ ] **[INPUT]** Final affiliate policy URL confirmed and live: `https://yourdomain.com/affiliate-policy` *(update placeholder)*
- [ ] **[DECISION]** Brand approval email/form address for affiliates to submit requests: `_______________________`
- [ ] **[INPUT]** Testimonials / case studies collected and consent obtained? `Yes / No`
  - **[DEFAULT]** No — placeholder testimonials remain in copy until real testimonials are approved.
- [ ] **[DECISION]** Merchandise available at launch? `Yes / No`
  - **[DEFAULT]** No — requires separate written approval from Kaygun Fontenot before any merchandise is offered.

---

## Section 10 — Launch Authorization

- [ ] **Kaygun Fontenot** confirms all pricing decisions above: `✓ / Pending`
- [ ] **Kaygun Fontenot** confirms affiliate policy has been reviewed by legal counsel: `✓ / Pending`
- [ ] **Kaygun Fontenot** provides final sign-off for launch: `✓ / Pending`

---

*© Fontenots Sales Association LLC. All rights reserved. Authorized by Kaygun Fontenot.*
