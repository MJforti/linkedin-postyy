"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Plus,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FileText,
  Sliders,
} from "lucide-react";
import { PostDraft } from "@/lib/types";
import { getStoredDrafts } from "@/lib/storage";

const OPTIMAL_WINDOWS = [
  { day: "Monday", time: "11:30 AM", type: "Warmup Window", status: "Open" },
  { day: "Tuesday", time: "8:15 AM", type: "US B2B Peak Focus", status: "Scheduled" },
  { day: "Wednesday", time: "9:00 AM", type: "Mid-week Sweet Spot", status: "Open" },
  { day: "Thursday", time: "8:30 AM", type: "Executive Decision Window", status: "Draft Queued" },
  { day: "Friday", time: "8:45 AM", type: "Culture & Weekly Wrap", status: "Scheduled" },
  { day: "Weekend", time: "Cooldown", type: "Rest Feed Algorithm", status: "Rest" },
];

export default function CalendarPage() {
  const [drafts, setDrafts] = useState<PostDraft[]>([]);

  useEffect(() => {
    setDrafts(getStoredDrafts());
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-medium text-[#175CD3] bg-[#EFF8FF] border border-[#D1E9FF] px-2.5 py-0.5 rounded-full uppercase">
              WORKSPACE // CONTENT CALENDAR
            </span>
            <span className="text-xs font-mono text-[#667085]">
              WEEK 41 • 2026
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#101828]">
            Content Publishing Schedule
          </h1>
          <p className="text-xs text-[#475467] mt-0.5">
            Structured editorial queue mapped against high-dwell morning distribution windows.
          </p>
        </div>

        <Link
          href="/create"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#004EEB] hover:bg-[#0040C1] rounded-lg shadow-sm transition-colors self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Queue New Post</span>
        </Link>
      </div>

      {/* Week Grid (Mon-Weekend) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {OPTIMAL_WINDOWS.map((win, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl border bg-white flex flex-col justify-between h-[130px] ${
              win.status === "Rest"
                ? "border-[#EAECF0] opacity-60 bg-[#FAFBFD]"
                : "border-[#EAECF0] shadow-xs"
            }`}
          >
            <div>
              <div className="text-xs font-bold text-[#101828] mb-0.5">
                {win.day}
              </div>
              <div className="text-xs font-mono text-[#004EEB] font-semibold flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#667085]" />
                <span>{win.time}</span>
              </div>
              <div className="text-[11px] text-[#667085] mt-1 line-clamp-1">
                {win.type}
              </div>
            </div>

            <div className="pt-2 border-t border-[#F2F4F7]">
              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                  win.status === "Scheduled"
                    ? "bg-[#ECFDF3] text-[#027A48]"
                    : win.status === "Draft Queued"
                    ? "bg-[#FEF0C7] text-[#B54708]"
                    : win.status === "Rest"
                    ? "bg-[#F2F4F7] text-[#667085]"
                    : "bg-[#EFF8FF] text-[#175CD3]"
                }`}
              >
                {win.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Active Scheduled Posts & Draft Queue */}
      <div className="p-5 rounded-xl bg-white border border-[#EAECF0] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#EAECF0]">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#175CD3]" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#101828]">
              Active Queue &amp; Dispatch Pipeline
            </h2>
          </div>
          <span className="text-xs font-mono text-[#667085]">
            {drafts.length} items total
          </span>
        </div>

        {drafts.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#667085]">
            No posts currently queued. Use the Post Writer to craft and schedule content.
          </div>
        ) : (
          <div className="divide-y divide-[#F2F4F7]">
            {drafts.map((d) => (
              <div
                key={d.id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        d.status === "published"
                          ? "bg-[#ECFDF3] text-[#027A48]"
                          : d.status === "in_review"
                          ? "bg-[#FEF0C7] text-[#B54708]"
                          : "bg-[#F2F4F7] text-[#344054]"
                      }`}
                    >
                      {d.status?.replace("_", " ") || "DRAFT"}
                    </span>
                    <Link
                      href={`/create?draftId=${d.id}`}
                      className="text-xs font-bold text-[#101828] hover:text-[#004EEB] transition-colors"
                    >
                      {d.title}
                    </Link>
                  </div>
                  <p className="text-[11px] text-[#475467] line-clamp-1 max-w-2xl">
                    {d.content}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-[#667085] shrink-0">
                  <span>{d.charCount || d.content.length} chars</span>
                  <Link
                    href={`/create?draftId=${d.id}`}
                    className="text-xs font-semibold text-[#175CD3] hover:underline flex items-center gap-1"
                  >
                    <span>Open Editor</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
