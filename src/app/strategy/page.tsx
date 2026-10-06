"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Target,
  Calendar,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  RefreshCw,
  Bookmark,
  PenSquare,
} from "lucide-react";
import { ContentPlan } from "@/lib/types";
import { getStoredContentPlan, saveContentPlan } from "@/lib/storage";

export default function ContentStrategyPage() {
  const [theme, setTheme] = useState("AI agent workflows & operational leverage");
  const [targetAudience, setTargetAudience] = useState("Founders, CTOs, and Engineering Leaders");
  const [founderMode, setFounderMode] = useState(true);
  const [plan, setPlan] = useState<ContentPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [savedStatus, setSavedStatus] = useState(false);

  useEffect(() => {
    const stored = getStoredContentPlan();
    if (stored) {
      setPlan(stored);
      setTheme(stored.theme);
      setTargetAudience(stored.targetAudience);
    }
  }, []);

  const handleGeneratePlan = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/content-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          theme,
          targetAudience,
          founderMode,
        }),
      });

      const data = await res.json();
      if (data.success && data.plan) {
        setPlan(data.plan);
        saveContentPlan(data.plan);
        setSavedStatus(true);
        setTimeout(() => setSavedStatus(false), 2500);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-[#0A66C2]" />
            <h1 className="text-xl font-bold text-white tracking-tight">Content Strategy & Weekly Planner</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Build 7-day cadences balanced across Authority, Narrative, and Community pillars.
          </p>
        </div>

        {savedStatus && (
          <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Saved to workspace</span>
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* INPUTS (4 cols) */}
        <div className="lg:col-span-4 p-5 rounded-xl border border-slate-800 bg-[#0f1523] space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Weekly Theme / Focus</label>
            <input
              type="text"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="e.g. Scaling autonomous pipelines"
              className="w-full px-3 py-1.5 text-xs rounded-md bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-[#0A66C2]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Target Audience</label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g. B2B founders, Series A CTOs"
              className="w-full px-3 py-1.5 text-xs rounded-md bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-[#0A66C2]"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border border-slate-800 bg-slate-900/60">
            <div>
              <div className="text-xs font-semibold text-white">Founder Edition Mode</div>
              <div className="text-[11px] text-slate-400">Applies high-trust narrow ICP angles (A1–A10)</div>
            </div>
            <input
              type="checkbox"
              checked={founderMode}
              onChange={(e) => setFounderMode(e.target.checked)}
              className="w-4 h-4 rounded text-[#0A66C2] focus:ring-0 bg-slate-950 border-slate-800"
            />
          </div>

          <button
            onClick={handleGeneratePlan}
            disabled={isLoading || !theme.trim()}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-medium text-white bg-[#0A66C2] hover:bg-[#084e96] rounded-md shadow-sm transition-colors disabled:opacity-40"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Building Strategic Calendar...</span>
              </>
            ) : (
              <>
                <Target className="w-3.5 h-3.5" />
                <span>Generate 7-Day Strategy</span>
              </>
            )}
          </button>
        </div>

        {/* OUTPUT: 7-Day Schedule (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {plan ? (
            <div className="space-y-4">
              {/* Daily Cards */}
              <div className="space-y-3">
                {plan.days.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border transition-all ${
                      item.pillar === "Off"
                        ? "border-slate-800/60 bg-[#0f1523]/50 opacity-70"
                        : "border-slate-800 bg-[#0f1523]"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-white">
                          {item.day}
                        </span>
                        <span className="text-xs font-semibold text-slate-200">
                          {item.pillar} Pillar
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          {item.postingTime}
                        </span>
                      </div>

                      {item.pillar !== "Off" && (
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0A66C2]/20 text-[#0A66C2]">
                            Goal: {item.goal}
                          </span>
                          <Link
                            href={`/create?formula=${item.hookFormula.split(" ")[0]}`}
                            className="text-xs font-medium text-[#0A66C2] hover:underline flex items-center gap-1"
                          >
                            <PenSquare className="w-3 h-3" />
                            <span>Draft Post</span>
                          </Link>
                        </div>
                      )}
                    </div>

                    <div className="pt-2.5 space-y-1.5 text-xs">
                      <p className="text-slate-300 font-medium leading-relaxed">
                        {item.angle}
                      </p>
                      {item.pillar !== "Off" && (
                        <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 font-mono">
                          <span>Formula: <strong className="text-white">{item.hookFormula}</strong></span>
                          <span>CTA: <strong className="text-white">{item.ctaType}</strong></span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Inbound-Readiness Checklist */}
              <div className="p-4 rounded-xl border border-slate-800 bg-[#0f1523] space-y-2.5">
                <h3 className="text-xs font-semibold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Weekly Inbound-Readiness Audit</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {plan.readinessChecklist.map((chk, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>{chk.item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-16 text-center rounded-xl border border-dashed border-slate-800 bg-[#0f1523]/40 text-slate-500 space-y-2">
              <Calendar className="w-6 h-6 text-slate-600 mx-auto" />
              <p className="text-xs">
                Configure your weekly theme on the left to generate the 7-day content schedule.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
