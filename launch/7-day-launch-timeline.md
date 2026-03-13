# 7-Day Launch Timeline

A day-by-day owner action plan for the first week of launch.  
Items marked **[Owner]** are your responsibility. Items marked **[Copilot]** have been delivered in this PR.

---

## Day 0 (Before Launch) — Setup Sprint

| # | Action | Owner | Status | Notes |
|---|---|---|---|---|
| 1 | Review all files in this PR | **[Owner]** | ⬜ | Read all `stores/`, `payments/`, `marketing/` files |
| 2 | Create Stripe account & complete compliance checklist | **[Owner]** | ⬜ | Link: https://dashboard.stripe.com/acct_1T4wxs7Ssw0Qx6df/settings/compliance/ecommerce/complete |
| 3 | Create 4 Stripe Payment Links (3 courses + 1 merch bundle) | **[Owner]** | ⬜ | See `payments/README.md` |
| 4 | Create Shopify Starter account + add 3 merch products | **[Owner]** | ⬜ | See `stores/merch-resources/README.md` |
| 5 | Replace all `STRIPE_PAYMENT_LINK` and `SHOPIFY_PRODUCT_LINK` placeholders in HTML files | **[Owner]** | ⬜ | Find/replace in `landing.html` files |
| 6 | Add hero images to `stores/*/images/` folders | **[Owner]** | ⬜ | See placeholder.png notes for specs |
| 7 | Set up email platform (Mailchimp / Klaviyo) + import existing contacts | **[Owner]** | ⬜ | Free tiers available |
| 8 | Upload pre-launch email sequence from `marketing/email-sequences/prelaunch.md` | **[Owner]** | ⬜ | Schedule 3 emails over 7 days before launch |
| 9 | Deploy landing pages (Netlify / GitHub Pages / Vercel) | **[Owner]** | ⬜ | Test with `python3 -m http.server 8000` first |
| 10 | All store files & landing pages created | **[Copilot]** | ✅ | Delivered in this PR |
| 11 | Email sequences written | **[Copilot]** | ✅ | See `marketing/email-sequences/` |
| 12 | Social posts & ad copy written | **[Copilot]** | ✅ | See `marketing/social-and-ads/` |
| 13 | KPI checklist & dashboard created | **[Copilot]** | ✅ | See `analytics/` |
| 14 | Payments & Stripe guide written | **[Copilot]** | ✅ | See `payments/README.md` |

---

## Day 1 — Launch Day

| Time | Action | Owner |
|---|---|---|
| 8:00am | Send launch email #1 (Email with code FSA20) | **[Owner]** |
| 8:30am | Publish launch social post on LinkedIn | **[Owner]** |
| 9:00am | Post in any relevant Facebook Groups / Slack communities | **[Owner]** |
| 9:00am | Go live with Stripe Payment Links (switch from test to live mode) | **[Owner]** |
| 11:00am | Monitor Stripe dashboard — confirm first payments are processing | **[Owner]** |
| 3:00pm | Send launch email #2 (social proof + FAQ) | **[Owner]** |
| 3:30pm | Respond to all LinkedIn comments and DMs | **[Owner]** |
| 5:00pm | Check cart abandonment — confirm abandon email #1 is triggering | **[Owner]** |
| EOD | Log Day 1 revenue, orders, and notes in `analytics/kpi_dashboard.csv` | **[Owner]** |

---

## Day 2

| Action | Owner |
|---|---|
| Send launch email #3 (last 12 hours — FSA20 expiring) | **[Owner]** |
| Post social post #2 on LinkedIn (value/education post) | **[Owner]** |
| DM 20 warm contacts directly with a personalised message | **[Owner]** |
| Check and reply to all support emails | **[Owner]** |
| Log Day 2 metrics | **[Owner]** |

---

## Day 3

| Action | Owner |
|---|---|
| Send launch email #4 (code expired, what's next) | **[Owner]** |
| Post social post #3 (social proof / results) | **[Owner]** |
| Review cart abandonment email open rates — adjust subject lines if open rate < 30% | **[Owner]** |
| Reach out to 3 beta users for video/written testimonials | **[Owner]** |

---

## Day 4

| Action | Owner |
|---|---|
| Post social post #4 (merch / brand post) | **[Owner]** |
| Set up $10/day Facebook retargeting campaign using ad copy from `marketing/social-and-ads/ad-copy.md` | **[Owner]** |
| Check Shopify — confirm any merch orders are in Printful | **[Owner]** |

---

## Day 5

| Action | Owner |
|---|---|
| Post social post #5 (community / soft CTA) | **[Owner]** |
| Review retargeting ad performance (CTR, CPC, ROAS) | **[Owner]** |
| Identify top 3 LinkedIn connections who might be affiliate partners — reach out | **[Owner]** |

---

## Day 6

| Action | Owner |
|---|---|
| Respond to all comments and DMs from the week | **[Owner]** |
| Write and schedule next week's 3 LinkedIn posts | **[Owner]** |
| Review Week 1 metrics — fill in `analytics/kpi_dashboard.csv` row for Week 1 | **[Owner]** |

---

## Day 7 — Week 1 Retrospective

| Action | Owner |
|---|---|
| Calculate: Total revenue, new customers, MRR, CAC | **[Owner]** |
| Identify: Best-performing email subject line, best social post, best ad variant | **[Owner]** |
| Decide: Scale the ad spend? Adjust pricing? Change CTA copy? | **[Owner]** |
| Plan: Week 2 content calendar, email #5, and any partnership outreach | **[Owner]** |
| Optional: Record a short "Week 1 in review" LinkedIn video | **[Owner]** |
