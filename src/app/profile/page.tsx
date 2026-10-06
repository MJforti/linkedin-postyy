"use client";

import { useState } from "react";
import {
  UserCheck,
  Copy,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  Target,
  FileText,
} from "lucide-react";
import { ProfileAudit } from "@/lib/types";

export default function ProfileOptimizerPage() {
  const [name, setName] = useState("Elena Rostova");
  const [currentHeadline, setCurrentHeadline] = useState("");
  const [currentAbout, setCurrentAbout] = useState("");
  const [roleOrSpecialty, setRoleOrSpecialty] = useState("Founder & Operations Architect");
  const [targetAudience, setTargetAudience] = useState("Series A/B SaaS founders and product teams");
  const [keyAchievement, setKeyAchievement] = useState("scaled autonomous engineering pods with 70% lower burn");
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
          name,
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-medium text-[#175CD3] bg-[#EFF8FF] border border-[#D1E9FF] px-2.5 py-0.5 rounded-full uppercase">
              TOOLS // PROFILE OPTIMIZER
            </span>
            <span className="text-xs font-mono text-[#667085]">POSITIONING BENCHMARK</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#101828]">
            Profile Positioning Optimizer
          </h1>
          <p className="text-xs text-[#475467] mt-0.5">
            Craft high-converting headlines and authoritative About sections built for inbound client capture.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Input Form (5 cols) */}
        <div className="lg:col-span-5 p-5 rounded-xl bg-white border border-[#EAECF0] shadow-xs space-y-4">
          <div className="pb-3 border-b border-[#EAECF0]">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#101828]">
              Positioning Inputs
            </h2>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#344054]">Your Role or Specialty</label>
            <input
              type="text"
              value={roleOrSpecialty}
              onChange={(e) => setRoleOrSpecialty(e.target.value)}
              placeholder="e.g. Founder & Operations Architect"
              className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-[#D0D5DD] text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:border-[#004EEB]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#344054]">Target Audience</label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g. Series A/B B2B founders and engineering leads"
              className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-[#D0D5DD] text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:border-[#004EEB]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#344054]">Signature Achievement / Metric</label>
            <input
              type="text"
              value={keyAchievement}
              onChange={(e) => setKeyAchievement(e.target.value)}
              placeholder="e.g. scaled autonomous pipelines with 70% lower burn"
              className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-[#D0D5DD] text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:border-[#004EEB]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#344054]">Current Headline (Optional)</label>
            <input
              type="text"
              value={currentHeadline}
              onChange={(e) => setCurrentHeadline(e.target.value)}
              placeholder="Paste existing headline to audit..."
              className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-[#D0D5DD] text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:border-[#004EEB]"
            />
          </div>

          <button
            onClick={handleOptimize}
            disabled={isLoading || !roleOrSpecialty.trim()}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-[#004EEB] hover:bg-[#0040C1] rounded-lg shadow-sm transition-colors disabled:opacity-40"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Optimizing Positioning...</span>
              </>
            ) : (
              <>
                <UserCheck className="w-3.5 h-3.5" />
                <span>Generate Profile Pack</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Results (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {audit ? (
            <div className="space-y-4">
              {/* Headlines Card */}
              <div className="p-5 rounded-xl bg-white border border-[#EAECF0] shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#EAECF0]">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#101828]">
                    Optimized Headline
                  </h3>
                  <span className="text-[10px] font-mono text-[#027A48] font-bold">
                    RECOMMENDED
                  </span>
                </div>

                <div className="p-3.5 rounded-lg bg-[#FAFBFD] border border-[#EAECF0] flex items-center justify-between gap-3 group">
                  <div>
                    <span className="text-xs font-semibold text-[#101828] leading-relaxed">
                      {audit.headline.recommended}
                    </span>
                    <p className="text-[11px] text-[#667085] mt-1">
                      {audit.headline.critique}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopy("headline", audit.headline.recommended)}
                    className="px-2.5 py-1 text-xs font-semibold text-[#344054] hover:bg-white bg-white border border-[#D0D5DD] rounded-lg shrink-0 transition-colors"
                  >
                    {copiedSection === "headline" ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#027A48]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-[#667085]" />
                    )}
                  </button>
                </div>
              </div>

              {/* About Section */}
              <div className="p-5 rounded-xl bg-white border border-[#EAECF0] shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#EAECF0]">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#101828]">
                    Authoritative &quot;About&quot; Narrative
                  </h3>
                  <button
                    onClick={() => handleCopy("about", audit.about.recommended)}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-[#344054] hover:bg-[#F2F4F7] bg-white border border-[#D0D5DD] rounded-lg transition-colors"
                  >
                    {copiedSection === "about" ? (
                      <CheckCircle2 className="w-3 h-3 text-[#027A48]" />
                    ) : (
                      <Copy className="w-3 h-3 text-[#667085]" />
                    )}
                    <span>Copy Section</span>
                  </button>
                </div>

                <div className="p-3.5 rounded-lg bg-[#FAFBFD] border border-[#EAECF0] text-xs text-[#101828] whitespace-pre-line leading-relaxed">
                  {audit.about.recommended}
                </div>
              </div>

              {/* Scorecard */}
              {audit.scorecard && (
                <div className="p-5 rounded-xl bg-white border border-[#EAECF0] shadow-xs space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#101828] pb-2 border-b border-[#EAECF0]">
                    2026 Conversion Scorecard
                  </h3>
                  <div className="space-y-2">
                    {audit.scorecard.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-[#FAFBFD] border border-[#EAECF0] flex items-start justify-between gap-3 text-xs"
                      >
                        <div>
                          <div className="font-semibold text-[#101828]">{item.component}</div>
                          <div className="text-[11px] text-[#667085] mt-0.5">{item.criteria2026}</div>
                          {item.fix && <div className="text-[11px] text-[#004EEB] mt-0.5 font-medium">{item.fix}</div>}
                        </div>
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase shrink-0 ${
                            item.status === "pass"
                              ? "bg-[#ECFDF3] text-[#027A48]"
                              : "bg-[#FEF0C7] text-[#B54708]"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 rounded-xl bg-white border border-[#EAECF0] shadow-xs text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#F2F4F7] text-[#667085] flex items-center justify-center mx-auto">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#101828]">
                Ready to Optimize Your Profile
              </h3>
              <p className="text-xs text-[#667085] max-w-sm mx-auto leading-relaxed">
                Fill in your specialty and key results on the left to generate 3 high-converting headlines and a complete narrative About section.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
