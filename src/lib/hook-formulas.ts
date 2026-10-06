import { HookFormula, FounderAngle, EngagementGoal } from "./types";

export const HOOK_FORMULAS: HookFormula[] = [
  {
    code: "F1",
    name: "Platform Risk Anaphora",
    referenceEngagement: "4,240 eng",
    bestFor: "comments",
    reachNote2026: "Put specific numbers in line 1-2. Avoid generic bridges.",
    whyItWorks: "Loss aversion stacked 5x creates immediate category stakes.",
    skeleton: `{Platform1} can throttle your reach tomorrow.
{Platform2} can ban your account without warning.

You don't own the audience. You don't own the feed. You're renting attention.

[Concrete observation or number]
[The real asset that survives]
[3 concrete tactics]
[Personal audit question]`,
  },
  {
    code: "F2",
    name: "R.I.P. Category Obituary",
    referenceEngagement: "3,822 eng",
    bestFor: "reposts",
    reachNote2026: "High repost rate. Ensure cause of death has verifiable figures.",
    whyItWorks: "Status threat + relief combo. Reframes 'I am behind' into 'the game changed.'",
    skeleton: `R.I.P. {category}.

Cause of death: {specific mechanism + numbers}.

I defended {old approach} publicly through most of 2024.
It worked. Until [specific shift].

Under the hood, three things broke:
1. [Receipt 1 with stat]
2. [Receipt 2 with stat]
3. [Receipt 3 with stat]

The winners aren't {old archetype}. They are {new archetype}.
[One-line philosophical close]`,
  },
  {
    code: "F3",
    name: "Year-over-Year Pivot",
    referenceEngagement: "494 eng (3.74x)",
    bestFor: "comments",
    reachNote2026: "Number-first line lifts median likes +34%. Closing mirror question is +3%.",
    whyItWorks: "Two-line contrast with concrete numbers makes identity shift feel earned.",
    skeleton: `In 2024, I {humble benchmark with numbers}.
In 2026, I {transformational milestone with numbers}.

[Line 3: the first concrete number of the turning point]
[Vulnerable truth + what broke along the way]
[The identity reframe: shift wasn't tools, it was operating habits]
[Mirror question: 'What was your turning point?']`,
  },
  {
    code: "F4",
    name: "Time-Anchor Confession",
    referenceEngagement: "1,519+ eng",
    bestFor: "comments",
    reachNote2026: "No 'Let me be honest' announcements. State the uncomfortable fact flat in line 1.",
    whyItWorks: "Confession earns the room. Specific numbers kill fake vulnerability.",
    skeleton: `{N} months ago, I stopped {widespread habit}.

[Line 2: first concrete consequence with a dollar or percentage number]
[The quiet operational cost it was taking behind closed doors]
[The new protocol that replaced it]
[Unexpected upside and metrics]
[Closing question inviting readers to share their stopped habit]`,
  },
  {
    code: "F5",
    name: "Self-Proving Meta",
    referenceEngagement: "1,082 eng",
    bestFor: "comments",
    reachNote2026: "Must be a genuine public test, not engagement bait.",
    whyItWorks: "Reader action validates the claim. Public accountability hook.",
    skeleton: `Most posts die in the first 30 minutes.
Not because the algorithm is broken, but because {real mechanism with metrics}.

So here is the public test for the next 24 hours:
[Commitment with verifiable benchmark]
[Low-bar reader action]
If the thesis is right: [outcome]. If wrong: [admit post].`,
  },
  {
    code: "F6",
    name: "Comment-Gate Lead Magnet",
    referenceEngagement: "717-3,008 eng",
    bestFor: "comments",
    reachNote2026: "Use with caution. Real deliverable only. Never use 'comment X to get Y' phrasing.",
    whyItWorks: "Real named deliverable + verified authority delivers high DM conversations.",
    skeleton: `[Authority number: 'We analyzed 4,800 campaigns across 18 months']
[Counter-intuitive pattern observed]
So I turned the system into {N named frameworks}.
[Breakdown of components]
[Genuine question about reader's workflow]`,
  },
  {
    code: "F7",
    name: "Odd-Precision Money Ledger",
    referenceEngagement: "1,755 eng (9.4x)",
    bestFor: "saves",
    reachNote2026: "STRONGEST 2026 OPENER: Odd-precision number in line 1 (+34% median likes).",
    whyItWorks: "Non-rounded numbers signal real ledger accounting. Dwell time stays high.",
    skeleton: `\${Odd dollar number, e.g. $873.40}

That is the exact monthly cost to run {system that used to cost $15,000}.
Here is every line item from the ledger:
- {Tool A}: $XX.XX
- {Tool B}: $XX.XX
- {Tool C}: $XX.XX

[What this operational shift taught us]
[P.S. note on pricing models]`,
  },
  {
    code: "F8",
    name: "Paid-vs-Free Reversal",
    referenceEngagement: "550 eng (19.64x)",
    bestFor: "saves",
    reachNote2026: "Drives highest save ratio. Actionable steps beat generic advice.",
    whyItWorks: "Pattern interrupt from paid consultation to open teardown framework.",
    skeleton: `I usually charge {client type} $X for {audit}.
Today, here is the exact framework for free.

[Step 1: Metric-driven instruction]
[Step 2: Metric-driven instruction]
[Step 3: Metric-driven instruction]
[Summary + where to test it today]`,
  },
  {
    code: "F9",
    name: "Curiosity-Gap Teaser",
    referenceEngagement: "306 eng (4.25x)",
    bestFor: "comments",
    reachNote2026: "Pay off the gap within 2 lines before mobile fold. Avoid cliché buzzwords.",
    whyItWorks: "Specific surprising anomaly creates scroll lock.",
    skeleton: `Yesterday, our {system} did something unexpected.
It {specific surprising event with numbers}.

[Line 3: concrete resolution of what happened]
[Sensory anchor: watching logs with morning coffee]
[Reframe of what this means for the industry]
[Closing question]`,
  },
  {
    code: "F10",
    name: "Contrarian + Historical Receipts",
    referenceEngagement: "3,083 eng",
    bestFor: "comments",
    reachNote2026: "Contrarian take must bring historical receipts and dates.",
    whyItWorks: "Challenging conventional wisdom with timeline data sparks passionate threads.",
    skeleton: `{Industry sacred cow} has been quietly dying since {year}.

In 2021: [Data point A]
In 2023: [Data point B]
In 2026: [Data point C]

The reason nobody admits it publicly: [commercial incentive].
[What practitioners are doing instead]
[Closing challenge question]`,
  },
  {
    code: "F11",
    name: "Emotional Cold-Open",
    referenceEngagement: "High-reach (likes)",
    bestFor: "likes",
    reachNote2026: "In-medias-res scene. No all-caps, no dramatic warmup.",
    whyItWorks: "Immediate human stakes pull readers in before analytical defenses kick in.",
    skeleton: `[In-medias-res moment: date, room, exact words said]
[The failure or crossroads]
[The decision made with no safety net]
[What that lesson actually cost]
[Warm reflective landing]`,
  },
  {
    code: "F12",
    name: "Permission Slip",
    referenceEngagement: "Comment-heavy",
    bestFor: "comments",
    reachNote2026: "Needs a dated fact from your own record to avoid generic platitude trap.",
    whyItWorks: "Second-person reassurance causes readers to tag themselves in comments.",
    skeleton: `In {year}, I shipped zero features for 4 months and the company survived.
You are allowed to {specific operational permission}.
[Why grinding on the wrong metric is dangerous]
[Single concrete permission]
[Soft open question]`,
  },
  {
    code: "F13",
    name: "Bait-and-Switch Reversal",
    referenceEngagement: "High-reach (likes)",
    bestFor: "likes",
    reachNote2026: "Fake bad news must resolve into a genuine upgrade, not corporate spin.",
    whyItWorks: "Brief tension followed by relief generates strong like velocity.",
    skeleton: `No more {standard corporate perk/policy} across our team.
We also cancelled {second expectation}.
[Beat of suspense]
We replaced both with {clean upgrade with specific metrics}.
[Why output improved]`,
  },
  {
    code: "F14",
    name: "Named Gratitude / Tribute",
    referenceEngagement: "Repost-heavy",
    bestFor: "reposts",
    reachNote2026: "Name real people for specific actions, never a generic triad of praise.",
    whyItWorks: "Celebrating others gets shared far more than self-promotion.",
    skeleton: `To {Person 1}, {Person 2}, and {Person 3}:
[Concrete act Person 1 did and what it saved]
[Concrete act Person 2 did and what it built]
[Why true operators are built through collaboration]
[One-line closing tribute]`,
  },
  {
    code: "F15",
    name: "Explain-to-Kids Simplification",
    referenceEngagement: "Save-heavy",
    bestFor: "saves",
    reachNote2026: "Scannable glossary with blank lines between points.",
    whyItWorks: "Clean breakdown of complex jargon gets bookmarked as reference material.",
    skeleton: `{Jargon term} explained in plain English.
- Part 1: [What it actually is]
- Part 2: [Why everyone is confused]
- Part 3: [How it works in practice with simple analogy]
[One-line bookmarkable close]`,
  },
  {
    code: "F16",
    name: "Status-Strip Humility",
    referenceEngagement: "Like-heavy",
    bestFor: "likes",
    reachNote2026: "Genuine deflation moment, not a disguised humble-brag.",
    whyItWorks: "Trading prestige for relatability converts cold authority into human warmth.",
    skeleton: `On LinkedIn, I am introduced as {impressive title}.
At home on Tuesday morning, none of that mattered when {humbling real scene}.
[The specific grounding moment]
[What real perspective looks like outside the feed]`,
  },
  {
    code: "F17",
    name: "Controlled A/B Anecdote",
    referenceEngagement: "Structural (comments)",
    bestFor: "comments",
    isStructural: true,
    reachNote2026: "Numbers in lines 1-2. Two situations differing by exactly one variable.",
    whyItWorks: "Controlled comparison reads as undeniable proof rather than opinion.",
    skeleton: `{Action A} → {Outcome A with numbers}.
{Identical action, ONE variable changed} → {Opposite outcome B with numbers}.

Same target. Same budget. The only difference was {variable}.
[What we first assumed it meant]
[What the data actually revealed]
[Operational question to test reader's variable]`,
  },
  {
    code: "F18",
    name: "False-Binary Dissolve",
    referenceEngagement: "Structural (reposts)",
    bestFor: "reposts",
    isStructural: true,
    reachNote2026: "Counts as the single contrast for the post. Do not stack another.",
    whyItWorks: "Disproving two common answers earns complete authority for the third.",
    skeleton: `Everyone reaches for one of two answers to {problem}:
Option A: [Why obvious answer A fails with data]
Option B: [Why obvious answer B fails with data]

The teams winning in 2026 are doing Option C:
[Concrete breakdown of Option C]
[One-line maxim]`,
  },
  {
    code: "F19",
    name: "Anecdote-Meets-Evidence Bridge",
    referenceEngagement: "Structural (saves)",
    bestFor: "saves",
    isStructural: true,
    reachNote2026: "Personal story earns the attention, data stack earns the belief.",
    whyItWorks: "Grounds high-level industry statistics in a real operational human moment.",
    skeleton: `[Specific personal observation on a Tuesday afternoon]
I thought it was an isolated glitch until I pulled the industry cohort data:
- [Data point 1]
- [Data point 2]
- [Data point 3]
[Strategic takeaway for operators]`,
  },
  {
    code: "F20",
    name: "Diverging-Curves Close",
    referenceEngagement: "Structural (reposts)",
    bestFor: "reposts",
    isStructural: true,
    reachNote2026: "Two trajectories diverging over time create quote-worthy maxims.",
    whyItWorks: "Visualizes opposite trajectories on a time axis. Maxim gets reshared.",
    skeleton: `In month one, {Approach A} and {Approach B} look identical.
In month six, {Approach A} is drowning in coordination costs.
In month six, {Approach B} is compounding throughput at zero marginal cost.

[The diverging curves maxim: one line that sticks]
[Question on where reader's team currently sits]`,
  },
];

