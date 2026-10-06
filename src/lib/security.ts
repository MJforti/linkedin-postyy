import { z } from "zod";

const INJECTION_PATTERNS = [
  /ignore (?:all )?previous instructions/gi,
  /disregard (?:all )?prior instructions/gi,
  /you are now (?:in )?DAN mode/gi,
  /system prompt/gi,
  /developer mode/gi,
  /<instructions>/gi,
  /<\/instructions>/gi,
  /\{system_instruction\}/gi,
];

export function sanitizeUntrustedContent(rawContent: string): string {
  if (!rawContent || typeof rawContent !== "string") {
    return "";
  }

  let sanitized = rawContent;
  for (const pattern of INJECTION_PATTERNS) {
    sanitized = sanitized.replace(pattern, "[FILTERED_UNTRUSTED_INSTRUCTION]");
  }

  // Strip dangerous HTML/script injection attempts
  sanitized = sanitized
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/onload=/gi, "")
    .replace(/onerror=/gi, "");

  return sanitized.trim();
}

export const LinkedInUrlSchema = z
  .string()
  .url("Please enter a valid URL")
  .refine(
    (url) => {
      try {
        const parsed = new URL(url);
        return parsed.hostname.endsWith("linkedin.com");
      } catch {
        return false;
      }
    },
    { message: "URL must be a valid linkedin.com address" }
  );

export function validateLinkedInUrl(url: string): { valid: boolean; error?: string } {
  const result = LinkedInUrlSchema.safeParse(url);
  if (!result.success) {
    return { valid: false, error: result.error.errors[0]?.message || "Invalid URL" };
  }
  return { valid: true };
}
