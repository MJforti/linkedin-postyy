export interface PubloraPostPayload {
  content: string;
  platforms: { platform: string; platformId: string }[];
  scheduledTime?: string;
  mediaUrls?: string[];
}

export interface PubloraCommentPayload {
  postedId: string; // post URN
  message: string;
  platformId: string;
  parentComment?: string;
}

export class PubloraClient {
  private baseUrl = "https://api.publora.com/api/v1";
  private apiKey: string | null;
  private platformId: string | null;

  constructor() {
    this.apiKey = process.env.PUBLORA_API_KEY || null;
    this.platformId = process.env.LINKEDIN_PLATFORM_ID || null;
  }

  isConfigured(): boolean {
    return Boolean(this.apiKey && this.platformId);
  }

  getMissingConfigReason(): string | null {
    if (!this.apiKey && !this.platformId) {
      return "Neither PUBLORA_API_KEY nor LINKEDIN_PLATFORM_ID is set in the server environment.";
    }
    if (!this.apiKey) {
      return "PUBLORA_API_KEY is missing from server environment variables.";
    }
    if (!this.platformId) {
      return "LINKEDIN_PLATFORM_ID is missing from server environment variables.";
    }
    return null;
  }

  async createPost(payload: PubloraPostPayload): Promise<{ success: boolean; data?: any; error?: string }> {
    if (!this.isConfigured()) {
      return {
        success: false,
        error: this.getMissingConfigReason() || "Publora is not configured.",
      };
    }

    try {
      const res = await fetch(`${this.baseUrl}/create-post`, {
        method: "POST",
        headers: {
          "x-publora-key": this.apiKey!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        return { success: false, error: `Publora API error (${res.status}): ${errorText}` };
      }

      const data = await res.json();
      return { success: true, data };
    } catch (err: any) {
      return { success: false, error: err.message || "Network request failed" };
    }
  }

  async createComment(payload: PubloraCommentPayload): Promise<{ success: boolean; data?: any; error?: string }> {
    if (!this.isConfigured()) {
      return {
        success: false,
        error: this.getMissingConfigReason() || "Publora is not configured.",
      };
    }

    try {
      const res = await fetch(`${this.baseUrl}/linkedin-comments`, {
        method: "POST",
        headers: {
          "x-publora-key": this.apiKey!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        return { success: false, error: `Publora API error (${res.status}): ${errorText}` };
      }

      const data = await res.json();
      return { success: true, data };
    } catch (err: any) {
      return { success: false, error: err.message || "Network request failed" };
    }
  }
}
