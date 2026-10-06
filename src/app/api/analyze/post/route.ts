import { NextResponse } from "next/server";
import { z } from "zod";
import { analyzeLinkedInPost } from "@/lib/post-analyzer";
import { ApifyClient } from "@/lib/external/apify-client";
import { validateLinkedInUrl } from "@/lib/security";

const RequestSchema = z.object({
  text: z.string().optional(),
  url: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = RequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request. Provide either 'text' or 'url'." },
        { status: 400 }
      );
    }

    let postText = parsed.data.text || "";
    const postUrl = parsed.data.url;

    if (postUrl && !postText) {
      const urlValidation = validateLinkedInUrl(postUrl);
      if (!urlValidation.valid) {
        return NextResponse.json({ error: urlValidation.error }, { status: 400 });
      }

      const apify = new ApifyClient();
      if (apify.isConfigured()) {
        const fetchRes = await apify.fetchPost(postUrl);
        if (fetchRes.success && fetchRes.data?.text) {
          postText = fetchRes.data.text;
        } else {
          return NextResponse.json(
            { error: fetchRes.error || "Could not fetch post content. Please paste post text directly." },
            { status: 400 }
          );
        }
      } else {
        return NextResponse.json(
          {
            error:
              "APIFY_TOKEN is not configured on the server. Please paste the post text directly to analyze.",
          },
          { status: 400 }
        );
      }
    }

    if (!postText.trim()) {
      return NextResponse.json(
        { error: "Post text is empty. Please provide content to analyze." },
        { status: 400 }
      );
    }

    const analysis = analyzeLinkedInPost(postText, postUrl);
    return NextResponse.json({ success: true, analysis });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to analyze post" },
      { status: 500 }
    );
  }
}
