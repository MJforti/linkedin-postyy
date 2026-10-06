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

    const result = generatePostDraft(parsed.data);
    return NextResponse.json({ success: true, ...result });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to generate post draft" },
      { status: 500 }
    );
  }
}
