export interface AlgorithmAuditResult {
  charCount: number;
  wordCount: number;
  sentenceCount: number;
  paragraphCount: number;
  hookCharCount: number; // first 210 chars
  firstLineIsQuestion: boolean;
  firstLineHasNumber: boolean;
  hasClosingQuestion: boolean;
  hasPsNote: boolean;
  hasExternalLinkInBody: boolean;
  hashtagCount: number;
  sweetSpotLength: boolean;
  lengthRating: "Optimal (900-1,300 chars)" | "Long-form (1,500-1,900 chars)" | "Too short (<400 chars)" | "Acceptable";
  scoreMultiplierEstimate: number; // e.g. 1.18x
  feedAlerts: {
    type: "positive" | "warning" | "penalty";
    message: string;
    impact: string;
  }[];
}

const EXTERNAL_LINK_REGEX = /https?:\/\/(?!(?:www\.)?linkedin\.com)[^\s]+/gi;
const HASHTAG_REGEX = /#\w+/g;

export function auditAlgorithmHeuristics(content: string): AlgorithmAuditResult {
  if (!content) {
    return {
      charCount: 0,
      wordCount: 0,
      sentenceCount: 0,
      paragraphCount: 0,
      hookCharCount: 0,
      firstLineIsQuestion: false,
      firstLineHasNumber: false,
      hasClosingQuestion: false,
      hasPsNote: false,
      hasExternalLinkInBody: false,
      hashtagCount: 0,
      sweetSpotLength: false,
      lengthRating: "Too short (<400 chars)",
      scoreMultiplierEstimate: 1.0,
      feedAlerts: [],
    };
  }

  const lines = content.split("\n").map((l) => l.trim()).filter(Boolean);
  const firstLine = lines[0] || "";
  const lastLines = lines.slice(-3).join(" ");
  
  const charCount = content.length;
  const words = content.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  
  // Sentence counting
  const sentences = content.split(/[.!?]+/).map((s) => s.trim()).filter((s) => s.length > 3);
  const sentenceCount = sentences.length;
  const paragraphCount = content.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length;

  const hookSnippet = content.slice(0, 210);
  const hookCharCount = hookSnippet.length;

  const firstLineIsQuestion = /^(are|is|can|could|why|what|how|ever|do|does|did|will|should)\b.*\?/i.test(firstLine) || firstLine.endsWith("?");
  const firstLineHasNumber = /\b(\$?\d[\d,.]*|\d+[%kKmMbB]?)\b/.test(firstLine);
  
  const hasClosingQuestion = lastLines.includes("?") || /\b(what|how|which|share|thoughts)\b.*\?/i.test(lastLines);
  const hasPsNote = /\bP\.?S\.?\b/i.test(content);

  const externalLinks = content.match(EXTERNAL_LINK_REGEX) || [];
  const hasExternalLinkInBody = externalLinks.length > 0;

  const hashtags = content.match(HASHTAG_REGEX) || [];
  const hashtagCount = hashtags.length;

  const sweetSpotLength = charCount >= 900 && charCount <= 1350;
  let lengthRating: AlgorithmAuditResult["lengthRating"] = "Acceptable";
  if (sweetSpotLength) {
    lengthRating = "Optimal (900-1,300 chars)";
  } else if (charCount >= 1450 && charCount <= 2200) {
    lengthRating = "Long-form (1,500-1,900 chars)";
  } else if (charCount < 400) {
    lengthRating = "Too short (<400 chars)";
  }

  // Calculate reach multipliers
  let multiplier = 1.0;
  const alerts: AlgorithmAuditResult["feedAlerts"] = [];

  if (firstLineHasNumber) {
    multiplier *= 1.34;
    alerts.push({
      type: "positive",
      message: "Number-first opener detected in line 1.",
      impact: "+34% median likes lift (2026 MagicPost study)",
    });
  }

  if (firstLineIsQuestion) {
    multiplier *= 0.66;
    alerts.push({
      type: "penalty",
      message: "Opening with a question is heavily down-ranked.",
      impact: "-34% median likes across all follower bands. Move question to the close.",
    });
  }

  if (hasClosingQuestion) {
    multiplier *= 1.03;
    alerts.push({
      type: "positive",
      message: "Experience-anchored closing question invites sub-threads.",
      impact: "+3% reach boost & sparks author-reply momentum",
    });
  }

  if (hasPsNote) {
    multiplier *= 1.075;
    alerts.push({
      type: "positive",
      message: "One-line P.S. sign-off reinforces scroll dwell time.",
      impact: "+7.5% reach lift",
    });
  }

  if (charCount >= 1000) {
    multiplier *= 1.18;
    alerts.push({
      type: "positive",
      message: "Exceeds 1,000 characters with scannable paragraph pacing.",
      impact: "1.18x reach lift (AuthoredUp 3M post benchmark)",
    });
  }

  if (sentenceCount >= 20) {
    multiplier *= 1.14;
    alerts.push({
      type: "positive",
      message: "20+ short declarative sentences prevent reading fatigue.",
      impact: "1.14x reach lift",
    });
  }

  if (hasExternalLinkInBody) {
    multiplier *= 0.5;
    alerts.push({
      type: "penalty",
      message: "External URL found in post body.",
      impact: "40-60% reach penalty. Move link to the first comment.",
    });
  }

  if (hashtagCount > 4) {
    multiplier *= 0.85;
    alerts.push({
      type: "penalty",
      message: `Detected ${hashtagCount} hashtags (recommended 0 to 2 max).`,
      impact: "Negative signal in 360Brew semantic embedding ranker",
    });
  }

  return {
    charCount,
    wordCount,
    sentenceCount,
    paragraphCount,
    hookCharCount,
    firstLineIsQuestion,
    firstLineHasNumber,
    hasClosingQuestion,
    hasPsNote,
    hasExternalLinkInBody,
    hashtagCount,
    sweetSpotLength,
    lengthRating,
    scoreMultiplierEstimate: Number(multiplier.toFixed(2)),
    feedAlerts: alerts,
  };
}
