import { HumanizerResult } from "./types";

interface TellHit {
  category: "forensic" | "strict_vocab" | "grammar" | "reveal_bridge" | "parallelism" | "rhythm";
  description: string;
  trigger: string;
  replacement?: string;
}

const FORENSIC_PATTERNS: { regex: RegExp; name: string }[] = [
  { regex: /\boaicite\b/gi, name: "OpenAI citation token leakage" },
  { regex: /\bcontentReference(?:\[\^\d+\])?/gi, name: "AI contentReference artifact" },
  { regex: /\bturn\d+search\d+\b/gi, name: "OpenAI tool call leakage" },
  { regex: /\b\[Your (?:Name|Company|Title)\]/gi, name: "Unfilled template placeholder" },
  { regex: /As of my (?:last update|knowledge cutoff)[^.]*\./gi, name: "AI knowledge cutoff disclaimer" },
];

const REVEAL_BRIDGES: { regex: RegExp; name: string; replacement: string }[] = [
  { regex: /^(?:The (?:result|outcome|catch|kicker|lesson|truth)\?)\s*/gim, name: "Reveal bridge ('The result?')", replacement: "" },
  { regex: /^(?:Plot twist|Spoiler alert|The twist)[:?]\s*/gim, name: "Reveal bridge ('Plot twist:')", replacement: "" },
  { regex: /^Here'?s (?:what|how|why|the thing)[:.]\s*/gim, name: "Teaser bridge ('Here's what:')", replacement: "" },
  { regex: /^Stop \w[^,.]{0,40}[,.] start /gim, name: "Generic advice opener ('Stop X, start Y')", replacement: "" },
];

const NEG_PARALLELISM: { regex: RegExp; name: string; replacer: (...args: any[]) => string }[] = [
  {
    regex: /It's not just ([^,]+), it's ([^.]+)/gi,
    name: "Negative parallelism ('It's not just X, it's Y')",
    replacer: (_m, p1, p2) => `${p1.trim()}, and crucially ${p2.trim()}`,
  },
  {
    regex: /([A-Za-z0-9\s]+) isn't ([^,]+), it's ([^.]+)/gi,
    name: "Negative parallelism ('X isn't Y, it's Z')",
    replacer: (_m, p1, _p2, p3) => `${p1.trim()} is actually ${p3.trim()}`,
  },
  {
    regex: /This isn't ([^.]+)\.\s*This is ([^.]+)/gi,
    name: "Negative parallelism ('This isn't X. This is Y.')",
    replacer: (_m, _p1, p2) => `This is directly ${p2.trim()}`,
  },
];

const STRICT_VOCAB_REPLACEMENTS: Record<string, string> = {
  leverage: "use",
  leveraged: "used",
  leveraging: "using",
  streamline: "simplify",
  streamlined: "simplified",
  streamlining: "simplifying",
  foster: "build",
  fostered: "built",
  fostering: "building",
  robust: "solid",
  seamless: "smooth",
  seamlessly: "smoothly",
  unlock: "find",
  unlocking: "finding",
  harness: "use",
  harnessing: "using",
  delve: "dig",
  delving: "digging",
  tapestry: "system",
  realm: "field",
  landscape: "market",
  paradigm: "model",
  "game-changer": "step change",
  "game changer": "step change",
  fundamentally: "",
  crucially: "",
  notably: "",
  essentially: "",
  "let that sink in": "",
  "built different": "built for speed",
};

