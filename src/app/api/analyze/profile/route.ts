import { NextResponse } from "next/server";
import { z } from "zod";
import { auditAndOptimizeProfile } from "@/lib/profile-optimizer";

const RequestSchema = z.object({
  name: z.string().default("LinkedIn Creator"),
  currentHeadline: z.string().optional(),
  currentAbout: z.string().optional(),
  roleOrSpecialty: z.string().min(2, "Role or specialty is required"),
  targetAudience: z.string().min(2, "Target audience is required"),
  keyAchievement: z.string().optional(),
  goal: z.enum(["clients", "authority", "career"]).default("clients"),
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

    const audit = auditAndOptimizeProfile(parsed.data);
    return NextResponse.json({ success: true, audit });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to audit profile" },
      { status: 500 }
    );
  }
}
