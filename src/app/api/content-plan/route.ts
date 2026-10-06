import { NextResponse } from "next/server";
import { z } from "zod";
import { generate7DayContentPlan } from "@/lib/content-planner";

const RequestSchema = z.object({
  theme: z.string().min(2, "Theme must be at least 2 characters"),
  targetAudience: z.string().min(2, "Target audience is required"),
  founderMode: z.boolean().optional(),
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

    const plan = generate7DayContentPlan(parsed.data);
    return NextResponse.json({ success: true, plan });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to generate content plan" },
      { status: 500 }
    );
  }
}
