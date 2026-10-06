"use client";

import { useState } from "react";
import {
  UserCheck,
  Copy,
  CheckCircle2,
  RefreshCw,
  AlertCircle,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { ProfileAudit } from "@/lib/types";

export default function ProfileOptimizerPage() {
  const [name, setName] = useState("");
  const [currentHeadline, setCurrentHeadline] = useState("");
  const [currentAbout, setCurrentAbout] = useState("");
  const [roleOrSpecialty, setRoleOrSpecialty] = useState("Founder & AI Workflow Architect");
  const [targetAudience, setTargetAudience] = useState("B2B SaaS founders and product teams");
  const [keyAchievement, setKeyAchievement] = useState("scaling autonomous pipelines with zero headcount bloat");
  const [goal, setGoal] = useState<"clients" | "authority" | "career">("clients");

  const [audit, setAudit] = useState<ProfileAudit | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleOptimize = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/analyze/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || "LinkedIn Creator",
          currentHeadline,
          currentAbout,
          roleOrSpecialty,
          targetAudience,
          keyAchievement,
          goal,
        }),
      });

      const data = await res.json();
      if (data.success && data.audit) {
        setAudit(data.audit);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (section: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-sky-400" />
          <h1 className="text-xl font-bold text-white tracking-tight">LinkedIn Profile Optimizer</h1>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Audit and rewrite your Headline, About, and Featured positioning according to 2026 conversion benchmarks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* INPUTS (5 cols) */}
        <div className="lg:col-span-5 p-5 rounded-xl border border-slate-800 bg-[#0f1523] space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Your Core Role / Specialty</label>
            <input
              type="text"
              value={roleOrSpecialty}
              onChange={(e) => setRoleOrSpecialty(e.target.value)}
              placeholder="e.g. Founder & Operations Architect"
              className="w-full px-3 py-1.5 text-xs rounded-md bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-[#0A66C2]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Who You Help (Audience)</label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g. Series A/B B2B founders and engineering leads"
              className="w-full px-3 py-1.5 text-xs rounded-md bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-[#0A66C2]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Measurable Outcome / Result</label>
            <input
              type="text"
              value={keyAchievement}
              onChange={(e) => setKeyAchievement(e.target.value)}
              placeholder="e.g. cut operating turnaround from 14 days to 4 hours"
              className="w-full px-3 py-1.5 text-xs rounded-md bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-[#0A66C2]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Primary Conversion Goal</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value as any)}
              className="w-full px-2.5 py-1.5 text-xs rounded-md bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-[#0A66C2]"
            >
              <option value="clients">Inbound Clients & Leads</option>
              <option value="authority">Industry Authority & Media</option>
              <option value="career">Executive Opportunities</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Current Headline (Optional)</label>
            <input
              type="text"
              value={currentHeadline}
              onChange={(e) => setCurrentHeadline(e.target.value)}
              placeholder="Paste current LinkedIn headline..."
              className="w-full px-3 py-1.5 text-xs rounded-md bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-[#0A66C2]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Current About Section (Optional)</label>
            <textarea
              rows={4}
              value={currentAbout}
              onChange={(e) => setCurrentAbout(e.target.value)}
              placeholder="Paste current About section..."
              className="w-full p-2.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-[#0A66C2] resize-none"
            />
          </div>

          <button
            onClick={handleOptimize}
            disabled={isLoading || !roleOrSpecialty.trim() || !targetAudience.trim()}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-medium text-white bg-sky-600 hover:bg-sky-500 rounded-md shadow-sm transition-colors disabled:opacity-40"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Auditing Profile Components...</span>
              </>
            ) : (
              <>
                <UserCheck className="w-3.5 h-3.5" />
                <span>Generate Profile Optimization</span>
              </>
            )}
          </button>
        </div>

        {/* OUTPUTS (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {audit ? (
            <div className="space-y-4">
              {/* Headline Card */}
              <div className="p-5 rounded-xl border border-slate-800 bg-[#0f1523] space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-semibold text-white">Recommended Headline (220 Chars)</span>
                  <button
                    onClick={() => handleCopy("headline", audit.headline.recommended)}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-white"
                  >
                    {copiedSection === "headline" ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedSection === "headline" ? "Copied" : "Copy Headline"}</span>
                  </button>
                </div>
                <p className="text-xs font-medium text-slate-100 p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono leading-relaxed">
                  {audit.headline.recommended}
                </p>
                <div className="text-[11px] text-slate-400 flex items-center justify-between font-mono">
                  <span>{audit.headline.charCount} / 220 chars</span>
                  <span className="text-emerald-400">Positioning Optimized</span>
                </div>
              </div>

              {/* About Section Card */}
              <div className="p-5 rounded-xl border border-slate-800 bg-[#0f1523] space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-semibold text-white">Recommended 7-Step About Section</span>
                  <button
                    onClick={() => handleCopy("about", audit.about.recommended)}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-white"
                  >
                    {copiedSection === "about" ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedSection === "about" ? "Copied" : "Copy About"}</span>
                  </button>
                </div>
                <div className="text-xs text-slate-200 p-3 rounded-lg bg-slate-950 border border-slate-800 font-sans whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
                  {audit.about.recommended}
                </div>
              </div>

              {/* Nine-Component Scorecard */}
              <div className="p-5 rounded-xl border border-slate-800 bg-[#0f1523] space-y-3">
                <span className="text-xs font-semibold text-white">Nine-Component Scorecard</span>
                <div className="space-y-2">
                  {audit.scorecard.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/60 flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="font-semibold text-slate-200">{item.component}</div>
                        <div className="text-[11px] text-slate-400">{item.criteria2026}</div>
                      </div>
                      <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded capitalize shrink-0 ${
                        item.status === "pass"
                          ? "bg-emerald-950/60 text-emerald-300 border border-emerald-800"
                          : "bg-amber-950/60 text-amber-300 border border-amber-800"
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-16 text-center rounded-xl border border-dashed border-slate-800 bg-[#0f1523]/40 text-slate-500 space-y-2">
              <UserCheck className="w-6 h-6 text-slate-600 mx-auto" />
              <p className="text-xs">
                Fill in your specialty and audience on the left to generate the 2026 profile optimization.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