const SINCERITY_ANNOUNCEMENTS: RegExp[] = [
  /^(?:Let me be honest|Honestly\?|To be completely honest|I'll be real|Real talk)[,:]\s*/gim,
  /^(?:Can I be vulnerable for a second|Here's the honest truth)[,:]\s*/gim,
];

export function humanizeLinkedInText(input: string): HumanizerResult {
  if (!input || !input.trim()) {
    return {
      original: "",
      humanized: "",
      tellsDetected: [],
      confidence: "reads human",
      densityScore: 0,
      wordCount: 0,
      charCount: 0,
      summaryOfChanges: [],
    };
  }

  const tells: TellHit[] = [];
  const changes: string[] = [];
  let text = input;

  // Pass 1: FORENSIC
  for (const { regex, name } of FORENSIC_PATTERNS) {
    if (regex.test(text)) {
      tells.push({ category: "forensic", description: name, trigger: regex.source });
      text = text.replace(regex, "");
      changes.push(`Removed forensic model artifact: ${name}`);
    }
  }

  // Pass 2: REVEAL BRIDGES
  for (const { regex, name, replacement } of REVEAL_BRIDGES) {
    if (regex.test(text)) {
      tells.push({ category: "reveal_bridge", description: name, trigger: regex.source, replacement });
      text = text.replace(regex, replacement);
      changes.push(`Removed artificial reveal bridge: ${name}`);
    }
  }

  // Pass 3: NEGATIVE PARALLELISM
  for (const { regex, name, replacer } of NEG_PARALLELISM) {
    if (regex.test(text)) {
      tells.push({ category: "parallelism", description: name, trigger: regex.source });
      text = text.replace(regex, replacer);
      changes.push(`Rewrote negative parallelism structure (-4.9% reach penalty): ${name}`);
    }
  }

  // Pass 4: SINCERITY ANNOUNCEMENTS
  for (const regex of SINCERITY_ANNOUNCEMENTS) {
    if (regex.test(text)) {
      tells.push({ category: "grammar", description: "Performed sincerity / announced candor", trigger: regex.source });
      text = text.replace(regex, "");
      changes.push("Stripped performed sincerity announcement ('Let me be honest')");
    }
  }

  // Pass 5: STRICT VOCABULARY DENSITY SCRUB
  for (const [badWord, goodWord] of Object.entries(STRICT_VOCAB_REPLACEMENTS)) {
    const wordRegex = new RegExp(`\\b${badWord}\\b`, "gi");
    if (wordRegex.test(text)) {
      tells.push({
        category: "strict_vocab",
        description: `Overused AI buzzword: '${badWord}'`,
        trigger: badWord,
        replacement: goodWord || "(deleted)",
      });
      text = text.replace(wordRegex, goodWord);
      changes.push(`Replaced '${badWord}' with '${goodWord || "clean deletion"}'`);
    }
  }

  // Pass 6: PUNCTUATION & EM DASH CAPPING
  text = text.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
  text = text.replace(/\s*--\s*/g, ", ");

  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const emDashCount = (text.match(/—/g) || []).length;
  const maxAllowedEmDashes = Math.max(1, Math.min(2, Math.round(wordCount / 100)));

  if (emDashCount > maxAllowedEmDashes) {
    let excess = emDashCount - maxAllowedEmDashes;
    let replacedCount = 0;
    text = text.replace(/—/g, (match) => {
      if (replacedCount < excess) {
        replacedCount++;
        return ", ";
      }
      return match;
    });
    tells.push({
      category: "rhythm",
      description: `Excessive em dashes (${emDashCount} found, capped at ${maxAllowedEmDashes})`,
      trigger: "—",
      replacement: ", ",
    });
    changes.push(`Capped em dashes to human baseline (~1 per 100 words)`);
  }

  // Clean trailing spaces and excessive blank lines
  text = text
    .split("\n")
    .map((l) => l.trimEnd())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  // Confidence & scoring
  const totalTells = tells.length;
  let confidence: HumanizerResult["confidence"] = "reads human";
  if (totalTells >= 4) {
    confidence = "reads AI";
  } else if (totalTells >= 1) {
    confidence = "mixed";
  }

  return {
    original: input,
    humanized: text,
    tellsDetected: tells,
    confidence,
    densityScore: totalTells,
    wordCount: text.split(/\s+/).filter(Boolean).length,
    charCount: text.length,
    summaryOfChanges: Array.from(new Set(changes)),
  };
}
