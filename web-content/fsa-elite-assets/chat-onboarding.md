# FSA Elite Sales Training — In-Chat Onboarding Script & Automations

**Brand:** FSA Elite Sales Training | FSA Elite Sales App  
**Entity:** Fontenots Sales Association LLC  
**Owner & Creator:** Kaygun Fontenot  

---

## Part 1 — In-Chat Onboarding Script

*For use on fsaeliteperformance.com. Deploy via chat platform (e.g., Intercom, Crisp, Drift). Triggered when a new visitor lands on the site for the first time or when a new user logs in.*

---

### Trigger: New Visitor (Not Logged In)

**Delay:** 15 seconds after page load.

**Message 1 — Greeting:**

> 👋 Hey there! Welcome to **FSA Elite Sales Training**.
>
> I'm here to help you find the right fit — whether you're looking to close more deals, track your performance, or build a complete sales system.
>
> What brings you here today?

**Quick Reply Options:**
- 📚 I want to learn about the training
- 📱 I want to see the Sales App
- 💰 I want to see pricing
- 🤝 I'm interested in the affiliate program
- ❓ Something else

---

**If visitor selects "I want to learn about the training":**

> Great! **FSA Elite Sales Training** is a complete sales system created by Kaygun Fontenot — scripts, habits, closing frameworks, and daily challenges built for real-world sales professionals.
>
> Here's what you get:
> ✓ Video lessons (mobile-friendly, go at your pace)
> ✓ Scripts & templates — customize for your product
> ✓ Objection-handling cheat sheet
> ✓ 30-day sales challenge
> ✓ Community access
> ✓ Lifetime access
>
> Want to see the full curriculum, or are you ready to enroll?

**Quick Reply Options:**
- See the curriculum
- Enroll now
- What's the price?

---

**If visitor selects "I want to see the Sales App":**

> The **FSA Elite Sales App** is your daily performance tracker — built specifically to complement FSA Elite Sales Training.
>
> Track calls, pipeline stages, KPIs, and goals all in one place. Three plans: **Starter**, **Growth**, and **Performance**.
>
> Want me to walk you through the plans, or start your free trial?

**Quick Reply Options:**
- Walk me through the plans
- Start free trial
- What's the price?

---

**If visitor selects "I'm interested in the affiliate program":**

> The FSA Elite Sales Training Affiliate Program is run by **Kaygun Fontenot** and **Fontenots Sales Association LLC**. You can earn 15–25% commission depending on the product.
>
> ⚠️ **Affiliate Disclosure Required:** All promotional content must include an FTC affiliate disclosure. See our full affiliate policy for details.
>
> Ready to apply or want to learn more first?

**Quick Reply Options:**
- Tell me more
- Apply now
- See the affiliate policy

---

### Trigger: New User (Just Created Account / Logged In First Time)

**Delay:** Immediate (triggered on first login event).

**Message 1 — Welcome:**

> 🎉 Welcome to FSA Elite, [First Name]!
>
> I'm here to make sure you get the most out of your access right away.
>
> What did you just sign up for?

**Quick Reply Options:**
- FSA Elite Sales Training Course
- FSA Elite Sales App (Starter)
- FSA Elite Sales App (Growth)
- FSA Elite Sales App (Performance)

---

**If user selects "FSA Elite Sales Training Course":**

> Perfect! Here's your quick-start checklist:
>
> ✅ **Step 1:** Go to your [Dashboard] and click **Start Learning**
> ✅ **Step 2:** Complete Module 1 today (30 minutes)
> ✅ **Step 3:** Download the **Objection-Handling Cheat Sheet** from the Resources tab
> ✅ **Step 4:** Join the FSA Elite community: [Community Link]
>
> Any questions as you get started? I'm here.

---

**If user selects any FSA Elite Sales App plan:**