export const FOUNDER_ANGLES: FounderAngle[] = [
  {
    code: "A1",
    name: "Reprice the Category",
    territory: "Pricing & Economic Architecture",
    primaryGoal: "reposts",
    pinnedFormula: "F7",
    description: "Break down the true cost of legacy software/services vs modern autonomous systems.",
    template: "The real price of {category} isn't {sticker price}. It's {hidden coordination tax with exact numbers}."
  },
  {
    code: "A2",
    name: "Content-to-Pipeline",
    territory: "B2B Demand & Trust",
    primaryGoal: "saves",
    pinnedFormula: "F8",
    description: "Demonstrate how authentic practitioner insights convert directly into enterprise pipeline.",
    template: "We don't run top-of-funnel ads. Here is how 3 technical teardowns generated $140k in inbound."
  },
  {
    code: "A3",
    name: "Audience of One",
    territory: "Targeted Stakeholder Resonance",
    primaryGoal: "comments",
    pinnedFormula: "F4",
    description: "Write specifically to your single highest-value design partner or investor archetype.",
    template: "This is written for the 40 CTOs currently managing 100+ engineer migrations."
  },
  {
    code: "A4",
    name: "The Scarce-Shots Math",
    territory: "Founder Resource Allocation",
    primaryGoal: "saves",
    pinnedFormula: "F7",
    description: "The honest math of runway, engineering cycles, and high-conviction bets.",
    template: "You only get 4 major engineering bets before your Series A runway checks out."
  },
  {
    code: "A5",
    name: "The Unglamorous Bet",
    territory: "Behind-the-Scenes Architecture",
    primaryGoal: "reposts",
    pinnedFormula: "F10",
    description: "Celebrating deep infrastructural work that competitors dismiss as boring.",
    template: "While everyone chased flashy demos, we spent 8 months perfecting data hygiene."
  },
  {
    code: "A6",
    name: "The Limit of Delegation",
    territory: "Executive Leadership & Taste",
    primaryGoal: "comments",
    pinnedFormula: "F17",
    description: "Where founders must never step back: customer taste and core product intuition.",
    template: "You can delegate execution. You can never delegate product conviction."
  },
  {
    code: "A7",
    name: "Designed Serendipity",
    territory: "Compounding Growth Systems",
    primaryGoal: "likes",
    pinnedFormula: "F19",
    description: "Creating operating loops that produce unexpected high-value outcomes.",
    template: "How our weekly public changelog turned into an unexpected enterprise contract."
  },
  {
    code: "A8",
    name: "The Evasive-Sentence Test",
    territory: "Positioning & Messaging Clarity",
    primaryGoal: "comments",
    pinnedFormula: "F18",
    description: "Killing corporate jargon on homepage copy and pitch decks.",
    template: "If your positioning statement cannot be disagreed with, you haven't taken a position."
  },
  {
    code: "A9",
    name: "The Delegation Line",
    territory: "AI & Human Operators",
    primaryGoal: "comments",
    pinnedFormula: "F17",
    description: "A controlled test comparing human-only vs autonomous workflow output.",
    template: "{Action A with human queue} vs {Action B with autonomous stack}. Same brief."
  },
  {
    code: "A10",
    name: "The Learning Gate",
    territory: "Organizational Velocity",
    primaryGoal: "reposts",
    pinnedFormula: "F20",
    description: "How companies diverge based on whether workflows compound knowledge or reset every week.",
    template: "A queue grows with headcount. A learning workflow shrinks with execution."
  },
];

export function getFormulaByGoal(goal: EngagementGoal): HookFormula[] {
  return HOOK_FORMULAS.filter((f) => f.bestFor === goal);
}

export function getFormulaByCode(code: string): HookFormula | undefined {
  return HOOK_FORMULAS.find((f) => f.code.toUpperCase() === code.toUpperCase());
}
