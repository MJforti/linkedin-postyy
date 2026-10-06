export type EngagementGoal = "comments" | "reposts" | "likes" | "saves";

export type PostTone = "direct" | "conversational" | "analytical" | "story-driven" | "opinionated" | "founder";

export type PostFormat = "text" | "carousel" | "video" | "image" | "poll";

export type ReactionType = "LIKE" | "PRAISE" | "EMPATHY" | "INTEREST" | "APPRECIATION" | "ENTERTAINMENT";

export type PostStatus = "draft" | "scheduled" | "published" | "failed";

export interface HookFormula {
  code: string; // e.g. "F1", "F17"
  name: string;
  referenceEngagement: string;
  bestFor: EngagementGoal;
  skeleton: string;
  whyItWorks: string;
  reachNote2026: string;
  isStructural?: boolean;
}

export interface FounderAngle {
  code: string; // e.g. "A1", "A9"
  name: string;
  territory: string;
  primaryGoal: EngagementGoal;
  pinnedFormula?: string;
  description: string;
  template: string;
}

export interface VoiceProfile {
  name: string;
  tagline: string;
  tone: string;
  styleDescription: string;
  avoidWords: string[];
  preferredWords: string[];
  ctaPreferences: string;
  formattingRules: string[];
  examples: string[];
  filled: boolean;
}

export interface PostDraft {
  id: string;
  title: string;
  topic: string;
  content: string;
  formulaCode?: string;
  founderAngleCode?: string;
  goal: EngagementGoal;
  tone: PostTone;
  targetAudience: string;
  charCount: number;
  status: PostStatus;
  scheduledTime?: string; // ISO
  publishedAt?: string; // ISO
  mediaUrls?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface HumanizerResult {
  original: string;
  humanized: string;
  tellsDetected: {
    category: "forensic" | "strict_vocab" | "grammar" | "reveal_bridge" | "parallelism" | "rhythm";
    description: string;
    trigger: string;
    replacement?: string;
  }[];
  confidence: "reads human" | "mixed" | "reads AI";
  densityScore: number;
  wordCount: number;
  charCount: number;
  summaryOfChanges: string[];
}

export interface PostAnalysis {
  url?: string;
  rawText: string;
  hookLine: string;
  hookLength: number;
  totalLength: number;
  sentenceCount: number;
  detectedFormula?: string;
  formulaConfidence?: string;
  strengths: string[];
  weaknesses: string[];
  algorithmScoreSummary: {
    lengthCheck: "optimal" | "acceptable" | "suboptimal";
    hookCheck: "strong" | "risky" | "acceptable" | "weak";
    densityCheck: "passed" | "overloaded";
    externalLinkFound: boolean;
    hasClosingQuestion: boolean;
    hasPsNote: boolean;
  };
  recommendations: string[];
}

export interface CommentDraft {
  id: string;
  postUrl: string;
  targetAuthor?: string;
  postSnippet?: string;
  variant: number;
  content: string;
  templateName: string;
  reaction: ReactionType;
  whyThisFits: string;
  charCount: number;
}

export interface ContentPlanDay {
  day: string; // "Mon", "Tue", etc.
  pillar: "Authority" | "Narrative" | "Community" | "Product" | "Off";
  format: string;
  hookFormula: string;
  angle: string;
  ctaType: string;
  goal: EngagementGoal | "Off";
  postingTime?: string;
}

export interface ContentPlan {
  id: string;
  theme: string;
  targetAudience: string;
  pillars: {
    authority: number;
    narrative: number;
    community: number;
    product: number;
  };
  days: ContentPlanDay[];
  dailyCommentTargets: {
    targetArchetype: string;
    recommendedPattern: string;
    dailyVolume: string;
  }[];
  readinessChecklist: {
    item: string;
    passed: boolean;
  }[];
  createdAt: string;
}

export interface ProfileAudit {
  headline: {
    current: string;
    recommended: string;
    charCount: number;
    critique: string;
  };
  about: {
    current: string;
    recommended: string;
    wordCount: number;
    hookSnippet: string;
    critique: string;
  };
  scorecard: {
    component: string;
    status: "pass" | "needs-work" | "missing";
    criteria2026: string;
    fix: string;
  }[];
  expectedUplift: string[];
}

export interface IntegrationStatus {
  publoraConfigured: boolean;
  publoraKeyPresent: boolean;
  linkedinPlatformIdPresent: boolean;
  apifyConfigured: boolean;
  pixfaroConfigured: boolean;
}
