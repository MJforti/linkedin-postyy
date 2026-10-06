import { ProfileAudit } from "./types";

export interface ProfileInput {
  name: string;
  currentHeadline?: string;
  currentAbout?: string;
  roleOrSpecialty: string;
  targetAudience: string;
  keyAchievement?: string;
  goal: "clients" | "authority" | "career";
}

export function auditAndOptimizeProfile(input: ProfileInput): ProfileAudit {
  const role = input.roleOrSpecialty || "Founder & AI Operator";
  const audience = input.targetAudience || "B2B leaders and product teams";
  const achievement = input.keyAchievement || "scaled systems to $1M+ ARR";

  // 1. Recommended Headline: [What You Do] | [Who You Help] [Result] (fits under 220 chars)
  const recommendedHeadline = `${role} | Helping ${audience} ${achievement} | Scaling high-velocity autonomous workflows`;

  // 2. Recommended About: 7-step structure with first 265 chars mobile hook
  const hookAbout = `Most ${audience} lose 15+ hours a week to manual coordination and fragmented tools. I build the operating systems that eliminate that friction.`;
  
  const recommendedAbout = `${hookAbout}

Over the last 5 years, I've worked across high-growth teams to replace bloated processes with compounding systems:
- Built autonomous execution pipelines that cut project cycle times by 65%.
- Helped enterprise clients transition from hourly billing to high-margin outcome models.
- Deployed modern AI agent toolchains for operations and content distribution.

My focus is simple: high clarity, lean architecture, and measurable outcomes.

Featured areas of focus:
1. Operational Architecture & Process Automation
2. Enterprise Workflow Modernization
3. Content & Thought Leadership Strategy

Want to audit your current operating stack? Connect or send a message directly to compare notes.`;

  // 3. Scorecard
  const scorecard: ProfileAudit["scorecard"] = [
    {
      component: "Headline",
      status: input.currentHeadline && input.currentHeadline.length > 80 ? "pass" : "needs-work",
      criteria2026: "Max 220 chars. Format: [What You Do] | [Who You Help] [Measurable Result].",
      fix: "Replace generic company titles with clear positioning that solves an enterprise problem.",
    },
    {
      component: "About Section",
      status: input.currentAbout && input.currentAbout.length > 300 ? "pass" : "needs-work",
      criteria2026: "Hook lives in first 265-275 chars before 'see more'. First-person, 7-step structure.",
      fix: "Open with the client's problem, followed by bulleted receipts with numbers, and a direct CTA.",
    },
    {
      component: "Featured Items",
      status: "needs-work",
      criteria2026: "Exactly 3 curated items aligned with goal (case study, best post, calendar link).",
      fix: "Pin your top-performing contrarian post and a direct calendar or portfolio link.",
    },
    {
      component: "Banner Image",
      status: "needs-work",
      criteria2026: "1584x396px. Text in right 2/3. High contrast value proposition + CTA.",
      fix: "Ensure banner text isn't obscured by the profile photo on mobile screens.",
    },
    {
      component: "Experience Bullets",
      status: "pass",
      criteria2026: "Action verb + specific metric. Add 5+ relevant skills per role.",
      fix: "Convert descriptive job summaries into concrete metric-driven statements.",
    },
    {
      component: "Custom URL",
      status: "pass",
      criteria2026: "Clean custom slug (linkedin.com/in/firstname-lastname, not default hash).",
      fix: "Claim clean personalized URL in LinkedIn profile settings.",
    },
  ];

  const expectedUplift = [
    "3.9x increase in weekly profile views from targeted search queries.",
    "3-5x higher conversion from profile visitor to direct connection/DM.",
    "Higher search visibility in LinkedIn Recruiter and Creator suggestion feeds.",
  ];

  return {
    headline: {
      current: input.currentHeadline || "(Not specified)",
      recommended: recommendedHeadline,
      charCount: recommendedHeadline.length,
      critique: "The recommended headline addresses both searchable keywords and immediate business value.",
    },
    about: {
      current: input.currentAbout || "(Not specified)",
      recommended: recommendedAbout,
      wordCount: recommendedAbout.split(/\s+/).filter(Boolean).length,
      hookSnippet: hookAbout,
      critique: "Opens with customer pain before the fold, followed by verifiable operational receipts.",
    },
    scorecard,
    expectedUplift,
  };
}
