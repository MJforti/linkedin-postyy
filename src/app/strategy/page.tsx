"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Compass,
  Plus,
  ArrowRight,
  RefreshCw,
  CheckCircle2,
  SquarePen,
  Bookmark,
  Calendar,
  Layers,
} from "lucide-react";
import { ContentPlan } from "@/lib/types";
import { getStoredContentPlan, saveContentPlan } from "@/lib/storage";

export default function ContentStrategyPage() {
  const [theme, setTheme] = useState("Autonomous AI agents and structural billing disruption");
  const [targetAudience, setTargetAudience] = useState("Enterprise CTOs, Founders, and Operators");
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-medium text-[#175CD3] bg-[#EFF8FF] border border-[#D1E9FF] px-2.5 py-0.5 rounded-full uppercase">
              TOOLS // CONTENT STRATEGY
            </span>
            <span className="text-xs font-mono text-[#667085]">WEEKLY CADENCE</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#101828]">
            Content Strategy &amp; Pillars
          </h1>
          <p className="text-xs text-[#475467] mt-0.5">
            Architect a 7-day executive publishing roadmap balanced across Authority, Narrative, and Community pillars.
          </p>
        </div>

        {savedStatus && (
          <span className="text-xs font-medium text-[#027A48] bg-[#ECFDF3] border border-[#A6F4C5] px-3 py-1 rounded-lg">
            Saved to workspace
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Input Parameters (4 cols) */}
        <div className="lg:col-span-4 p-5 rounded-xl bg-white border border-[#EAECF0] shadow-xs space-y-4">
          <div className="pb-3 border-b border-[#EAECF0]">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#101828]">
              Strategy Parameters
            </h2>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#344054]">
              Weekly Focus Theme
            </label>
            <input
              type="text"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="e.g. AI agent leverage & billable hours collapse"
              className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-[#D0D5DD] text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:border-[#004EEB]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#344054]">
              Target Audience
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g. Enterprise CTOs, engineering leaders"
              className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-[#D0D5DD] text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:border-[#004EEB]"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="founderMode"
              checked={founderMode}
              onChange={(e) => setFounderMode(e.target.checked)}
              className="rounded border-[#D0D5DD] text-[#004EEB] focus:ring-[#004EEB]"
            />
            <label htmlFor="founderMode" className="text-xs font-medium text-[#344054]">
              Executive / Founder Voice Angle
            </label>
          </div>

          <button
            onClick={handleGeneratePlan}
            disabled={isLoading || !theme.trim()}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-[#004EEB] hover:bg-[#0040C1] rounded-lg shadow-sm transition-colors disabled:opacity-40"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Synthesizing Strategy...</span>
              </>
            ) : (
              <>
                <Compass className="w-3.5 h-3.5" />
                <span>Generate Weekly Plan</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Pillars & Weekly Ideas (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {plan ? (
            <div className="space-y-4">
              {/* Pillars Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-white border border-[#EAECF0] shadow-xs space-y-1">
                  <div className="text-[10px] font-mono font-bold uppercase text-[#175CD3]">Pillar 01</div>
                  <div className="text-xs font-bold text-[#101828]">Authority &amp; Proof</div>
                  <p className="text-[11px] text-[#667085] leading-relaxed">
                    Hard metrics, customer case audits, and contrarian teardowns.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#EAECF0] shadow-xs space-y-1">
                  <div className="text-[10px] font-mono font-bold uppercase text-[#7F56D9]">Pillar 02</div>
                  <div className="text-xs font-bold text-[#101828]">Operator Narrative</div>
                  <p className="text-[11px] text-[#667085] leading-relaxed">
                    Personal reflections, operational pivots, and brutal lessons.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#EAECF0] shadow-xs space-y-1">
                  <div className="text-[10px] font-mono font-bold uppercase text-[#027A48]">Pillar 03</div>
                  <div className="text-xs font-bold text-[#101828]">Community &amp; Debate</div>
                  <p className="text-[11px] text-[#667085] leading-relaxed">
                    High-engagement questions and tactical playbooks for comments.
                  </p>
                </div>
              </div>

              {/* Day-by-Day Post Ideas */}
              <div className="p-5 rounded-xl bg-white border border-[#EAECF0] shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#EAECF0]">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#101828]">
                    Generated Weekly Schedule
                  </h3>
                  <span className="text-[11px] font-mono text-[#667085]">
                    {plan.days.length} targeted posts
                  </span>
                </div>

                <div className="space-y-3 pt-1">
                  {plan.days.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#FAFBFD] border border-[#EAECF0] hover:border-[#D0D5DD] transition-all space-y-2 group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#101828]">
                            {item.day}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-[#EAECF0] text-[#175CD3] font-semibold">
                            [{item.hookFormula}]
                          </span>
                          <span className="text-[11px] text-[#667085]">
                            {item.pillar}
                          </span>
                          {item.postingTime && (
                            <span className="text-[10px] font-mono text-[#027A48]">
                              • {item.postingTime}
                            </span>
                          )}
                        </div>

                        <Link
                          href={`/create?formula=${item.hookFormula}&topic=${encodeURIComponent(item.angle)}`}
                          className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-[#004EEB] hover:bg-white rounded-lg transition-colors border border-transparent hover:border-[#EAECF0]"
                        >
                          <span>Convert to Post</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>

                      <div className="text-xs font-bold text-[#101828]">
                        {item.angle}
                      </div>
                      <p className="text-xs text-[#475467] leading-relaxed">
                        CTA Strategy: {item.ctaType} • Format: {item.format}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-xl bg-white border border-[#EAECF0] shadow-xs text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#F2F4F7] text-[#667085] flex items-center justify-center mx-auto">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#101828]">
                Ready to Outline Your Content Cadence
              </h3>
              <p className="text-xs text-[#667085] max-w-sm mx-auto leading-relaxed">
                Enter your core industry focus on the left to build a structured 7-day pipeline with recommended formula pairings.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
