"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  PenSquare,
  Search,
  Sparkles,
  MessageSquare,
  Calendar,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  FileText,
  Clock,
  Radio,
} from "lucide-react";
import { PostDraft } from "@/lib/types";
import { getStoredDrafts } from "@/lib/storage";

export default function DashboardPage() {
  const [drafts, setDrafts] = useState<PostDraft[]>([]);
  const [integrationStatus, setIntegrationStatus] = useState<any>(null);

  useEffect(() => {
    setDrafts(getStoredDrafts());

    fetch("/api/integrations/status")
      .then((r) => r.json())
      .then((data) => setIntegrationStatus(data))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-xl border border-slate-800 bg-[#0f1523]/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold tracking-tight text-white">Content Command Center</h1>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#0A66C2]/20 text-[#0A66C2] border border-[#0A66C2]/30">
              2026 FEED HEURISTICS
            </span>
          </div>
          <p className="text-sm text-slate-400">
            Create, audit, and schedule LinkedIn posts using verified engagement formulas.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/create"
            className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-[#0A66C2] hover:bg-[#084e96] rounded-md shadow-sm transition-colors"
          >
            <PenSquare className="w-3.5 h-3.5" />
            <span>Write New Post</span>
          </Link>
          <Link
            href="/humanizer"
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md border border-slate-700/60 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Humanize AI Text</span>
          </Link>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/create"
          className="group p-4 rounded-xl border border-slate-800/80 bg-[#0f1523] hover:border-slate-700 hover:bg-slate-800/30 transition-all"
        >
          <div className="w-8 h-8 rounded-lg bg-[#0A66C2]/15 flex items-center justify-center text-[#0A66C2] mb-3 group-hover:scale-105 transition-transform">
            <PenSquare className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-semibold text-white group-hover:text-[#0A66C2] transition-colors">Post Writer</h2>
          <p className="text-xs text-slate-400 mt-1">
            Draft long-form posts using 20 canonical 2026 formulas (F1–F20).
          </p>
        </Link>

        <Link
          href="/humanizer"
          className="group p-4 rounded-xl border border-slate-800/80 bg-[#0f1523] hover:border-slate-700 hover:bg-slate-800/30 transition-all"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors">Humanizer V3</h2>
          <p className="text-xs text-slate-400 mt-1">
            4-pass scrub for AI vocab density, reveal bridges, and staccato cadence.
          </p>
        </Link>

        <Link
          href="/comments"
          className="group p-4 rounded-xl border border-slate-800/80 bg-[#0f1523] hover:border-slate-700 hover:bg-slate-800/30 transition-all"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-105 transition-transform">
            <MessageSquare className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">Comment Drafter</h2>
          <p className="text-xs text-slate-400 mt-1">
            Generate high-depth replies tailored to trigger author responses.
          </p>
        </Link>

        <Link
          href="/analyzer"
          className="group p-4 rounded-xl border border-slate-800/80 bg-[#0f1523] hover:border-slate-700 hover:bg-slate-800/30 transition-all"
        >
          <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center text-purple-400 mb-3 group-hover:scale-105 transition-transform">
            <Search className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-semibold text-white group-hover:text-purple-400 transition-colors">Post Analyzer</h2>
          <p className="text-xs text-slate-400 mt-1">
            Forensic breakdown of hook cutoffs, reach penalties, and structure.
          </p>
        </Link>
      </div>

      {/* Grid: Recent Drafts & Algorithm Heuristics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Continue Working: Recent Drafts */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#0A66C2]" />
              <h2 className="text-sm font-semibold text-white">Recent Working Drafts</h2>
            </div>
            <Link href="/drafts" className="text-xs text-[#0A66C2] hover:underline flex items-center gap-1">
              <span>View all drafts</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {drafts.slice(0, 4).map((draft) => (
              <div
                key={draft.id}
                className="p-4 rounded-xl border border-slate-800 bg-[#0f1523] hover:border-slate-700 transition-colors flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-white truncate max-w-[280px] sm:max-w-md">
                      {draft.title}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {draft.formulaCode || "Custom"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {draft.content}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                  <div className="flex items-center gap-3">
                    <span>{draft.charCount} chars</span>
                    <span>Goal: <strong className="text-slate-300 capitalize">{draft.goal}</strong></span>
                  </div>
                  <Link
                    href={`/create?draftId=${draft.id}`}
                    className="text-xs font-medium text-[#0A66C2] hover:underline flex items-center gap-1"
                  >
                    <span>Edit Draft</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Algorithm Insights Card */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-semibold text-white">2026 Feed Multipliers</h2>
          </div>

          <div className="p-5 rounded-xl border border-slate-800 bg-[#0f1523] space-y-4 text-xs">
            <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-900/60">
              <div className="font-semibold text-emerald-300 mb-0.5">Line 1 Odd Numbers (+34%)</div>
              <p className="text-slate-300 text-[11px]">
                Specific figures ($873.40, 41.8%) in line 1 increase median likes by 34%.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-900/60">
              <div className="font-semibold text-rose-300 mb-0.5">Never Open With a Question (-34%)</div>
              <p className="text-slate-300 text-[11px]">
                Question openers suffer a 34% drop across all follower bands. Keep questions at the close (+3%).
              </p>
            </div>

            <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-900/60">
              <div className="font-semibold text-blue-300 mb-0.5">Length Sweet Spot (1.18x)</div>
              <p className="text-slate-300 text-[11px]">
                Posts with 1,000+ characters and 20+ short sentences earn a 1.18x reach boost over shallow takes.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0A66C2]" />
                <span>360Brew & AuthoredUp Validated</span>
              </span>
              <Link href="/hooks" className="text-[#0A66C2] hover:underline">
                Explore Formulas →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
