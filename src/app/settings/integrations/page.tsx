"use client";

import { useEffect, useState } from "react";
import {
  Share2,
  CheckCircle2,
  RefreshCw,
  Lock,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

export default function IntegrationsPage() {
  const [status, setStatus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStatus = () => {
    setIsLoading(true);
    fetch("/api/integrations/status")
      .then((r) => r.json())
      .then((data) => setStatus(data))
      .catch(() => {})
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-medium text-[#175CD3] bg-[#EFF8FF] border border-[#D1E9FF] px-2.5 py-0.5 rounded-full uppercase">
              SETTINGS // INTEGRATIONS
            </span>
            <span className="text-xs font-mono text-[#667085]">DIAGNOSTICS</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#101828]">
            API Integrations &amp; Environment
          </h1>
          <p className="text-xs text-[#475467] mt-0.5">
            Manage your server-side connectors for automated publishing, URL scraping, and AI models.
          </p>
        </div>

        <button
          onClick={fetchStatus}
          disabled={isLoading}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#344054] hover:bg-[#F9FAFB] bg-white border border-[#D0D5DD] rounded-lg shadow-xs transition-colors self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
          <span>Refresh Status</span>
        </button>
      </div>

      {/* Security Architecture Note */}
      <div className="p-4 rounded-xl bg-white border border-[#EAECF0] shadow-xs flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#ECFDF3] text-[#027A48] flex items-center justify-center shrink-0">
          <Lock className="w-4 h-4" />
        </div>
        <div className="text-xs space-y-1">
          <div className="font-bold text-[#101828]">Zero-Leak Security Architecture</div>
          <p className="text-[#475467] leading-relaxed">
            All API credentials (xAI Grok, Publora, Apify) are securely isolated in server-side environment variables and are never transmitted to the browser client.
            If keys are missing, the application operates in <strong>Tier 0 (Manual Draft Mode)</strong> with 1-click clipboard copying.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="space-y-4">
        {/* Grok (xAI) LLM Engine */}
        <div className="p-5 rounded-xl bg-white border border-[#EAECF0] shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#EAECF0]">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-[#101828]">xAI Grok API (LLM Engine)</span>
              <span className="text-[10px] font-mono text-[#667085]">grok-2-latest</span>
            </div>
            <span
              className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 ${
                status?.grokConfigured
                  ? "bg-[#ECFDF3] text-[#027A48] border border-[#A6F4C5]"
                  : "bg-[#F2F4F7] text-[#667085] border border-[#EAECF0]"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${status?.grokConfigured ? "bg-[#12B76A]" : "bg-[#98A2B3]"}`} />
              <span>{status?.grokConfigured ? "Active (Grok-2 Connected)" : "Optional (Deterministic Heuristic Fallback)"}</span>
            </span>
          </div>

          <p className="text-xs text-[#475467] leading-relaxed">
            Powers dynamic hook variation, post drafting, and comment synthesis. When absent, the system uses deterministic formula templates without failing.
          </p>

          <div className="p-3 rounded-lg bg-[#FAFBFD] border border-[#EAECF0] text-xs font-mono space-y-1.5 text-[#344054]">
            <div className="flex items-center justify-between">
              <span>GROK_API_KEY / XAI_API_KEY</span>
              <span className={status?.grokConfigured ? "text-[#027A48] font-bold" : "text-[#667085]"}>
                {status?.grokConfigured ? "✓ Configured in Server Env" : "— Unset (Using local formula engine)"}
              </span>
            </div>
          </div>
        </div>

        {/* Publora Publishing */}
        <div className="p-5 rounded-xl bg-white border border-[#EAECF0] shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#EAECF0]">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-[#101828]">Publora REST API</span>
              <span className="text-[10px] font-mono text-[#667085]">(Publishing Tier)</span>
            </div>
            <span
              className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 ${
                status?.publoraConfigured
                  ? "bg-[#ECFDF3] text-[#027A48] border border-[#A6F4C5]"
                  : "bg-[#F2F4F7] text-[#667085] border border-[#EAECF0]"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${status?.publoraConfigured ? "bg-[#12B76A]" : "bg-[#98A2B3]"}`} />
              <span>{status?.publoraConfigured ? "Connected (Tier 1 Auto-Dispatch)" : "Tier 0 (Manual Clipboard Mode)"}</span>
            </span>
          </div>

          <p className="text-xs text-[#475467] leading-relaxed">
            Direct-to-LinkedIn publishing and scheduling. Free tier provides 15 scheduled posts/month.
          </p>

          <div className="p-3 rounded-lg bg-[#FAFBFD] border border-[#EAECF0] text-xs font-mono space-y-1.5 text-[#344054]">
            <div className="flex items-center justify-between">
              <span>PUBLORA_API_KEY</span>
              <span className={status?.publoraKeyPresent ? "text-[#027A48] font-bold" : "text-[#667085]"}>
                {status?.publoraKeyPresent ? "✓ Set in environment" : "— Missing"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>LINKEDIN_PLATFORM_ID</span>
              <span className={status?.linkedinPlatformIdPresent ? "text-[#027A48] font-bold" : "text-[#667085]"}>
                {status?.linkedinPlatformIdPresent ? "✓ Set in environment" : "— Missing"}
              </span>
            </div>
          </div>
        </div>

        {/* Apify Reader */}
        <div className="p-5 rounded-xl bg-white border border-[#EAECF0] shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#EAECF0]">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-[#101828]">Apify Scraping Layer</span>
              <span className="text-[10px] font-mono text-[#667085]">(Read Tier)</span>
            </div>
            <span
              className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 ${
                status?.apifyConfigured
                  ? "bg-[#ECFDF3] text-[#027A48] border border-[#A6F4C5]"
                  : "bg-[#F2F4F7] text-[#667085] border border-[#EAECF0]"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${status?.apifyConfigured ? "bg-[#12B76A]" : "bg-[#98A2B3]"}`} />
              <span>{status?.apifyConfigured ? "Active (URL Fetch Enabled)" : "Tier 0 (Paste Text Directly)"}</span>
            </span>
          </div>

          <p className="text-xs text-[#475467] leading-relaxed">
            Fetches live LinkedIn posts and comment threads by pasting a URL. Free tier includes $5/month credits.
          </p>

          <div className="p-3 rounded-lg bg-[#FAFBFD] border border-[#EAECF0] text-xs font-mono space-y-1.5 text-[#344054]">
            <div className="flex items-center justify-between">
              <span>APIFY_TOKEN</span>
              <span className={status?.apifyConfigured ? "text-[#027A48] font-bold" : "text-[#667085]"}>
                {status?.apifyConfigured ? "✓ Set in environment" : "— Missing (Use manual paste)"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
