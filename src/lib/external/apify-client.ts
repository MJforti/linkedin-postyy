import { sanitizeUntrustedContent } from "../security";

export interface FetchedPostData {
  text: string;
  authorName?: string;
  authorProfileUrl?: string;
  urn?: string;
  numLikes?: number;
  numComments?: number;
  numShares?: number;
  postedAtISO?: string;
}

export class ApifyClient {
  private baseUrl = "https://api.apify.com/v2";
  private token: string | null;

  constructor() {
    this.token = process.env.APIFY_TOKEN || null;
  }

  isConfigured(): boolean {
    return Boolean(this.token);
  }

  async fetchPost(postUrl: string): Promise<{ success: boolean; data?: FetchedPostData; error?: string }> {
    if (!this.isConfigured()) {
      return {
        success: false,
        error: "APIFY_TOKEN is not configured in server environment. Manual input is supported.",
      };
    }

    try {
      const actorId = "apimaestro~linkedin-post-detail";
      const runUrl = `${this.baseUrl}/acts/${actorId}/run-sync-get-dataset-items?timeout=90`;

      const res = await fetch(runUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post_urls: [postUrl],
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        return { success: false, error: `Apify error (${res.status}): ${errorText}` };
      }

      const items = await res.json();
      if (!Array.isArray(items) || items.length === 0) {
        return { success: false, error: "No post data returned by Apify actor." };
      }

      const firstItem = items[0];
      const rawText = firstItem.text || firstItem.body || firstItem.description || "";

      return {
        success: true,
        data: {
          text: sanitizeUntrustedContent(rawText),
          authorName: firstItem.author?.name || firstItem.authorName || "Unknown Author",
          authorProfileUrl: firstItem.author?.profileUrl || firstItem.authorProfileUrl,
          urn: firstItem.urn || firstItem.shareUrn,
          numLikes: firstItem.numLikes || 0,
          numComments: firstItem.numComments || 0,
          numShares: firstItem.numShares || 0,
          postedAtISO: firstItem.postedAtISO,
        },
      };
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to fetch post via Apify." };
    }
  }
}
