import { NextResponse } from "next/server";
import { z } from "zod";
import { draftComments, draftReshareCommentary } from "@/lib/comment-drafter";
import { ApifyClient } from "@/lib/external/apify-client";
import { validateLinkedInUrl } from "@/lib/security";

const RequestSchema = z.object({
  url: z.string().optional(),
  text: z.string().optional(),
  perspective: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = RequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    let postText = parsed.data.text || "";
    const postUrl = parsed.data.url || "https://www.linkedin.com/feed/";

    if (parsed.data.url && !postText) {
      const urlValidation = validateLinkedInUrl(parsed.data.url);
      if (!urlValidation.valid) {
        return NextResponse.json({ error: urlValidation.error }, { status: 400 });
      }

      const apify = new ApifyClient();
      if (apify.isConfigured()) {
        const fetchRes = await apify.fetchPost(parsed.data.url);
        if (fetchRes.success && fetchRes.data?.text) {
          postText = fetchRes.data.text;
        } else {
          return NextResponse.json(
            { error: fetchRes.error || "Could not fetch post from LinkedIn. Please paste text directly." },
            { status: 400 }
          );
        }
      } else {
        return NextResponse.json(
          {
            error:
              "APIFY_TOKEN is not configured in the server environment. Please paste the post text directly below.",
          },
          { status: 400 }
        );
      }
    }

    if (!postText.trim()) {
      return NextResponse.json(
        { error: "Post text is required to draft comments." },
        { status: 400 }
      );
    }

    const comments = draftComments(postUrl, postText, parsed.data.perspective);
    const reshareCommentary = draftReshareCommentary(postText, parsed.data.perspective);

    return NextResponse.json({
      success: true,
      comments,
      reshareCommentary,
      postSnippet: postText.slice(0, 280),
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to generate comments" },
      { status: 500 }
    );
  }
}
