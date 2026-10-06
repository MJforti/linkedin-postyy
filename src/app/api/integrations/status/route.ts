import { NextResponse } from "next/server";
import { PubloraClient } from "@/lib/external/publora-client";
import { ApifyClient } from "@/lib/external/apify-client";

export async function GET() {
  const publora = new PubloraClient();
  const apify = new ApifyClient();

  const publoraKeyPresent = Boolean(process.env.PUBLORA_API_KEY);
  const linkedinPlatformIdPresent = Boolean(process.env.LINKEDIN_PLATFORM_ID);
  const apifyConfigured = apify.isConfigured();
  const pixfaroConfigured = Boolean(process.env.PIXFARO_TOKEN);
  const grokConfigured = Boolean(process.env.GROK_API_KEY || process.env.XAI_API_KEY);
  const openaiConfigured = Boolean(process.env.OPENAI_API_KEY);
  const anthropicConfigured = Boolean(process.env.ANTHROPIC_API_KEY);

  return NextResponse.json({
    publoraConfigured: publora.isConfigured(),
    publoraKeyPresent,
    linkedinPlatformIdPresent,
    apifyConfigured,
    pixfaroConfigured,
    grokConfigured,
    openaiConfigured,
    anthropicConfigured,
    missingPubloraReason: publora.getMissingConfigReason(),
  });
}
