# FSA Elite Sales Training — Pricing & Checkout

**Brand:** FSA Elite Sales Training | FSA Elite Sales App  
**Entity:** Fontenots Sales Association LLC  
**Owner:** Kaygun Fontenot  

---

## Pricing Page Copy

### Page Headline

**Simple, Transparent Pricing. Real Results.**

### Subheadline

Whether you're just getting started or ready to go all-in, FSA Elite has a plan that fits where you are — and where you're going.

---

### Plan Cards

---

#### Starter Pack

**FSA Elite Sales App — Starter**

*For reps who are building their foundation.*

**Price:** [Starter Monthly Price] / month  
**Annual:** [Starter Annual Price] / year *(save [X]%)*

**Includes:**
- Activity tracking dashboard
- Daily goals & performance check-in
- Objection-handling quick reference
- Weekly performance summary
- Select FSA Elite Sales Training modules
- Community & email support

**CTA:** Start Free Trial *(or)* Get Starter

---

#### Growth Pack *(Most Popular)*

**FSA Elite Sales App — Growth**

*For reps who are ready to grow their pipeline and their income.*

**Price:** [Growth Monthly Price] / month  
**Annual:** [Growth Annual Price] / year *(save [X]%)*

**Includes everything in Starter, plus:**
- Advanced pipeline management
- Monthly group coaching calls
- Script builder
- CRM integration and exports
- Priority email support
- Full FSA Elite Sales Training Course

**CTA:** Get Growth *(or)* Start Free Trial

---

#### Performance Pack

**FSA Elite Sales App — Performance**

*For serious performers who want every advantage.*

**Price:** [Performance Monthly Price] / month  
**Annual:** [Performance Annual Price] / year *(save [X]%)*

**Includes everything in Growth, plus:**
- Monthly 1-on-1 coaching with Kaygun Fontenot
- Elite KPI analytics
- Team leader dashboard
- White-glove onboarding
- Priority phone and chat support
- Early access to new modules and features

**CTA:** Go Performance *(or)* Book a Demo

---

#### FSA Elite Sales Training Course (One-Time)

**For learners who want the full training without a subscription.**

**Price:** [Course One-Time Price]  
**Payment plan available:** [Plan Details]

**Includes:**
- Full FSA Elite Sales Training curriculum
- Downloadable scripts and templates
- Objection-handling cheat sheet
- 30-day sales challenge
- Community access
- Lifetime access

**CTA:** Enroll Now

---

### FAQ — Pricing Page

**Can I switch plans?**  
Yes. You can upgrade or downgrade your plan at any time from your account dashboard. Changes take effect at the start of your next billing cycle.

**Is there a free trial?**  
[Free trial availability — fill in per product decision: e.g., "Yes, 7-day free trial on Starter and Growth packs."]

**What payment methods do you accept?**  
We accept all major credit and debit cards via Stripe. PayPal acceptance is [available/coming soon].

**Can I cancel anytime?**  
Yes. Cancel anytime from your account settings. No cancellation fees.

**Do you offer refunds?**  
Yes. 14-day refund policy on the Course; 7-day refund policy on App subscriptions. See full policy at https://yourdomain.com/affiliate-policy.

---

## Checkout UX Copy

### Checkout Page Headline

**You're One Step Away from Closing More Deals.**

### Order Summary Label

Your Order — FSA Elite

### Trust Badges (copy, no images required)

- ✓ Secure checkout powered by Stripe
- ✓ SSL encrypted — your data is safe
- ✓ 14-day satisfaction guarantee (Course) | 7-day (App subscriptions)
- ✓ Cancel anytime (App subscriptions)

### CTA Button Labels

- **Place Order**
- **Complete Purchase**
- **Start My Training**
- **Activate My Plan**

### Post-Purchase Confirmation Message

> **You're in! Welcome to FSA Elite.**  
> Check your inbox for your login details and onboarding instructions. If you have any questions, our team is here to help.  
>  
> — Kaygun Fontenot, Fontenots Sales Association LLC

---

## Stripe Webhook — Sample JSON & Server Logic

### Sample Stripe `checkout.session.completed` Webhook Event (JSON)

```json
{
  "id": "evt_1ExampleStripeEventID",
  "object": "event",
  "api_version": "2023-10-16",
  "created": 1700000000,
  "type": "checkout.session.completed",
  "data": {
    "object": {
      "id": "cs_test_ExampleSessionID",
      "object": "checkout.session",
      "amount_total": 9900,
      "currency": "usd",
      "customer": "cus_ExampleCustomerID",
      "customer_email": "customer@example.com",
      "metadata": {
        "affiliate_id": "AFF_12345",
        "product": "fsa-elite-growth-pack"
      },
      "payment_intent": "pi_ExamplePaymentIntentID",
      "payment_status": "paid",
      "status": "complete",
      "subscription": "sub_ExampleSubscriptionID"
    }
  },
  "livemode": false
}
```

### Sample Server Logic (Minimal — Node.js / Next.js API Route)

```js
// pages/api/webhooks/stripe.js (or app/api/webhooks/stripe/route.js)
import Stripe from 'stripe';
import { buffer } from 'micro';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    // Step 1: Verify webhook signature — REQUIRED for security
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Step 2: Handle the event type
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      // Step 3: Fulfill the order (provision access, send welcome email, etc.)
      await handleCheckoutCompleted(session);
      break;
    }
    case 'charge.refunded': {
      const charge = event.data.object;
      // Step 4: Trigger commission clawback in affiliate platform
      await handleRefund(charge);
      break;
    }
    case 'invoice.payment_succeeded': {
      const invoice = event.data.object;
      // Step 5: Handle subscription renewal
      await handleSubscriptionRenewal(invoice);
      break;
    }
    case 'customer.subscription.deleted': {
      const subscription = event.data.object;
      // Step 6: Revoke access on subscription cancellation
      await handleSubscriptionCancelled(subscription);
      break;
    }
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return res.status(200).json({ received: true });
}
```

---

### Security Notes

1. **Always verify the Stripe webhook signature** using `stripe.webhooks.constructEvent()` before processing any event. Never trust event data that has not been signature-verified.
2. **Never expose `STRIPE_SECRET_KEY` or `STRIPE_WEBHOOK_SECRET`** in client-side code, public repositories, or logs. Use environment variables only.
3. **Use HTTPS exclusively** for the webhook endpoint. Do not accept webhook events over plain HTTP in production.
4. **Implement idempotency**: Stripe may send duplicate events. Check if an event has already been processed (e.g., by storing the event `id` in your database) before fulfilling an order or triggering a commission.
5. **Rate-limit and log** all webhook events for audit purposes. Retain logs for a minimum of 90 days.
6. **Restrict endpoint access**: Your webhook endpoint should only accept POST requests from Stripe IP ranges. Consider adding IP allowlisting at the infrastructure level as a secondary control.
7. **Test in Stripe test mode** before enabling in production. Use the Stripe CLI (`stripe listen`) to forward test events to your local server.

---

*© Fontenots Sales Association LLC. All rights reserved. Authorized by Kaygun Fontenot.*