> Welcome to the FSA Elite Sales App! Let's get your account set up in 5 minutes:
>
> ✅ **Step 1:** Set your daily goals (calls, demos, closes) in the **Goals** tab
> ✅ **Step 2:** Log your first activity — even yesterday's calls count
> ✅ **Step 3:** Explore the **Objection-Handling Reference** in the Resources tab
> ✅ **Step 4:** [Growth/Performance only] Register for the next group coaching call with Kaygun Fontenot: [Coaching Registration Link]
>
> Need anything? Just ask me here.

---

## Part 2 — Lead Capture Automations

### Automation 1 — Exit-Intent Lead Capture

**Trigger:** Visitor moves cursor toward browser close/back button on product or pricing pages.

**Chat Message:**

> Before you go — want me to send you a quick overview of FSA Elite Sales Training?
>
> Drop your email and I'll send it to you right now. No spam, just the info you need to make a good decision.

**Form Fields:** First Name, Email Address  
**On Submit:** Add to email list → Tag: `exit-intent-lead` → Enter Cart Recovery email sequence (see email-nurture-sequences.md).

---

### Automation 2 — Pricing Page Lead Capture

**Trigger:** Visitor spends 60+ seconds on the pricing page without clicking a plan CTA.

**Chat Message:**

> Not sure which plan is right for you? Tell me a bit about your situation and I'll give you my honest recommendation.
>
> What best describes you?

**Quick Reply Options:**
- I'm an individual sales rep
- I manage a sales team
- I'm a business owner who sells
- I'm just browsing pricing

**On Reply:** Capture response → Qualify visitor → Route to appropriate plan recommendation and CTA.

---

### Automation 3 — Post-Purchase Welcome (App)

**Trigger:** User logs in for the first time after purchasing an FSA Elite Sales App plan.

**Chat Message:**

> 🎉 Welcome aboard, [First Name]! Your [Plan Name] is active.
>
> Want me to walk you through setting up your first goal and logging your first activity? It takes about 3 minutes and makes a big difference in your results.

**Quick Reply Options:**
- Yes, walk me through it
- I've got it, thanks!

---

### Automation 4 — Trial Expiration Warning (In-App Chat)

**Trigger:** Free trial has 48 hours remaining.

**Chat Message:**

> ⏰ Heads up, [First Name] — your free trial ends in 48 hours.
>
> Don't lose your progress! Upgrade now to keep your data and stay on track.
>
> [Upgrade to Growth] [Upgrade to Starter]
>
> Questions about plans? Ask me here.

---

## Part 3 — Automation Rules

| Rule | Trigger | Action |
|---|---|---|
| New visitor greeting | Page load + 15-second delay | Display onboarding message |
| Exit intent capture | Cursor move toward close | Display exit-intent email capture |
| Pricing page nudge | 60+ seconds on pricing with no CTA click | Display plan recommendation question |
| Post-purchase onboarding | First login after purchase | Display welcome + setup checklist |
| Trial expiration warning | 48 hours before trial end | Display upgrade prompt |
| Cart abandonment | Cart created + 30 min with no purchase | Trigger cart recovery email sequence |
| Affiliate inquiry | Visitor selects affiliate option | Display affiliate info + FTC disclosure notice |
| Merchandise inquiry | Trigger keywords matched (see intents-chat-responses.md Intent 20) | Display merchandise approval note |

---

## Part 4 — Affiliate Disclosure (In-Chat)

When the chat platform is being operated by or on behalf of an affiliate (not FSA Elite directly), the following disclosure must be displayed prominently at the start of the chat session:

> **Affiliate Disclosure:** This chat support is provided by [Affiliate Name], an authorized affiliate of FSA Elite Sales Training (a brand of Fontenots Sales Association LLC, owned by Kaygun Fontenot). If you purchase through a link provided here, [Affiliate Name] may earn a commission at no additional cost to you.

This disclosure is mandatory under FTC guidelines and FSA Elite affiliate policy. Failure to include the disclosure is a violation of the affiliate terms of service.

---

*© Fontenots Sales Association LLC. All rights reserved. Authorized by Kaygun Fontenot.*
