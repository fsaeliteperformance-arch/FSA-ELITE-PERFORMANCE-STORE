# FSA Elite Performance Store

FSA Elite Performance is the official merchandise and branding store for the FSA Elite sales community. The platform provides branded apparel, sales tools, and professional gear designed for salespeople building their personal brand in the automotive, insurance, and every sales industry.

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | React Server Components + ISR for fast, edge-cached pages |
| Language | **TypeScript** | Type safety across the full stack |
| Styling | **Tailwind CSS** | Utility-first CSS with zero unused styles in production |
| Payments | **Stripe Checkout** | Hosted, PCI-compliant checkout flow |

---

## Performance Decisions

This project is architected for speed from the ground up. Key optimisations:

### 1. React Server Components (RSC)
Product listings and detail pages are **React Server Components** — they fetch data on the server and stream pre-rendered HTML to the browser. The client receives finished markup with no loading spinners or client-side fetch waterfalls.

### 2. Static Generation with ISR
Every product page is pre-rendered at build time via `generateStaticParams`. Pages are served from the CDN edge without hitting the origin. `revalidate = 3600` means stale pages are regenerated automatically in the background at most once per hour.

### 3. `next/image` with explicit `sizes`
All images use `next/image` with:
- **`sizes` attribute** — tells the browser the rendered image width at each breakpoint so it downloads the smallest adequate variant.
- **`avif`/`webp` format negotiation** — shaves ~50–70 % off image payload vs. JPEG for supporting browsers.
- **Fixed aspect-ratio wrappers** — eliminates Cumulative Layout Shift (CLS = 0).
- **`priority`** on above-the-fold images — triggers browser preloading for the Largest Contentful Paint (LCP) element.

### 4. Single `useReducer` for Cart State
The shopping cart uses one `useReducer` instead of multiple `useState` calls. This batches related state changes into a single re-render (e.g. updating quantity and recalculating the total happens atomically) and makes state transitions predictable and testable.

### 5. `useMemo` and `useCallback` for Stable References
- Derived cart values (`total`, `count`) are computed with `useMemo` so they are only recalculated when `state.items` changes.
- Cart action creators (`addItem`, `removeItem`, `clearCart`) are wrapped in `useCallback` so their reference is stable across renders, preventing unnecessary re-renders in child components.

### 6. Pre-built Slug → Product Map
`getProductBySlug` uses a `Map<string, Product>` built **once at module load time**. This makes individual product lookups O(1) instead of O(n) — important during static generation when Next.js calls the function for every slug in parallel.

### 7. `next/font` with Latin Subset
The Inter font is loaded with `{ subsets: ['latin'], display: 'swap' }`. This restricts the woff2 download to the characters actually used and ensures text stays visible while the custom font loads (no invisible-text flash).

### 8. Response Compression
`compress: true` in `next.config.ts` enables gzip/brotli compression at the server layer, reducing HTML/JSON payload by ~70 % on average.

### 9. Server-Side Stripe Integration
The Stripe secret key and checkout session creation happen exclusively in a Route Handler (`/api/checkout`). The secret key is **never shipped to the browser bundle**.

---

## Stripe Statement Descriptor

Use `FSA ELITE PERFORMANCE` as the Stripe account statement descriptor for this store.

---

## Ionis Access Request

If someone needs access to this store through Ionis, have them paste:

```text
https://fsaeliteperformance.store
```

when requesting access to the FSA Elite Performance Store.

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Set environment variables
cp .env.example .env.local
# Fill in STRIPE_SECRET_KEY, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, NEXT_PUBLIC_SITE_URL

# 3. Start the dev server
npm run dev
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `STRIPE_SECRET_KEY` | ✅ | Stripe secret key (server-only) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | ✅ | Stripe publishable key (client-safe) |
| `NEXT_PUBLIC_SITE_URL` | ✅ | Full origin URL, e.g. `https://fsaeliteperformance.store` |
