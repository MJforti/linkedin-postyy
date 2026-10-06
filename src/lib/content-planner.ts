import { ContentPlan, ContentPlanDay } from "./types";

export interface GeneratePlanOptions {
  theme: string;
  targetAudience: string;
  pillarMix?: {
    authority: number;
    narrative: number;
    community: number;
    product: number;
  };
  founderMode?: boolean;
}

export function generate7DayContentPlan(options: GeneratePlanOptions): ContentPlan {
  const theme = options.theme || "Autonomous systems and operational leverage";
  const audience = options.targetAudience || "B2B founders, CTOs, and operators";
  const isFounder = options.founderMode ?? false;

  const days: ContentPlanDay[] = [
    {
      day: "Mon",
      pillar: "Off",
      format: "Comments",
      hookFormula: "—",
      angle: "Engagement Warmup: 15-20 substantive comments across peer creator feeds.",
      ctaType: "Comment threads",
      goal: "Off",
      postingTime: "Active commenting slot: 8:00 AM - 9:30 AM",
    },
    {
      day: "Tue",
      pillar: isFounder ? "Authority" : "Authority",
      format: "Text Post",
      hookFormula: "F7 - Odd-Precision Money Ledger",
      angle: isFounder ? "The exact ledger of running lean infrastructure vs hiring an agency" : `Breakdown of monthly costs to execute ${theme}`,
      ctaType: "Specific question close",
      goal: "saves",
      postingTime: "8:00 AM local",
    },
    {
      day: "Wed",
      pillar: "Narrative",
      format: "Text Post",
      hookFormula: "F4 - Time-Anchor Confession",
      angle: "The bad operating habit we eliminated that immediately restored team velocity",
      ctaType: "Mirror question ('What habit did you stop?')",
      goal: "comments",
      postingTime: "9:30 AM local",
    },
    {
      day: "Thu",
      pillar: "Authority",
      format: "Text + Visual",
      hookFormula: "F17 - Controlled A/B Anecdote",
      angle: `Testing two approaches to ${theme}: one variable flipped, opposite results`,
      ctaType: "Operational test question",
      goal: "comments",
      postingTime: "8:00 AM local",
    },
    {
      day: "Fri",
      pillar: isFounder ? "Community" : "Community",
      format: "Text Post",
      hookFormula: "F14 - Named Gratitude / Tribute",
      angle: "Publicly highlighting 3 team members / mentors whose unglamorous work enabled this milestone",
      ctaType: "Tribute and tagging",
      goal: "reposts",
      postingTime: "9:00 AM local",
    },
    {
      day: "Sat",
      pillar: "Off",
      format: "Rest",
      hookFormula: "—",
      angle: "Feed distribution cooldown (prevents 360Brew cannibalization penalty)",
      ctaType: "—",
      goal: "Off",
      postingTime: "Off",
    },
    {
      day: "Sun",
      pillar: "Off",
      format: "Rest",
      hookFormula: "—",
      angle: "Feed distribution cooldown",
      ctaType: "—",
      goal: "Off",
      postingTime: "Off",
    },
  ];

  return {
    id: `plan-${Date.now()}`,
    theme,
    targetAudience: audience,
    pillars: options.pillarMix || {
      authority: 45,
      narrative: 35,
      community: 15,
      product: 5,
    },
    days,
    dailyCommentTargets: [
      {
        targetArchetype: "Peer founders & operators (5k - 20k followers)",
        recommendedPattern: "First-commenter + Data-First receipt",
        dailyVolume: "10-15 comments daily during morning momentum window",
      },
      {
        targetArchetype: "Category leaders & prospective clients",
        recommendedPattern: "Answer-the-closing-question with a specific operational detail",
        dailyVolume: "5 targeted high-depth comments daily",
      },
    ],
    readinessChecklist: [
      { item: "At least 1 vulnerability post with dated facts (Wednesday)", passed: true },
      { item: "At least 1 receipt/data post with odd numbers (Tuesday)", passed: true },
      { item: "Goal mix spread across saves, comments, and reposts", passed: true },
      { item: "No single pillar exceeds 60% of total weekly volume", passed: true },
      { item: "Weekend cooldown maintained (avoids 360Brew penalty)", passed: true },
    ],
    createdAt: new Date().toISOString(),
  };
}
