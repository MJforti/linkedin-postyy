"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Zap,
  Copy,
  CheckCircle2,
  ArrowRight,
  SquarePen,
  Target,
} from "lucide-react";
import { HOOK_FORMULAS, FOUNDER_ANGLES } from "@/lib/hook-formulas";
import { EngagementGoal } from "@/lib/types";

export default function HookLibraryPage() {
  const [goalFilter, setGoalFilter] = useState<EngagementGoal | "all">("all");
  const [tab, setTab] = useState<"formulas" | "founder">("formulas");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const filteredFormulas = HOOK_FORMULAS.filter((f) => {
    if (goalFilter === "all") return true;
    return f.bestFor === goalFilter;
  });

  const handleCopySkeleton = (code: string, skeleton: string) => {
    navigator.clipboard.writeText(skeleton);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-medium text-[#175CD3] bg-[#EFF8FF] border border-[#D1E9FF] px-2.5 py-0.5 rounded-full uppercase">
              TOOLS // HOOK GENERATOR
            </span>
            <span className="text-xs font-mono text-[#667085]">2026 HEURISTICS</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#101828]">
            Hook &amp; Formula Engine
          </h1>
          <p className="text-xs text-[#475467] mt-0.5">
            20 battle-tested canonical formulas (F1–F20) and 10 Founder Edition narrative angles (A1–A10).
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 rounded-lg bg-[#F2F4F7] self-start sm:self-auto">
          <button
            onClick={() => setTab("formulas")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              tab === "formulas"
                ? "bg-white text-[#101828] shadow-xs"
                : "text-[#667085] hover:text-[#101828]"
            }`}
          >
            20 Hook Formulas
          </button>
          <button
            onClick={() => setTab("founder")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              tab === "founder"
                ? "bg-white text-[#101828] shadow-xs"
                : "text-[#667085] hover:text-[#101828]"
            }`}
          >
            10 Founder Angles
          </button>
        </div>
      </div>

      {tab === "formulas" && (
        <div className="space-y-4">
          {/* Goal Filter */}
          <div className="flex flex-wrap items-center gap-2 pb-1">
            <span className="text-xs font-semibold text-[#344054] mr-2">Filter Goal:</span>
            {(["all", "comments", "reposts", "saves", "likes"] as const).map((g) => (
              <button
                key={g}
                onClick={() => setGoalFilter(g)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition-colors ${
                  goalFilter === g
                    ? "bg-[#EFF8FF] text-[#175CD3] border border-[#D1E9FF]"
                    : "bg-white text-[#667085] hover:text-[#101828] border border-[#EAECF0]"
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Formulas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFormulas.map((formula) => (
              <div
                key={formula.code}
                className="p-5 rounded-xl bg-white border border-[#EAECF0] hover:border-[#D0D5DD] shadow-xs space-y-3 flex flex-col justify-between transition-all group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#EFF8FF] text-[#175CD3] border border-[#D1E9FF]">
                        {formula.code}
                      </span>
                      <h2 className="text-sm font-bold text-[#101828]">
                        {formula.name}
                      </h2>
                    </div>
                    <span className="text-[10px] font-mono text-[#027A48] bg-[#ECFDF3] px-2 py-0.5 rounded-full font-semibold uppercase">
                      {formula.bestFor}
                    </span>
                  </div>

                  <p className="text-xs text-[#475467] leading-relaxed">
                    {formula.whyItWorks}
                  </p>

                  <div className="p-3 rounded-lg bg-[#FAFBFD] border border-[#EAECF0] space-y-1">
                    <div className="text-[10px] font-mono font-bold uppercase text-[#667085]">
                      Pattern Blueprint
                    </div>
                    <div className="text-xs font-mono text-[#101828] leading-snug">
                      {formula.skeleton}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#F2F4F7]">
                  <button
                    onClick={() => handleCopySkeleton(formula.code, formula.skeleton)}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-[#344054] hover:bg-[#F2F4F7] bg-white border border-[#D0D5DD] rounded-lg transition-colors"
                  >
                    {copiedCode === formula.code ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#027A48]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-[#667085]" />
                    )}
                    <span>{copiedCode === formula.code ? "Copied" : "Copy Template"}</span>
                  </button>

                  <Link
                    href={`/create?formula=${formula.code}`}
                    className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-white bg-[#004EEB] hover:bg-[#0040C1] rounded-lg shadow-xs transition-colors"
                  >
                    <span>Write Post</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "founder" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FOUNDER_ANGLES.map((angle) => (
            <div
              key={angle.code}
              className="p-5 rounded-xl bg-white border border-[#EAECF0] hover:border-[#D0D5DD] shadow-xs space-y-3 flex flex-col justify-between transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#FEF0C7] text-[#B54708] border border-[#FEDF89]">
                    {angle.code}
                  </span>
                  <h2 className="text-sm font-bold text-[#101828]">
                    {angle.name}
                  </h2>
                </div>

                <p className="text-xs text-[#475467] leading-relaxed">
                  {angle.description}
                </p>

                <div className="p-3 rounded-lg bg-[#FAFBFD] border border-[#EAECF0] space-y-1">
                  <div className="text-[10px] font-mono font-bold uppercase text-[#667085]">
                    Example Opener
                  </div>
                  <div className="text-xs text-[#101828] italic">
                    &quot;{angle.template}&quot;
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#F2F4F7] flex justify-end">
                <Link
                  href={`/create?formula=F17`}
                  className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-[#004EEB] hover:bg-[#EFF8FF] rounded-lg transition-colors"
                >
                  <span>Apply in Writer</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
