"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Zap,
  Copy,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Bookmark,
  ShieldAlert,
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <h1 className="text-xl font-bold text-white tracking-tight">Hook & Formula Library</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            20 battle-tested 2026 hook formulas (F1–F20) and 10 Founder Edition angles (A1–A10).
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 rounded-lg bg-slate-900 border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setTab("formulas")}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              tab === "formulas" ? "bg-slate-800 text-white shadow-sm" : "text-slate-400 hover:text-white"
            }`}
          >
            20 Hook Formulas
          </button>
          <button
            onClick={() => setTab("founder")}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              tab === "founder" ? "bg-slate-800 text-white shadow-sm" : "text-slate-400 hover:text-white"
            }`}
          >
            10 Founder Angles
          </button>
        </div>
      </div>

      {tab === "formulas" && (
        <div className="space-y-6">
          {/* Goal Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-slate-400 mr-2">Filter by Goal:</span>
            {(["all", "comments", "reposts", "saves", "likes"] as const).map((g) => (
              <button
                key={g}
                onClick={() => setGoalFilter(g)}
                className={`px-3 py-1 text-xs font-medium rounded-md capitalize transition-colors ${
                  goalFilter === g
                    ? "bg-[#0A66C2] text-white"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
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
                className="p-5 rounded-xl border border-slate-800 bg-[#0f1523] space-y-3 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700/60">
                        {formula.code}
                      </span>
                      <h3 className="text-sm font-semibold text-white">{formula.name}</h3>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0A66C2]/20 text-[#0A66C2]">
                      Goal: {formula.bestFor}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {formula.whyItWorks}
                  </p>

                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 font-mono text-[11px] text-slate-300 leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
                    {formula.skeleton}
                  </div>

                  <div className="p-2 rounded bg-slate-900/60 border border-slate-800/80 text-[11px] text-slate-400 flex items-start gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>2026 Audit Note:</strong> {formula.reachNote2026}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                  <button
                    onClick={() => handleCopySkeleton(formula.code, formula.skeleton)}
                    className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                  >
                    {copiedCode === formula.code ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedCode === formula.code ? "Copied" : "Copy Skeleton"}</span>
                  </button>

                  <Link
                    href={`/create?formula=${formula.code}`}
                    className="flex items-center gap-1 text-xs font-medium text-[#0A66C2] hover:underline"
                  >
                    <span>Use in Writer</span>
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
              className="p-5 rounded-xl border border-slate-800 bg-[#0f1523] space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-sky-400 border border-slate-700/60">
                      {angle.code}
                    </span>
                    <h3 className="text-sm font-semibold text-white">{angle.name}</h3>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    {angle.territory}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {angle.description}
                </p>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 font-mono text-[11px] text-slate-300 leading-relaxed">
                  "{angle.template}"
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                <span className="text-[11px] text-slate-400">
                  Maps to Formula: <strong className="text-white">{angle.pinnedFormula || "Flexible"}</strong>
                </span>
                <Link
                  href={`/create?formula=${angle.pinnedFormula || "F17"}`}
                  className="flex items-center gap-1 text-xs font-medium text-[#0A66C2] hover:underline"
                >
                  <span>Use in Writer</span>
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
