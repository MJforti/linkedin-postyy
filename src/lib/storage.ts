import { PostDraft, VoiceProfile, ContentPlan } from "./types";

const DRAFTS_KEY = "linkedin_os_drafts_v1";
const VOICE_PROFILE_KEY = "linkedin_os_voice_profile_v1";
const CONTENT_PLAN_KEY = "linkedin_os_content_plan_v1";

export const DEFAULT_VOICE_PROFILE: VoiceProfile = {
  name: "Operator Voice",
  tagline: "High-conviction, metric-backed practitioner insights",
  tone: "Direct, analytical, and conversational",
  styleDescription: "1-2 sentence paragraphs with blank lines. Number-first hooks. No corporate fluff.",
  avoidWords: [
    "leverage",
    "delve",
    "unlock",
    "foster",
    "streamline",
    "seamless",
    "robust",
    "paradigm",
    "landscape",
    "fundamentally",
    "game-changer",
  ],
  preferredWords: [
    "shipped",
    "operating architecture",
    "unit economics",
    "turnaround",
    "receipts",
    "compound",
    "throughput",
  ],
  ctaPreferences: "Experience-anchored closing question + 1-line P.S. note",
  formattingRules: [
    "First line must contain a concrete number or sharp statement",
    "Never open with a question (-34% median likes)",
    "Maximum 1 contrast and 1 triple per post",
    "Double line breaks between ideas",
  ],
  examples: [
    "$24,500 retainer vs. an 8-minute pipeline run.\n\nLast month, a Series B founder I know ran an experiment on their Q2 launch.",
    "A Fortune 500 retail bank just pulled a $14.2M migration contract from an offshore vendor.",
  ],
  filled: true,
};

export const INITIAL_SEED_DRAFTS: PostDraft[] = [
  {
    id: "draft-ai-agencies-hit-2",
    title: "AI Agencies vs Traditional Retainers (#2)",
    topic: "Why autonomous AI agencies are replacing traditional billable retainers",
    formulaCode: "F17",
    founderAngleCode: "A9",
    goal: "comments",
    tone: "direct",
    targetAudience: "Founders, CMOs, Agency Owners",
    charCount: 1220,
    status: "draft",
    content: `$24,500 retainer vs. an 8-minute pipeline run.

Last month, a Series B founder I know ran a quiet experiment on their Q2 product launch.

Brief A went to their incumbent London performance agency, which meant 14 people on a shared Slack channel, two account directors, and a mandatory weekly status call.

Brief B went to a 2-person autonomous shop running Claude, Cursor, and Make.

Both teams got the exact same positioning deck and the same $15,000 ad budget.

The legacy agency needed 19 business days to turn in 6 ad concepts. Three were slight variations of a safe Figma carousel they had already billed at $175 an hour for "creative strategy."

The 2-person shop delivered 48 localized video cuts, 12 landing page variants, and full attribution webhooks in 38 hours.

The invoice breakdown tells the rest:
- Agency A: $24,500 retainer and two weeks of feedback bottlenecks.
- Agency B: $4,200 project fee plus $184 in API tokens.

Traditional agencies sell payroll hours to defend their margin. AI agencies sell software systems that work while you sleep.

When a retainer model rewards billable friction, sheer execution speed is an active financial threat.

If you run an agency today, what is the single operational task your clients still pay you to do manually that an autonomous stack could run before breakfast?

P.S. If you're building an autonomous agency stack, are you pricing on compute tokens or performance outcomes?

#AgencyGrowth #ArtificialIntelligence`,
    createdAt: "2026-10-06T17:46:00.000Z",
    updatedAt: "2026-10-06T17:46:00.000Z",
  },
  {
    id: "draft-it-sector-ai-hit-2",
    title: "IT Sector Billable Hour Disruption (#2)",
    topic: "Why enterprise IT outsourcing is collapsing under AI code velocity",
    formulaCode: "F17",
    goal: "comments",
    tone: "analytical",
    targetAudience: "Enterprise CTOs, IT Leaders, Software Engineers",
    charCount: 1540,
    status: "draft",
    content: `A Fortune 500 retail bank just pulled a $14.2M migration contract from an offshore vendor.

The vendor had estimated 48 engineers and nine months to move an internal payments engine over to cloud infrastructure.

A 3-person internal team built the functional core in 11 days using Claude and automated test harnesses.

What the IT services sector is dealing with right now is not a cyclical tech slump. The basic economics of the billable hour are breaking down.

For twenty-five years, IT outsourcing was a straightforward margin game: hire engineers at $25 an hour, bill enterprise accounts at $95 an hour, and keep project timelines comfortable so the monthly invoices stayed fat. Headcount on a bench was the whole business model.

That math collapsed the minute autonomous tools showed up.

Enterprise CTOs are looking at their vendor statements with fresh eyes:
- A 14-person manual QA team costs half a million dollars a year, but continuous synthetic tests run for $200 a month.
- Legacy system discovery that used to take six months can now be mapped in 48 hours with local models.
- Billing 40 hours a week for junior developers to write boilerplate APIs makes zero sense when a single architect with Cursor finishes the sprint by Wednesday.

The real trap for legacy consultancies is how they make money.

If an IT firm uses AI to solve a client's problem in two weeks instead of nine months, their billable revenue drops by 90%.

They cannot afford to move fast because speed kills their own revenue.

Enterprises have stopped paying for bodies in seats.. they just want working software in production.

If you lead an engineering department or work in enterprise IT, how many seats on your current contracts exist purely because the billing structure penalizes speed?

P.S. If you're on the vendor side, how are your clients handling requests for AI productivity discounts on upcoming renewals?

#ITServices #SoftwareEngineering`,
    createdAt: "2026-10-06T17:53:00.000Z",
    updatedAt: "2026-10-06T17:53:00.000Z",
  },
];

