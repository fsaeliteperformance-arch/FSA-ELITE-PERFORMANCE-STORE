# Paid Ad Copy — 3 Variants

Optimised for LinkedIn Ads, Facebook/Instagram Ads, and Google Search Ads.  
Replace placeholders before publishing. Use UTM parameters on all destination URLs for tracking.

---

## Ad Variant 1 — LinkedIn Single Image Ad

**Target audience:** Sales professionals, SDRs, AEs, Sales Managers — job titles on LinkedIn  
**Objective:** Lead generation / Conversions  
**Format:** Single image + headline + body + CTA button

---

**Headline (max 70 chars):**  
Stop Losing Deals on Objections — Get the Scripts

**Body copy (max 600 chars):**  
Most reps lose deals they could have closed — not because of price, not because of competition, but because they didn't know what to say when a prospect said "not right now."

The FSA Elite Objection Masterclass teaches you 12 frameworks for the 12 most common B2B objections. 90 minutes. Lifetime access. 30-day money-back guarantee.

Join [X]+ reps who've already enrolled.

**CTA button:** Enrol Now  
**Destination URL:** `STRIPE_PAYMENT_LINK_COURSE_01?utm_source=linkedin&utm_medium=paid&utm_campaign=objection-masterclass`

**Image:** `stores/digital-courses/images/placeholder.png` → replace with course hero image (1200×627 px)

---

**Headline variant B:**  
Handle Any Sales Objection in Under 60 Seconds

**Body variant B:**  
What do you say when a prospect says "send me more info"? Or "the timing isn't right"? Or "we're already working with someone"?

If you're not sure — the FSA Elite Objection Masterclass gives you word-for-word scripts for every scenario.

$197. One-time. Lifetime access. 30-day guarantee.

---

## Ad Variant 2 — Facebook / Instagram Feed Ad

**Target audience:** Interest targeting — sales, B2B sales, SDR, business development, Salesforce, HubSpot users  
**Objective:** Conversions (Purchase event)  
**Format:** Image or short video (15–30s) + primary text + headline + description + CTA

---

**Primary text (shown above image, max 125 chars for preview):**  
What if you had a word-for-word script for every sales objection you'll ever face?

**Extended primary text:**  
What if you had a word-for-word script for every sales objection you'll ever face?

That's exactly what the **FSA Elite Objection Masterclass** delivers.

90 minutes. 12 objection frameworks. Live role-play recordings from real AE and SDR calls.

✅ Handle "not right now" without sounding desperate  
✅ Turn "send me more info" into a booked follow-up  
✅ Close the budget objection without dropping your price  

$197 one-time · Lifetime access · 30-day money-back guarantee

**Headline:** Master Every Sales Objection — $197  
**Description:** 90-min course with scripts, frameworks & role-play recordings.  
**CTA button:** Shop Now  
**Destination URL:** `STRIPE_PAYMENT_LINK_COURSE_01?utm_source=facebook&utm_medium=paid&utm_campaign=objection-masterclass`

**Image/Video:** Replace `stores/digital-courses/images/placeholder.png`  
Recommended video: 15-second talking-head clip previewing one objection script.

---

**Retargeting variant (for visitors who viewed landing page but didn't purchase):**

**Primary text:**  
Still thinking about the Objection Masterclass? Your 30-day guarantee means zero risk.  
If it doesn't work, email us and we refund you in full — no questions asked.

**Headline:** 30-Day Money-Back Guarantee — Try It Risk-Free  
**CTA button:** Enrol Now  
**Destination URL:** `STRIPE_PAYMENT_LINK_COURSE_01?utm_source=facebook&utm_medium=retargeting&utm_campaign=objection-masterclass`

---

## Ad Variant 3 — Google Search Ad

**Campaign type:** Search  
**Goal:** Purchases  
**Keywords (broad match modified):**
- `+sales +objection +training`
- `+SDR +course +online`
- `+sales +playbook +template`
- `+B2B +sales +coaching`
- `+objection +handling +scripts`

**Negative keywords:** free, job, careers, hiring, resume

---

**Responsive Search Ad:**

**Headlines (add all — Google will mix and match):**
1. Sales Objection Training Course
2. Handle Any B2B Objection
3. Objection Scripts for SDRs & AEs
4. 90-Min Sales Masterclass — $197
5. Sales Playbook Starter Template
6. Monthly Sales Coaching — $49/mo
7. 30-Day Money-Back Guarantee
8. Close More Deals — Start Today
9. FSA Elite Performance Courses
10. Lifetime Access · Instant Download

**Descriptions:**
1. Word-for-word scripts for the 12 most common B2B objections. 90 minutes. 30-day guarantee. Enrol now.
2. Build your complete sales playbook in a weekend. Templates, call scripts, pipeline definitions — done for you.
3. Monthly live coaching calls + private community + growing video library. Cancel anytime. First month free this week.

**Final URL:** `STRIPE_PAYMENT_LINK_COURSE_01?utm_source=google&utm_medium=cpc&utm_campaign=objection-masterclass`  
*(Or link to landing page if using Google's landing page quality score optimisation)*

**Display path:** `fsaeliteperformance.com/courses/objection`

---

## UTM Tracking Convention

| Parameter | Value examples |
|---|---|
| `utm_source` | `linkedin`, `facebook`, `google`, `email`, `instagram` |
| `utm_medium` | `paid`, `cpc`, `retargeting`, `organic`, `email` |
| `utm_campaign` | `objection-masterclass`, `launch`, `cart-abandon`, `playbook-starter` |
| `utm_content` | `variant-a`, `variant-b`, `image-1`, `video-1` |
