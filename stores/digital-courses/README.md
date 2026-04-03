# Digital Courses Storefront — Launch Checklist

## Overview
Quick-launch storefront for FSA Elite Performance digital courses, powered by a static site + Stripe Payment Links.  
No server-side code required. Deploy in under an hour.

---

## Recommended Platform
| Component | Choice | Why |
|---|---|---|
| Hosting | GitHub Pages / Netlify / Vercel (static) | Free tier, instant deploy |
| Payments | Stripe Payment Links | No backend required |
| Email capture | Mailchimp embed or ConvertKit form | Free tiers available |

---

## Environment Variable Names
> Do **not** hardcode these values. Set them in your hosting dashboard or `.env.local` (never commit).

| Variable | Purpose |
|---|---|
| `STRIPE_PAYMENT_LINK_COURSE_01` | Payment link for Objection Masterclass |
| `STRIPE_PAYMENT_LINK_COURSE_02` | Payment link for Sales Playbook Starter |
| `STRIPE_PAYMENT_LINK_COURSE_03` | Payment link for Micro-Coaching Subscription |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (safe to expose in browser) |
| `GA_MEASUREMENT_ID` | Google Analytics 4 measurement ID |

---

## Deployment Steps

### 1. Create Stripe Payment Links
1. Log in to the Stripe Dashboard.
2. Navigate to **Products → Payment Links → + New**.
3. Create one link per course (see `/products/`).
4. Copy each link URL and store it as the matching env var above.

### 2. Populate `landing.html`
- Replace every `STRIPE_PAYMENT_LINK` placeholder in `landing.html` with the real URL **or** set it dynamically via your hosting platform's build-time variable injection.

### 3. Add Product Images
- Drop production images into `images/` and update `<img src="">` tags in `landing.html`.
- Minimum recommended size: 1200 × 630 px (works for OG meta and hero banners).

### 4. Deploy
```bash
# Test locally first:
python3 -m http.server 8000
# Then open http://localhost:8000/stores/digital-courses/landing.html

# Deploy to Netlify (drag-and-drop or CLI):
netlify deploy --dir stores/digital-courses --prod

# Deploy to Vercel (static):
vercel --cwd stores/digital-courses
```

### 5. Post-Launch
- [ ] Verify Stripe test-mode purchase end-to-end
- [ ] Switch Stripe keys to live mode
- [ ] Enable GA4 real-time dashboard
- [ ] Set up Stripe webhook for order confirmation emails

---

## File Map
```
stores/digital-courses/
├── README.md                          ← this file
├── landing.html                       ← main sales page
├── images/
│   └── placeholder.png               ← replace with real assets
└── products/
    ├── course-01-objection-masterclass.md
    ├── course-02-sales-playbook-starter.md
    └── course-03-micro-coaching-subscription.md
```
