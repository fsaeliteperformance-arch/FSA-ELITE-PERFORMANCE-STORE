# KPI Checklist — FSA Elite Performance

Track these metrics weekly. All metrics apply to both storefronts unless noted.

---

## Revenue KPIs

| # | Metric | Definition | Formula | Target (Month 1) | Tracking Source |
|---|---|---|---|---|---|
| R1 | Monthly Recurring Revenue (MRR) | Subscription revenue per month | Active subscribers × $49 | $1,000 | Stripe Dashboard |
| R2 | Monthly One-Time Revenue | Non-recurring course and merch sales | Sum of one-time Stripe charges | $4,000 | Stripe Dashboard |
| R3 | Total Monthly Revenue | All revenue in period | MRR + one-time revenue | $5,000 | Stripe Dashboard |
| R4 | Average Order Value (AOV) | Average revenue per transaction | Total Revenue ÷ Total Orders | $120 | Stripe / Shopify |
| R5 | Annual Recurring Revenue (ARR) | Annualised subscription revenue | MRR × 12 | $12,000 | Calculated |
| R6 | Revenue per Course | Revenue per individual course | Course orders × price | Varies | Stripe Dashboard |

---

## Customer KPIs

| # | Metric | Definition | Formula | Target | Tracking Source |
|---|---|---|---|---|---|
| C1 | Customer Acquisition Cost (CAC) | Cost to acquire one paying customer | Total marketing spend ÷ New customers | < $50 | Ad spend / Stripe |
| C2 | Lifetime Value (LTV) | Expected total revenue per customer | AOV × Purchase frequency × Avg. customer lifespan | > $250 | Calculated |
| C3 | LTV:CAC Ratio | Return on customer acquisition investment | LTV ÷ CAC | > 3:1 | Calculated |
| C4 | Subscriber Churn Rate | % subscribers who cancel per month | Cancelled subscribers ÷ Total subscribers at start of month | < 10% | Stripe |
| C5 | Subscriber Retention Rate | % subscribers who stay each month | 1 − Churn Rate | > 90% | Stripe |
| C6 | Net Promoter Score (NPS) | Customer satisfaction & referral likelihood | (% Promoters − % Detractors) | > 40 | Email survey |

---

## Conversion KPIs

| # | Metric | Definition | Formula | Target | Tracking Source |
|---|---|---|---|---|---|
| CV1 | Landing Page Conversion Rate | % of visitors who click a payment link | Clicks on CTA ÷ Page visitors | > 3% | GA4 / Plausible |
| CV2 | Email Click-Through Rate (CTR) | % of email recipients who click a link | Clicks ÷ Emails delivered | > 4% | Mailchimp / Klaviyo |
| CV3 | Email Open Rate | % of emails opened | Opens ÷ Emails delivered | > 35% | Mailchimp / Klaviyo |
| CV4 | Cart Abandonment Rate | % of initiated checkouts not completed | Abandoned checkouts ÷ Initiated checkouts | < 65% | Stripe / GA4 |
| CV5 | Cart Recovery Rate | % of abandoned carts recovered by email | Recovered orders ÷ Abandoned carts emailed | > 10% | Email platform |
| CV6 | Paid Ad ROAS | Revenue generated per $1 of ad spend | Ad Revenue ÷ Ad Spend | > 3× | Facebook Ads Manager / Google Ads |

---

## Traffic & Engagement KPIs

| # | Metric | Definition | Formula | Target | Tracking Source |
|---|---|---|---|---|---|
| T1 | Monthly Website Visitors | Unique visitors to landing pages | — | 1,000 | GA4 / Plausible |
| T2 | Traffic by Source | % of visitors from each channel | Channel visitors ÷ Total visitors | Organic > 40% | GA4 |
| T3 | Email List Size | Total subscribers | — | 500 by end of month 1 | Mailchimp / Klaviyo |
| T4 | Email List Growth Rate | % growth per month | (New subs − Unsubscribes) ÷ Starting list size | > 10%/month | Email platform |
| T5 | LinkedIn Follower Growth | Net new LinkedIn followers per month | — | +100/month | LinkedIn Analytics |
| T6 | Social Engagement Rate | Avg. engagement per post ÷ Followers | (Likes + Comments + Shares) ÷ Followers | > 3% | Native analytics |

---

## Fulfilment KPIs (Merch Store)

| # | Metric | Definition | Formula | Target | Tracking Source |
|---|---|---|---|---|---|
| F1 | Order Fulfilment Time | Time from order to shipment | Avg. days from purchase to Printful dispatch | < 3 days | Printful dashboard |
| F2 | Return Rate | % of merch orders returned | Returns ÷ Orders shipped | < 5% | Shopify / Printful |
| F3 | Customer Support Response Time | Time to first reply to support enquiry | Avg. hours to first response | < 24 hours | Email / helpdesk |

---

## Tracking Notes

1. **Google Analytics 4 (GA4):** Set up goals for CTA button clicks and payment link redirects. Enable Enhanced Measurement.
2. **Stripe Dashboard:** Use the "Revenue" and "Customers" tabs. Export CSV monthly for the `kpi_dashboard.csv` file.
3. **Email platform:** Export performance reports weekly. Track open rate, CTR, and unsubscribe rate per campaign.
4. **Weekly review cadence:** Review all KPIs every Monday morning. Update `kpi_dashboard.csv`. Adjust spend and content based on trends.
5. **Monthly review:** Full MRR, churn, LTV, and CAC analysis. Share with team or advisors.
