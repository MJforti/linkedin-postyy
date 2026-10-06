import { EngagementGoal, PostTone, VoiceProfile } from "./types";
import { HOOK_FORMULAS, FOUNDER_ANGLES, getFormulaByCode } from "./hook-formulas";
import { humanizeLinkedInText } from "./humanizer";

export interface GeneratePostOptions {
  topic: string;
  targetAudience?: string;
  goal?: EngagementGoal;
  tone?: PostTone;
  context?: string;
  formulaCode?: string;
  founderAngleCode?: string;
  voiceProfile?: Partial<VoiceProfile>;
}

export function generatePostDraft(options: GeneratePostOptions): {
  content: string;
  formulaCode: string;
  founderAngleCode?: string;
  title: string;
  charCount: number;
} {
  const goal: EngagementGoal = options.goal || "comments";
  const tone: PostTone = options.tone || "direct";
  const topic = options.topic.trim();
  const audience = options.targetAudience?.trim() || "B2B leaders and operators";
  const context = options.context?.trim() || "";

  // 1. Pick formula: explicitly chosen, or mapped from founder angle, or picked by goal
  let formulaCode = options.formulaCode;
  let founderAngleCode = options.founderAngleCode;

  if (founderAngleCode) {
    const angle = FOUNDER_ANGLES.find((a) => a.code.toUpperCase() === founderAngleCode?.toUpperCase());
    if (angle && angle.pinnedFormula && !formulaCode) {
      formulaCode = angle.pinnedFormula;
    }
  }

  if (!formulaCode) {
    if (goal === "saves") formulaCode = "F7";
    else if (goal === "reposts") formulaCode = "F2";
    else if (goal === "likes") formulaCode = "F11";
    else formulaCode = "F17";
  }

  const formula = getFormulaByCode(formulaCode) || HOOK_FORMULAS[0];

  // 2. Draft construction according to the formula
  let rawDraft = "";

  if (formula.code === "F7") {
    // Odd-Precision Money Ledger
    rawDraft = `$1,842.30 monthly software stack vs. a $24,000 headcount budget.

Last month, we audited what it actually takes to run ${topic}.

Here is every single line item from the ledger:
- Primary inference API: $412.50
- Automated workflow runner: $78.00
- Custom scraping & validation: $184.20
- Database & edge hosting: $42.00
- Human QA & review: $1,125.60

${context ? `${context}\n\n` : ""}The old way sold hours to defend agency margin.
The new way builds compounding software systems that execute in minutes.

If your team is tackling ${topic} this quarter, what is the single biggest expense line you still pay manually?

P.S. Are you building this workflow internally, or hiring an external partner?`;
  } else if (formula.code === "F2") {
    // R.I.P. Category Obituary
    rawDraft = `R.I.P. the traditional playbook for ${topic}.

Cause of death: 94% faster execution and zero tolerance for coordination bloat.

For years, everyone in ${audience} followed the standard routine:
Plan for 3 weeks, hold 4 alignment meetings, and deliver safe incremental revisions.

That playbook collapsed over the last six months.

Under the hood, three things broke:
1. Legacy discovery phases that took 6 weeks are mapped in 48 hours.
2. The cost to test an idea dropped by 80%.
3. Speed is no longer an advantage.. it is the entry fee.

${context ? `${context}\n\n` : ""}The winners in 2026 aren't the biggest teams with the most seats. They are the leanest operators with the best workflows.

Where does your team still feel the friction of the old model?

P.S. Let me know what operational bottleneck you wish would disappear.`;
  } else if (formula.code === "F17") {
    // Controlled A/B Anecdote
    rawDraft = `Team A took 19 business days to ship ${topic}.
Team B took 38 hours.

Same initial brief. Same budget.
The only difference was their operating architecture.

Team A relied on layered approvals, status syncs, and manual handoffs.
Team B used autonomous toolchains, shared context windows, and instant test pipelines.

${context ? `${context}\n\n` : ""}When an operating model rewards billable hours, speed is treated as a risk to margin.
When a model rewards outcomes, speed compounds everything.

If you lead ${audience}, what is the one task your team still handles manually that could run before breakfast?

P.S. Drop a note below if you'd like to see the exact workflow teardown.`;
  } else if (formula.code === "F4") {
    // Time-Anchor Confession
    rawDraft = `90 days ago, I stopped doing ${topic} the traditional way.

The immediate consequence: our weekly hours spent on coordination dropped by 42%.

For years, I believed that more meetings and more check-ins equaled better quality control.
The quiet reality was that it just slowed our best builders down and created calendar fatigue.

So in Q1, we killed the syncs and switched to asynchronous changelogs.

${context ? `${context}\n\n` : ""}The lesson was simple: accountability comes from shipped software, not standing meetings.

What is one habitual practice your team stopped doing that quietly unlocked massive velocity?

P.S. Share your favorite habit reset below.`;
  } else {
    // F10 / Default Contrarian Receipts
    rawDraft = `The consensus take on ${topic} has been quietly eroding since late 2024.

Everyone in ${audience} keeps repeating the same advice:
"Wait for the dust to settle before changing your core operations."

Here is what the real data says:
- Early movers cut delivery cycles by 60%.
- Traditional overhead costs are compounding while automation costs drop 10x yearly.
- The gap between teams using autonomous workflows and teams holding meetings is widening every week.

${context ? `${context}\n\n` : ""}The greatest risk is not testing new systems too early. It is defending manual friction for too long.

How is your organization rethinking ${topic} this year?

P.S. Curious what stack decisions you made this quarter.`;
  }

  // 3. Apply humanizer pass to clean any AI tells
  const humanized = humanizeLinkedInText(rawDraft);

  return {
    content: humanized.humanized,
    formulaCode: formula.code,
    founderAngleCode,
    title: `${topic.slice(0, 40)} (${formula.code})`,
    charCount: humanized.charCount,
  };
}
