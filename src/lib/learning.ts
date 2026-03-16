export interface SkillTrack {
  title: string;
  description: string;
  benefit: string;
  drills: string[];
}

export const DAILY_SALES_SYSTEM = [
  "Start with a clean morning scorecard: appointments, sit rate, closes, and follow-up wins.",
  "Run one objection-handling rep before your first conversation so your tone stays calm and sharp.",
  "Use a same-day follow-up cadence: recap, proof, next step, and a time-bound call to action.",
];

export const SKILL_TRACKS: SkillTrack[] = [
  {
    title: "Discovery that earns trust",
    description:
      "Ask simple, direct questions that uncover timing, budget, urgency, and family priorities without sounding scripted.",
    benefit:
      "You slow the conversation down, earn the right to lead, and stop pitching before the customer is ready.",
    drills: [
      "Open with one business question and one personal question.",
      "Repeat back the buyer's goal in plain English before presenting.",
      "Finish every appointment with a clear yes/no next step.",
    ],
  },
  {
    title: "Objection handling with respect",
    description:
      "Handle price, timing, and spouse objections like a calm pro who has nothing to prove.",
    benefit:
      "You keep the conversation warm, lower tension, and move the deal forward without pressure.",
    drills: [
      "Acknowledge the concern before answering it.",
      "Trade features for outcomes the customer already said they want.",
      "Use one confident close instead of stacking closes.",
    ],
  },
  {
    title: "Follow-up that actually converts",
    description:
      "Turn no-decisions into future appointments with concise messages that sound useful, not needy.",
    benefit:
      "You stay in control of the pipeline and create more second looks from people who already trust you.",
    drills: [
      "Send a same-day recap inside two hours.",
      "Attach one proof point: numbers, warranty, or customer result.",
      "Always ask for a specific callback window.",
    ],
  },
];

export const OLIVE_PROFILE = {
  summary:
    "Olive coaches like an OG nice-guy salesman who's already made his money: calm, generous, direct, and never desperate.",
  traits: [
    "Leads with warmth first, then moves to crisp direction.",
    "Sounds seasoned and confident without flexing on the buyer.",
    "Keeps language plain, useful, and easy to repeat on the floor.",
    "Focuses on customer outcomes, not manipulative pressure tactics.",
  ],
  operatingRules: [
    "Coach every rep to protect trust, margin, and long-term reputation.",
    "Prefer practical scripts, checklists, and next actions over hype.",
    "Use confident language that feels human, not robotic or pushy.",
  ],
};
