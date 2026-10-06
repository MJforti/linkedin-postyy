import { NextResponse } from "next/server";
import { z } from "zod";
import { generatePostDraft } from "@/lib/post-writer";

const RequestSchema = z.object({
  topic: z.string().min(3, "Topic must be at least 3 characters"),
  targetAudience: z.string().optional(),
  goal: z.enum(["comments", "reposts", "likes", "saves"]).optional(),
  tone: z.enum(["direct", "conversational", "analytical", "story-driven", "opinionated", "founder"]).optional(),
  context: z.string().optional(),
  formulaCode: z.string().optional(),
  founderAngleCode: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = RequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Invalid request body" },
        { status: 400 }
      );
    }

    const fallback = generatePostDraft(parsed.data);
    
    // Check if an LLM key (e.g. Grok, OpenAI, Anthropic) is configured
    const systemPrompt = `You are an elite LinkedIn content creator adhering strictly to 2026 algorithmic reach guidelines:
- Hook must be in the first 210 characters (before 'see more').
- Line 1 must be a statement or odd-precision number (+34% median likes). NEVER open with a question (-34% penalty).
- Target length: 900-1,300 characters (or 1,500-1,900 for long-form). 20+ short sentences.
- 1-2 sentence paragraphs with double line-breaks.
- Maximum 1 contrast and 1 triple list across the entire post.
- NEVER use AI cliches: 'leverage', 'streamline', 'robust', 'seamless', 'delve', 'paradigm', 'landscape', 'game-changer', 'fundamentally'.
- Never use reveal bridges like 'The result?' or 'Plot twist:'.
- Close with a specific, experience-anchored question (+3%) followed by a one-line P.S. note (+7.5%).
- 0 to 2 hashtags at the end.`;

    const userPrompt = `Write a viral LinkedIn post on this topic: "${parsed.data.topic}".
Formula to apply: ${parsed.data.formulaCode || "F17 Controlled A/B"}
Goal: ${parsed.data.goal || "comments"}
Tone: ${parsed.data.tone || "direct"}
Audience: ${parsed.data.targetAudience || "B2B leaders and operators"}
Context & Numbers: ${parsed.data.context || "None provided"}`;

    const { callLLM } = await import("@/lib/llm-client");
    const aiContent = await callLLM({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
    });

    if (aiContent) {
      const { humanizeLinkedInText } = await import("@/lib/humanizer");
      const cleaned = humanizeLinkedInText(aiContent);
      return NextResponse.json({
        success: true,
        content: cleaned.humanized,
        formulaCode: parsed.data.formulaCode || fallback.formulaCode,
        founderAngleCode: parsed.data.founderAngleCode,
        title: `${parsed.data.topic.slice(0, 40)} (${parsed.data.formulaCode || "Grok/AI"})`,
        charCount: cleaned.charCount,
      });
    }

    return NextResponse.json({ success: true, ...fallback });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to generate post draft" },
      { status: 500 }
    );
  }
}
