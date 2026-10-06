import { NextResponse } from "next/server";
import { z } from "zod";
import { PubloraClient } from "@/lib/external/publora-client";

const PublishSchema = z.object({
  content: z.string().min(1, "Post content cannot be empty"),
  approved: z.literal(true, {
    errorMap: () => ({ message: "Publishing requires explicit user confirmation (approved: true)." }),
  }),
  scheduledTime: z.string().optional(),
  mediaUrls: z.array(z.string()).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = PublishSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Validation failed." },
        { status: 400 }
      );
    }

    const publora = new PubloraClient();
    if (!publora.isConfigured()) {
      return NextResponse.json(
        {
          success: false,
          error:
            publora.getMissingConfigReason() ||
            "LinkedIn publishing isn't configured yet. Add PUBLORA_API_KEY and LINKEDIN_PLATFORM_ID to environment variables.",
          manualModeRequired: true,
        },
        { status: 400 }
      );
    }

    const platformId = process.env.LINKEDIN_PLATFORM_ID!;
    const publishRes = await publora.createPost({
      content: parsed.data.content,
      platforms: [{ platform: "linkedin", platformId }],
      scheduledTime: parsed.data.scheduledTime,
      mediaUrls: parsed.data.mediaUrls,
    });

    if (!publishRes.success) {
      return NextResponse.json({ success: false, error: publishRes.error }, { status: 502 });
    }

    return NextResponse.json({
      success: true,
      message: parsed.data.scheduledTime ? "Post scheduled on LinkedIn." : "Post published to LinkedIn.",
      data: publishRes.data,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to publish post" },
      { status: 500 }
    );
  }
}
