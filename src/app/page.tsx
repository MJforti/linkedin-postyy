"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  CheckCircle2,
  Bell,
  ArrowRight,
  SquarePen,
  TrendingUp,
  Wand2,
  MessageSquare,
  Compass,
  FileText,
  Link as LinkIcon,
  MoreVertical,
  Zap,
  Bookmark,
  User,
  Sliders,
  Plus,
} from "lucide-react";
import { PostDraft } from "@/lib/types";
import { getStoredDrafts, saveDraft } from "@/lib/storage";

const DEFAULT_SAMPLE_DRAFTS: PostDraft[] = [
  {
    id: "draft-1",
    title: "The Counterintuitive Playbook for Scaling B2B SaaS...",
    topic: "Scaling B2B SaaS without bloated sales teams",
    content: "Most founders double down on enterprise sales pipelines prematurely. Here is why product-led expansion loops and asynchronous sales engineering won the game in 2026...",
    status: "in_review",
    formulaCode: "F17",
    charCount: 1280,
    goal: "comments",
    tone: "contrarian",
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
  },
  {
    id: "draft-2",
    title: "Why most LinkedIn hooks fail in the first 3 lines (and how to fix them)...",
    topic: "Hook structure and feed cutoff dynamics",
    content: "Attention on the feed isn't captured by novelty; it's captured by contextual resonance and high-stakes problem orientation. Let's break down the friction points before the see more fold...",
    status: "draft",
    formulaCode: "F04",
    charCount: 840,
    goal: "reach",
    tone: "direct",
    createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
  },
  {
    id: "draft-3",
    title: "Reflections on our Q2 pivot: What broke, what held...",
    topic: "Lessons from shutting down legacy service line",
    content: "When we shut down our legacy service line, three enterprise clients paused contracts immediately. Here is the operational audit we conducted to recover within 45 days...",
    status: "ready",
    formulaCode: "F01",
    charCount: 1420,
    goal: "leads",
    tone: "storytelling",
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
  },
];

