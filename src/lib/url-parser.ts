export interface ParsedLinkedInUrl {
  post_activity_id: string | null;
  post_urn: string | null;
  comment_id: string | null;
  comment_urn: string | null;
  url_type: "post" | "comment" | "unknown";
}

const ACTIVITY_SLUG_RE = /activity[-:](\d{18,25})/;
const SHARE_SLUG_RE = /share[-:](\d{18,25})/;
const UGCPOST_SLUG_RE = /ugcPost[-:](\d{18,25})/;
const COMMENT_URN_RE = /urn:li:comment:\((?:urn:li:)?(activity|ugcPost|share):(\d+)\s*,\s*(\d+)\)/;

export function parseLinkedInUrl(url: string): ParsedLinkedInUrl {
  if (!url || typeof url !== "string") {
    return {
      post_activity_id: null,
      post_urn: null,
      comment_id: null,
      comment_urn: null,
      url_type: "unknown",
    };
  }

  const decoded = decodeURIComponent(url);
  const out: ParsedLinkedInUrl = {
    post_activity_id: null,
    post_urn: null,
    comment_id: null,
    comment_urn: null,
    url_type: "unknown",
  };

  // 1. Try comment URN first
  const commentMatch = decoded.match(COMMENT_URN_RE);
  if (commentMatch) {
    const [, kind, postId, commentId] = commentMatch;
    out.comment_id = commentId;
    out.post_urn = `urn:li:${kind}:${postId}`;
    if (kind === "activity") {
      out.post_activity_id = postId;
    }
    out.comment_urn = `urn:li:comment:(${out.post_urn},${commentId})`;
    out.url_type = "comment";
    return out;
  }

  // 2. Post URL variants
  const patterns: [RegExp, string][] = [
    [UGCPOST_SLUG_RE, "ugcPost"],
    [SHARE_SLUG_RE, "share"],
    [ACTIVITY_SLUG_RE, "activity"],
  ];

  for (const [pattern, kind] of patterns) {
    const m = decoded.match(pattern);
    if (m) {
      const pid = m[1];
      out.post_urn = `urn:li:${kind}:${pid}`;
      if (kind === "activity") {
        out.post_activity_id = pid;
      }
      out.url_type = "post";
      return out;
    }
  }

  return out;
}

export function buildParentCommentUrn(postUrn: string, parentCommentId: string): string {
  return `urn:li:comment:(${postUrn},${parentCommentId})`;
}
