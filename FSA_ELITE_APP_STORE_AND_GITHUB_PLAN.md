# FSA Elite – App, Store, and GitHub Integration Plan

Owner: Fontenot's Sales Association LLC (member-managed by Kaygun Fontenot)  
GitHub: `fsaeliteperformance-arch` (FSA ELITE PERFORMANCE)  
Web: fsaelite.org · fsaeliteperformance.org

---

## 1. Brand & Product Snapshot

### 1.1 Core Identity

- **Company**: Fontenot's Sales Association LLC, member-managed, domiciled in Sunset, Louisiana.
- **Flagship**: FSA Elite – an AI-powered **sales performance engine**, not a course/chatbot/motivational app.
- **What it actually is**:
  - Pressure simulator
  - Skill-tracking engine
  - Daily sharpening system
  - Measurable performance platform

### 1.2 Training System (War Chest Summary)

- All actions feed a single **Intelligence Layer** that:
  - Tracks skill tags
  - Updates performance ratings
  - Adjusts progression
  - Generates adaptive drills
- **Six core modes**:
  - Tactical Response – real-time objection handling
  - Role Play – full combat simulation
  - Skill Builder – micro drills targeting weak skills
  - AI Coach – strategic breakdown and correction
  - Academy – structured mastery progression
  - Pre-Call Sharpen – 3–5 minute mental warm-up
- **Scoring framework**:
  - Control (0–10), Depth (0–10), Conversion (0–10)
  - Passing: 22, Elite: 26, three elite sessions unlock next tier

### 1.3 Store / Merch

- Repo: `fsaeliteperformance-arch/FSA-ELITE-PERFORMANCE-STORE`
- Purpose: Official merchandise and branding store for the FSA Elite sales community; branded apparel, sales tools, pro gear.
- Built with TypeScript; performance-focused architecture, Stripe checkout, IONOS hosting integration.

---

## 2. Repos and Their Jobs

> Adjust names if your training/AI repos differ.

- **Training app**
  - Suggested repo: `FSA-ELITE-SALES-TRAINING`
  - Role: Core pressure simulator (all six modes), Intelligence Layer, Academy.

- **Store**
  - Repo: `FSA-ELITE-PERFORMANCE-STORE`
  - Role: FSA Elite Performance Store (merch/branding/tools).

- **AI assistance (optional, recommended)**
  - Suggested repo: `FSA-AI-ASSISTANCE`
  - Role: Backend APIs/AI Coach, persona engine services, analytics.

---

## 3. User Flow – How It Should Feel at Launch

From the user's perspective, everything should feel like **one system**, even if it's many repos.

### 3.1 Training → Store

In the **training app UI**:

- Add a primary or secondary action:
  - "Get FSA Elite Gear"
- Link target:
  - `https://<your-store-domain>` (e.g. `https://store.fsaeliteperformance.org`)

Suggested placements:

- Main nav: `Training | Academy | AI Coach | Gear`
- Post-session screen: CTA under battle report:
  - "Wear the brand you're training under – visit the FSA Elite Performance Store."

### 3.2 Store → Training

In the **store**:

- Top-level CTA:
  - "Start FSA Elite Sales Training"
- Link target:
  - `https://<your-training-domain>` (e.g. `https://app.fsaelite.org`)

Suggested placements:

- Header button: `Start Training`
- Product detail pages (especially sales tools):
  - "Use this with the FSA Elite training system."

---

## 4. Deployment & GitHub Actions (High-Level)

You are hosting via **IONOS** and have API access terms for hosting services.  
Goal: each repo auto-deploys when you push to `main`.

### 4.1 Common GitHub Actions Template

Create in each repo:

`.github/workflows/deploy.yml`

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Check out repository
        uses: actions/checkout@v4

      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Build app
        run: npm run build

      # TODO: Replace this with your real IONOS deploy command or script.
      - name: Deploy to hosting
        env:
          IONOS_API_KEY: ${{ secrets.IONOS_API_KEY }}
          IONOS_API_SECRET: ${{ secrets.IONOS_API_SECRET }}
        run: |
          echo "Deploying to IONOS..."
          # e.g., call your deploy script:
          # npm run deploy
```

---

## 5. How to use this

1. Save that whole block as a file in your repos, e.g.
   - `FSA_ELITE_APP_STORE_AND_GITHUB_PLAN.md`
2. In each GitHub repo:
   - Create issues using the checklists under section **7** of the file.
3. Customize domain names and repo names where needed, then implement the workflows.

---

## 6. Repo-Level Implementation Notes

- Keep the user experience feeling like one connected FSA Elite system even if the code lives in separate repositories.
- Standardize domain naming before launch:
  - store: `store.fsaeliteperformance.org`
  - training: `app.fsaelite.org`
- Reuse the same deploy workflow shape across repos, then swap in the actual IONOS deployment command when ready.

---

## 7. Issue Checklists

### 7.1 Store Repo Checklist

- [ ] Add a top-level `Start Training` CTA in the store header.
- [ ] Add `Start FSA Elite Sales Training` CTA content on the store homepage.
- [ ] Add a product-detail callout that pairs store items with the training system.
- [ ] Add `NEXT_PUBLIC_TRAINING_URL` configuration.
- [ ] Add or update `.github/workflows/deploy.yml` with the shared deploy template.

### 7.2 Training App Checklist

- [ ] Add `Get FSA Elite Gear` to the main nav.
- [ ] Add a post-session CTA that links users to the store.
- [ ] Confirm store links point to the production store domain.
- [ ] Add the shared deploy workflow to the training repo.

### 7.3 AI / Assistance Repo Checklist

- [ ] Confirm repo naming and scope for AI Coach, persona, and analytics services.
- [ ] Add environment-specific URLs for the store and training app if needed.
- [ ] Add the shared deploy workflow to the AI repo.

### 7.4 GitHub / Ops Checklist

- [ ] Create issues in each repo from the relevant checklist above.
- [ ] Add `IONOS_API_KEY` and `IONOS_API_SECRET` to each repo's GitHub secrets.
- [ ] Replace the placeholder deploy step with the real IONOS deployment command or script.
- [ ] Verify each repo auto-deploys on push to `main`.
