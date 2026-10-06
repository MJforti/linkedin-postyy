"use client";

import { useEffect, useState } from "react";
import {
  Radio,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Key,
  Database,
  Lock,
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
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-[#0A66C2]" />
            <h1 className="text-xl font-bold text-white tracking-tight">API Integrations & Environment</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Secure server-side API connections for auto-posting, feed scraping, and asset generation.
          </p>
        </div>

        <button
          onClick={fetchStatus}
          disabled={isLoading}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded border border-slate-700 bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
          <span>Check Status</span>
        </button>
      </div>

      {/* Security Architecture Note */}
      <div className="p-4 rounded-xl border border-slate-800 bg-[#0f1523] flex items-start gap-3">
        <Lock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <div className="font-semibold text-white">Server-Side Secret Isolation</div>
          <p className="text-slate-400 leading-relaxed">
            API keys and tokens are stored strictly in server-side environment variables and are never transmitted to the browser.
            When external integrations are unconfigured, the application runs seamlessly in <strong>Tier 0 (Local Draft Mode)</strong> with 1-click clipboard copying.
          </p>
        </div>
      </div>

      {/* Service Status Cards */}
      <div className="space-y-4">
        {/* Publora Publishing */}
        <div className="p-5 rounded-xl border border-slate-800 bg-[#0f1523] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-white">Publora REST API</span>
              <span className="text-[10px] font-mono text-slate-400">(Publishing Tier)</span>
            </div>
            <span className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 ${
              status?.publoraConfigured
                ? "bg-emerald-950/60 text-emerald-300 border border-emerald-800"
                : "bg-slate-800 text-slate-400 border border-slate-700"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${status?.publoraConfigured ? "bg-emerald-400" : "bg-slate-500"}`} />
              <span>{status?.publoraConfigured ? "Connected (Tier 1 Auto-Post)" : "Unconfigured (Tier 0 Draft Mode)"}</span>
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Enables one-click publishing and scheduling for LinkedIn posts and comments. Includes automated handling of LinkedIn URNs and thread flattening.
          </p>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono space-y-1.5 text-slate-300">
            <div className="flex items-center justify-between">
              <span>PUBLORA_API_KEY</span>
              <span className={status?.publoraKeyPresent ? "text-emerald-400" : "text-slate-500"}>
                {status?.publoraKeyPresent ? "✓ Set in environment" : "✗ Missing"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>LINKEDIN_PLATFORM_ID</span>
              <span className={status?.linkedinPlatformIdPresent ? "text-emerald-400" : "text-slate-500"}>
                {status?.linkedinPlatformIdPresent ? "✓ Set in environment" : "✗ Missing"}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 text-xs">
            <a
              href="https://app.publora.com/signup"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-[#0A66C2] hover:underline"
            >
              <span>Get Free Publora Key (15 posts/mo free)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Apify Read Layer */}
        <div className="p-5 rounded-xl border border-slate-800 bg-[#0f1523] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-white">Apify Platform</span>
              <span className="text-[10px] font-mono text-slate-400">(Read Layer)</span>
            </div>
            <span className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 ${
              status?.apifyConfigured
                ? "bg-emerald-950/60 text-emerald-300 border border-emerald-800"
                : "bg-slate-800 text-slate-400 border border-slate-700"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${status?.apifyConfigured ? "bg-emerald-400" : "bg-slate-500"}`} />
              <span>{status?.apifyConfigured ? "Connected" : "Unconfigured (Manual Paste Active)"}</span>
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Fetches post body, comment threads, and engagement statistics by URL without requiring user cookies.
          </p>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono space-y-1.5 text-slate-300">
            <div className="flex items-center justify-between">
              <span>APIFY_TOKEN</span>
              <span className={status?.apifyConfigured ? "text-emerald-400" : "text-slate-500"}>
                {status?.apifyConfigured ? "✓ Set in environment" : "✗ Missing"}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 text-xs">
            <a
              href="https://console.apify.com/sign-up"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-[#0A66C2] hover:underline"
            >
              <span>Get Free Apify Token ($5/mo free credit)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
