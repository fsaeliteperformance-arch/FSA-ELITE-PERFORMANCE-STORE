export interface ExperienceStep {
  title: string;
  href: string;
  summary: string;
  actionLabel: string;
}

export const EXPERIENCE_LOOP: ExperienceStep[] = [
  {
    title: "Content",
    href: "/content",
    summary:
      "Attract the right audience with practical sales content that earns attention.",
    actionLabel: "Explore content",
  },
  {
    title: "Training App",
    href: "/training-app",
    summary:
      "Turn interest into progress with guided training that builds daily habits.",
    actionLabel: "Open training app",
  },
  {
    title: "Store",
    href: "/products",
    summary:
      "Support the brand with gear and tools that keep FSA Elite top of mind.",
    actionLabel: "Shop the store",
  },
  {
    title: "Community",
    href: "/community",
    summary:
      "Keep members connected through accountability, wins, and shared momentum.",
    actionLabel: "Join the community",
  },
  {
    title: "Repeat",
    href: "/content",
    summary:
      "Feed the loop again so new prospects and members keep cycling through.",
    actionLabel: "Start again",
  },
];
