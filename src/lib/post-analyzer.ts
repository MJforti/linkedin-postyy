import { PostAnalysis } from "./types";
import { auditAlgorithmHeuristics } from "./algorithm-heuristics";
import { HOOK_FORMULAS } from "./hook-formulas";
import { humanizeLinkedInText } from "./humanizer";

export function analyzeLinkedInPost(rawText: string, url?: string): PostAnalysis {
  const text = rawText.trim();
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const hookLine = lines[0] || "";

  // 1. Audit algorithm metrics
  const algoAudit = auditAlgorithmHeuristics(text);

  // 2. Identify likely formula
  let detectedFormula = "F10 - Contrarian + Historical Receipts";
  let confidence = "Moderate (65%)";

  if (/^\$?\d/.test(hookLine)) {
    detectedFormula = "F7 - Odd-Precision Money Ledger";
    confidence = "High (92%)";
  } else if (/^R\.I\.P\./i.test(hookLine)) {
    detectedFormula = "F2 - R.I.P. Category Obituary";
    confidence = "High (95%)";
  } else if (/^In \d{4}, I/i.test(hookLine)) {
    detectedFormula = "F3 - Year-over-Year Pivot";
    confidence = "High (88%)";
  } else if (/^\d+\s+(?:days|months|years|weeks)\s+ago/i.test(hookLine)) {
    detectedFormula = "F4 - Time-Anchor Confession";
    confidence = "High (90%)";
  } else if (/Team A.*Team B/is.test(text) || /Option A.*Option B/is.test(text)) {
    detectedFormula = "F17 - Controlled A/B Anecdote";
    confidence = "High (89%)";
  }

  // 3. Evaluate strengths
  const strengths: string[] = [];
  if (algoAudit.firstLineHasNumber) {
    strengths.push("Number-first hook in line 1 lifts median feed reach by +34%.");
  }
  if (algoAudit.sweetSpotLength) {
    strengths.push("Post length is in the optimal 900-1,300 char sweet spot.");
  }
  if (algoAudit.hasClosingQuestion) {
    strengths.push("Ends with an experience-anchored question that sparks high-weight comment replies.");
  }
  if (algoAudit.hasPsNote) {
    strengths.push("P.S. sign-off reinforces reader dwell time before scrolling.");
  }
  if (algoAudit.paragraphCount >= 5) {
    strengths.push("Good visual scannability with 1-2 sentence paragraphs.");
  }

  // 4. Evaluate weaknesses & AI tells
  const weaknesses: string[] = [];
  const humanizerCheck = humanizeLinkedInText(text);

  if (algoAudit.firstLineIsQuestion) {
    weaknesses.push("Opening with a question reduces median likes by 34% (2026 algorithmic penalty).");
  }
  if (algoAudit.hasExternalLinkInBody) {
    weaknesses.push("External link found in post body; LinkedIn suppresses impressions by 40-60%.");
  }
  if (humanizerCheck.tellsDetected.length > 0) {
    humanizerCheck.tellsDetected.forEach((t) => {
      weaknesses.push(`AI tell detected: ${t.description} (trigger: '${t.trigger}').`);
    });
  }

  // 5. Practical recommendations
  const recommendations: string[] = [];
  if (algoAudit.firstLineIsQuestion) {
    recommendations.push("Invert the question in line 1 into a concrete number or bold statement, and move the question to the very end.");
  }
  if (algoAudit.hasExternalLinkInBody) {
    recommendations.push("Move the external URL to the first comment and replace with 'Link in comments ↓'.");
  }
  if (algoAudit.hashtagCount > 3) {
    recommendations.push("Reduce hashtags to 1-2 focused niche tags at the end.");
  }
  if (!algoAudit.hasPsNote) {
    recommendations.push("Add a one-line P.S. note with a secondary takeaway for a +7.5% reach lift.");
  }
  if (recommendations.length === 0) {
    recommendations.push("The post follows canonical 2026 reach heuristics. Ready for review and scheduling.");
  }

  return {
    url,
    rawText: text,
    hookLine,
    hookLength: hookLine.length,
    totalLength: text.length,
    sentenceCount: algoAudit.sentenceCount,
    detectedFormula,
    formulaConfidence: confidence,
    strengths,
    weaknesses,
    algorithmScoreSummary: {
      lengthCheck: algoAudit.sweetSpotLength ? "optimal" : text.length > 500 ? "acceptable" : "suboptimal",
      hookCheck: algoAudit.firstLineIsQuestion ? "risky" : algoAudit.firstLineHasNumber ? "strong" : "acceptable",
      densityCheck: humanizerCheck.densityScore <= 2 ? "passed" : "overloaded",
      externalLinkFound: algoAudit.hasExternalLinkInBody,
      hasClosingQuestion: algoAudit.hasClosingQuestion,
      hasPsNote: algoAudit.hasPsNote,
    },
    recommendations,
  };
}