export default function DashboardPage() {
  const [drafts, setDrafts] = useState<PostDraft[]>([]);

  useEffect(() => {
    const existing = getStoredDrafts();
    if (existing.length === 0) {
      // Seed initial high-quality drafts if empty to match executive suite
      DEFAULT_SAMPLE_DRAFTS.forEach((d) => saveDraft(d));
      setDrafts(DEFAULT_SAMPLE_DRAFTS);
    } else {
      setDrafts(existing);
    }
  }, []);

  const pendingDraftsCount = drafts.filter((d) => d.status !== "published").length;
  const publishedCount = drafts.filter((d) => d.status === "published").length || 18;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Page Header: Good morning, Elena */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EFF8FF] text-[#175CD3] border border-[#D1E9FF]">
              EXECUTIVE SUITE
            </span>
            <span className="text-xs font-mono text-[#667085]">
              Sync ID: 489-PLN
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#101828]">
            Good morning, Elena
          </h1>
          <p className="text-sm text-[#475467] mt-1">
            Turn your ideas into LinkedIn content that sounds like you.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            href="/calendar"
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#344054] bg-white hover:bg-[#F9FAFB] border border-[#D0D5DD] rounded-lg shadow-xs transition-colors"
          >
            <Calendar className="w-4 h-4 text-[#667085]" />
            <span>View Schedule</span>
          </Link>

          <Link
            href="/create"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#004EEB] hover:bg-[#0040C1] rounded-lg shadow-sm transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <Plus className="w-3.5 h-3.5 -ml-2" />
            <span>Create Post</span>
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Drafts in Progress */}
        <div className="p-5 rounded-xl bg-white border border-[#EAECF0] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-semibold tracking-wider text-[#475467] uppercase">
                DRAFTS IN PROGRESS
              </span>
              <div className="w-6 h-6 rounded-md bg-[#F2F4F7] flex items-center justify-center text-[#667085]">
                <FileText className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#101828] tabular-nums">
                {pendingDraftsCount}
              </span>
              <span className="text-xs text-[#667085]">active files</span>
            </div>
          </div>
          <div className="w-full h-1 bg-[#EAECF0] rounded-full overflow-hidden mt-4 flex">
            <div className="bg-[#004EEB] h-full w-[40%] rounded-full" />
          </div>
        </div>

        {/* Card 2: Scheduled Queue */}
        <div className="p-5 rounded-xl bg-white border border-[#EAECF0] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-semibold tracking-wider text-[#475467] uppercase">
                SCHEDULED QUEUE
              </span>
              <div className="w-6 h-6 rounded-md bg-[#EFF8FF] flex items-center justify-center text-[#175CD3]">
                <Clock className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#101828] tabular-nums">6</span>
              <span className="text-xs text-[#667085]">for this week</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#12B76A]" />
            <span className="text-xs text-[#475467] font-medium">Next cadence confirmed</span>
          </div>
        </div>

        {/* Card 3: Published this month */}
        <div className="p-5 rounded-xl bg-white border border-[#EAECF0] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-semibold tracking-wider text-[#475467] uppercase">
                PUBLISHED THIS MONTH
              </span>
              <div className="w-6 h-6 rounded-md bg-[#ECFDF3] flex items-center justify-center text-[#027A48]">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-[#101828] tabular-nums">
                {publishedCount}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#ECFDF3] text-[#027A48]">
                ↗ +22% MoM
              </span>
            </div>
          </div>
          <div className="w-full h-1 bg-[#EAECF0] rounded-full overflow-hidden mt-4">
            <div className="bg-[#12B76A] h-full w-[75%] rounded-full" />
          </div>
        </div>

        {/* Card 4: Upcoming Slot */}
        <div className="p-5 rounded-xl bg-white border border-[#EAECF0] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold tracking-wider text-[#475467] uppercase">
                UPCOMING SLOT
              </span>
              <div className="w-6 h-6 rounded-md bg-[#FEF0C7] flex items-center justify-center text-[#B54708]">
                <Bell className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-base font-bold text-[#101828]">
              Today, 2:15 PM
            </div>
            <div className="text-xs text-[#667085] mt-0.5">
              EST (Peak Exec Attention)
            </div>
          </div>
          <Link
            href="/calendar"
            className="text-xs font-semibold text-[#175CD3] hover:underline flex items-center gap-1 mt-3"
          >
            <span>READY FOR DISPATCH</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Quick Actions Row */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-[#101828]">Quick Actions</h2>
          <span className="text-[11px] font-mono tracking-wider text-[#667085] uppercase">
            STREAMLINED TOOLS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {/* Action 1: Create Post */}
          <Link
            href="/create"
            className="p-4 rounded-xl bg-white border border-[#EAECF0] hover:border-[#D0D5DD] hover:shadow-xs transition-all group flex flex-col justify-between h-[130px]"
          >
            <div className="w-8 h-8 rounded-lg bg-[#EFF8FF] text-[#175CD3] flex items-center justify-center">
              <SquarePen className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#101828] group-hover:text-[#004EEB] transition-colors">
                Create Post
              </div>
              <div className="text-[11px] text-[#667085] mt-0.5 leading-snug line-clamp-2">
                Start with blank canvas or guided prompts
              </div>
            </div>
          </Link>

          {/* Action 2: Analyze Post */}
          <Link
            href="/analyzer"
            className="p-4 rounded-xl bg-white border border-[#EAECF0] hover:border-[#D0D5DD] hover:shadow-xs transition-all group flex flex-col justify-between h-[130px]"
          >
            <div className="w-8 h-8 rounded-lg bg-[#F9F5FF] text-[#7F56D9] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#101828] group-hover:text-[#7F56D9] transition-colors">
                Analyze Post
              </div>
              <div className="text-[11px] text-[#667085] mt-0.5 leading-snug line-clamp-2">
                Audit hook, structure, and clarity
              </div>
            </div>
          </Link>

          {/* Action 3: Humanize */}
          <Link
            href="/humanizer"
            className="p-4 rounded-xl bg-white border border-[#EAECF0] hover:border-[#D0D5DD] hover:shadow-xs transition-all group flex flex-col justify-between h-[130px]"
          >
            <div className="w-8 h-8 rounded-lg bg-[#FEF0C7]/60 text-[#B54708] flex items-center justify-center">
              <Wand2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#101828] group-hover:text-[#B54708] transition-colors">
                Humanize
              </div>
              <div className="text-[11px] text-[#667085] mt-0.5 leading-snug line-clamp-2">
                Strip AI cadence and polish voice
              </div>
            </div>
          </Link>

          {/* Action 4: Write Comment */}
          <Link
            href="/comments"
            className="p-4 rounded-xl bg-white border border-[#EAECF0] hover:border-[#D0D5DD] hover:shadow-xs transition-all group flex flex-col justify-between h-[130px]"
          >
            <div className="w-8 h-8 rounded-lg bg-[#F2F4F7] text-[#344054] flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#101828] group-hover:text-[#344054] transition-colors">
                Write Comment
              </div>
              <div className="text-[11px] text-[#667085] mt-0.5 leading-snug line-clamp-2">
                Craft high-signal network responses
              </div>
            </div>
          </Link>

          {/* Action 5: Plan Content */}
          <Link
            href="/strategy"
            className="p-4 rounded-xl bg-white border border-[#EAECF0] hover:border-[#D0D5DD] hover:shadow-xs transition-all group flex flex-col justify-between h-[130px]"
          >
            <div className="w-8 h-8 rounded-lg bg-[#EFF8FF] text-[#026AA2] flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#101828] group-hover:text-[#026AA2] transition-colors">
                Plan Content
              </div>
              <div className="text-[11px] text-[#667085] mt-0.5 leading-snug line-clamp-2">
                Outline weekly pillars and hooks
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Two-Column Lower Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Continue Working (7 cols) */}
        <div className="lg:col-span-7 space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-[#101828]">Continue Working</h2>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#EAECF0] text-[#344054]">
                {drafts.length} pending
              </span>
            </div>
            <Link
              href="/drafts"
              className="text-xs font-semibold text-[#175CD3] hover:underline flex items-center gap-1"
            >
              <span>Open all drafts</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {drafts.slice(0, 3).map((draft, idx) => {
              const statusBadge =
                draft.status === "in_review" ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FEF0C7] text-[#B54708] border border-[#FEDF89] uppercase">
                    IN REVIEW
                  </span>
                ) : draft.status === "ready" ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ECFDF3] text-[#027A48] border border-[#A6F4C5] uppercase">
                    READY
                  </span>
                ) : (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F2F4F7] text-[#344054] border border-[#EAECF0] uppercase">
                    DRAFT
                  </span>
                );

              return (
                <div
                  key={draft.id || idx}
                  className="p-4 rounded-xl bg-white border border-[#EAECF0] hover:border-[#D0D5DD] transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {statusBadge}
                      <span className="text-xs text-[#667085]">
                        • Edited {idx === 0 ? "2 hours ago" : idx === 1 ? "5 hours ago" : "Yesterday"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[#98A2B3]">
                      <button aria-label="Copy link" className="p-1 hover:text-[#101828]">
                        <LinkIcon className="w-3.5 h-3.5" />
                      </button>
                      <button aria-label="Draft options" className="p-1 hover:text-[#101828]">
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <Link href={`/create?draftId=${draft.id}`}>
                    <h3 className="text-sm font-bold text-[#101828] group-hover:text-[#004EEB] transition-colors line-clamp-1">
                      {draft.title}
                    </h3>
                    <p className="text-xs text-[#475467] line-clamp-2 mt-1 leading-relaxed">
                      {draft.content}
                    </p>
                  </Link>

                  <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#F2F4F7] text-[11px] text-[#667085] font-mono">
                    <span className="flex items-center gap-1">
                      <span>≡</span>
                      <span>{draft.charCount || draft.content.length} characters</span>
                    </span>
                    {idx === 1 ? (
                      <span className="flex items-center gap-1 text-[#027A48] font-medium font-sans">
                        <Zap className="w-3 h-3 text-[#12B76A]" />
                        <span>Strong hook detected</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 font-sans">
                        <span>⏱</span>
                        <span>{Math.max(1, Math.round((draft.charCount || 1000) / 600))} min read</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Recent Activity & Voice (5 cols) */}
        <div className="lg:col-span-5 space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-[#101828]">Recent Activity</h2>
              <span className="w-2 h-2 rounded-full bg-[#12B76A]" />
            </div>
            <span className="text-[11px] font-mono tracking-wider text-[#667085] uppercase">
              AUDIT LOG
            </span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#EAECF0] shadow-xs space-y-3.5">
            {/* Activity 1 */}
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[#EFF8FF] text-[#175CD3] flex items-center justify-center shrink-0 mt-0.5">
                <SquarePen className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-[#101828] truncate">
                  Post draft &quot;Scaling B2B SaaS&quot; updated
                </div>
                <div className="text-[11px] text-[#667085] mt-0.5">
                  2 hours ago • Editor autosave
                </div>
              </div>
            </div>

            {/* Activity 2 */}
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[#F2F4F7] text-[#344054] flex items-center justify-center shrink-0 mt-0.5">
                <Bookmark className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-[#101828] truncate">
                  Content idea saved to &quot;Growth &amp; Hiring&quot; pillar
                </div>
                <div className="text-[11px] text-[#667085] mt-0.5">
                  Yesterday, 4:30 PM • Voice Notes sync
                </div>
              </div>
            </div>

            {/* Activity 3 */}
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[#FEF0C7] text-[#B54708] flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-[#101828] truncate">
                  Profile headline analysis completed
                </div>
                <div className="text-[11px] text-[#667085] mt-0.5">
                  Yesterday, 11:15 AM • Score: 94/100
                </div>
              </div>
            </div>

            {/* Activity 4 */}
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[#ECFDF3] text-[#027A48] flex items-center justify-center shrink-0 mt-0.5">
                <Calendar className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-[#101828] truncate">
                  Scheduled post &quot;The Engineering Hiring Trap&quot; queued
                </div>
                <div className="text-[11px] text-[#667085] mt-0.5">
                  2 days ago • Slot: Friday, 8:45 AM
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Card: Executive Voice Tone */}
          <div className="p-4 rounded-xl bg-white border border-[#EAECF0] shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#EFF8FF] text-[#175CD3] flex items-center justify-center shrink-0">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#101828]">
                  Executive Voice Tone
                </div>
                <div className="text-[11px] text-[#667085]">
                  Authoritative, candid, data-grounded
                </div>
              </div>
            </div>

            <Link
              href="/settings/voice"
              className="px-3 py-1 text-xs font-semibold text-[#344054] bg-white hover:bg-[#F9FAFB] border border-[#D0D5DD] rounded-lg shadow-xs transition-colors"
            >
              Calibrate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
