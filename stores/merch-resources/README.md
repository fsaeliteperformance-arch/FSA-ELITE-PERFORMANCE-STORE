# Merch & Resources Storefront — Launch Checklist

## Overview
Quick-launch storefront for FSA Elite Performance branded merchandise and physical resources,  
powered by Shopify (product pages + cart) and Stripe Payment Links as a fallback checkout.  
Deployable in under a day without a developer.

---

## Recommended Platform
| Component | Choice | Why |
|---|---|---|
| Store | Shopify Starter ($5/month) | Physical product fulfilment, built-in shipping, no dev required |
| Payments | Shopify Payments + Stripe as backup | Reduce transaction fees; Stripe links for direct sales |
| Print-on-demand | Printful or Printify (Shopify integration) | Zero inventory risk for tees and workbooks |
| Email | Klaviyo (free up to 500 contacts) | Native Shopify integration, powerful flows |

---

## Environment Variable Names
> Do **not** hardcode these values. Store them in your Shopify environment or `.env.local` for any custom code.

| Variable | Purpose |
|---|---|
| `SHOPIFY_STORE_URL` | Your Shopify storefront URL (e.g., `fsaelite.myshopify.com`) |
| `SHOPIFY_PRODUCT_LINK_TEE` | Direct product link for FSA Tee |
| `SHOPIFY_PRODUCT_LINK_WORKBOOK` | Direct product link for Workbook & Playbook |
| `SHOPIFY_PRODUCT_LINK_BUNDLE` | Direct product link for Starter Bundle |
| `STRIPE_PAYMENT_LINK_MERCH_BUNDLE` | Stripe fallback payment link for bundle |
| `GA_MEASUREMENT_ID` | Google Analytics 4 measurement ID |

---

## Deployment Steps

### 1. Set Up Shopify
1. Create a Shopify account at [shopify.com](https://shopify.com).
2. Choose the **Starter** plan ($5/month) if you only need Buy buttons and payment links.
3. Add each product from `/products/` using the details in those files.
4. Enable **Shopify Payments** (or set up Stripe as a third-party gateway).
5. Install **Printful** or **Printify** app for print-on-demand fulfilment.

### 2. Get Product Links
After creating each product in Shopify:
1. Navigate to **Products → [product name] → More actions → Share**.
2. Copy the shareable link and store it as the matching env var above.

### 3. Populate `landing.html`
- Replace every `SHOPIFY_PRODUCT_LINK` and `STRIPE_PAYMENT_LINK` placeholder in `landing.html`.

### 4. Add Product Images
- Drop images into `images/` and update `<img src="">` tags.
- Recommended size: 1200 × 1200 px square (Shopify standard).

### 5. Deploy Landing Page
```bash
# Test locally:
python3 -m http.server 8000
# Then open http://localhost:8000/stores/merch-resources/landing.html

# Or link to your Shopify storefront directly and skip the static landing page.
```

### 6. Post-Launch
- [ ] Place a test order via Shopify test mode
- [ ] Confirm Printful fulfilment is correctly synced
- [ ] Switch to live payment mode
- [ ] Enable Klaviyo welcome flow for new customers
- [ ] Set up abandoned cart recovery in Shopify

---

## File Map
```
stores/merch-resources/
├── README.md                     ← this file
├── landing.html                  ← main sales page
├── images/
│   └── placeholder.png          ← replace with real product photos
└── products/
    ├── merch-01-fsa-tee.md
    ├── merch-02-workbook-playbook.md
    └── merch-03-starter-bundle.md
```
