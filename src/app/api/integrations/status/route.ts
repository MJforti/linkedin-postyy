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

  return NextResponse.json({
    publoraConfigured: publora.isConfigured(),
    publoraKeyPresent,
    linkedinPlatformIdPresent,
    apifyConfigured,
    pixfaroConfigured,
    missingPubloraReason: publora.getMissingConfigReason(),
  });
}