export function getStoredDrafts(): PostDraft[] {
  if (typeof window === "undefined") return INITIAL_SEED_DRAFTS;
  try {
    const raw = localStorage.getItem(DRAFTS_KEY);
    if (!raw) {
      localStorage.setItem(DRAFTS_KEY, JSON.stringify(INITIAL_SEED_DRAFTS));
      return INITIAL_SEED_DRAFTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_SEED_DRAFTS;
  }
}

export function saveDraft(draft: PostDraft): void {
  if (typeof window === "undefined") return;
  try {
    const drafts = getStoredDrafts();
    const existingIdx = drafts.findIndex((d) => d.id === draft.id);
    if (existingIdx >= 0) {
      drafts[existingIdx] = { ...draft, updatedAt: new Date().toISOString() };
    } else {
      drafts.unshift({ ...draft, updatedAt: new Date().toISOString() });
    }
    localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
  } catch (e) {
    console.error("Failed to save draft", e);
  }
}

export function deleteDraft(id: string): void {
  if (typeof window === "undefined") return;
  try {
    const drafts = getStoredDrafts().filter((d) => d.id !== id);
    localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
  } catch (e) {
    console.error("Failed to delete draft", e);
  }
}

export function getStoredVoiceProfile(): VoiceProfile {
  if (typeof window === "undefined") return DEFAULT_VOICE_PROFILE;
  try {
    const raw = localStorage.getItem(VOICE_PROFILE_KEY);
    if (!raw) return DEFAULT_VOICE_PROFILE;
    return JSON.parse(raw);
  } catch {
    return DEFAULT_VOICE_PROFILE;
  }
}

export function saveVoiceProfile(profile: VoiceProfile): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(VOICE_PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error("Failed to save voice profile", e);
  }
}

export function getStoredContentPlan(): ContentPlan | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONTENT_PLAN_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveContentPlan(plan: ContentPlan): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CONTENT_PLAN_KEY, JSON.stringify(plan));
  } catch (e) {
    console.error("Failed to save content plan", e);
  }
}
