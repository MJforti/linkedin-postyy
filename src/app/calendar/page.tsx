"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Plus,
  ArrowRight,
  Send,
  CheckCircle2,
  AlertCircle,
  FileText,
} from "lucide-react";
import { PostDraft } from "@/lib/types";
import { getStoredDrafts } from "@/lib/storage";

const OPTIMAL_WINDOWS = [
  { day: "Tuesday", time: "8:00 AM local", desc: "US B2B founders / operators peak window" },
  { day: "Wednesday", time: "9:30 AM local", desc: "Mid-week engagement sweet spot" },
  { day: "Thursday", time: "8:00 AM local", desc: "Enterprise decision-makers active" },
  { day: "Friday", time: "9:00 AM local", desc: "Narrative reflection & culture takes" },
  { day: "Saturday & Sunday", time: "Cooldown", desc: "30-50% reach penalty; rest active distribution" },
];

export default function CalendarPage() {
  const [drafts, setDrafts] = useState<PostDraft[]>([]);

  useEffect(() => {
    setDrafts(getStoredDrafts());
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#0A66C2]" />
            <h1 className="text-xl font-bold text-white tracking-tight">Content Publishing Calendar</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Track your pipeline across verified morning momentum windows (Tuesday to Friday).
          </p>
        </div>

        <Link
          href="/create"
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-[#0A66C2] hover:bg-[#084e96] rounded-md shadow-sm transition-colors self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Schedule Post</span>
        </Link>
      </div>

      {/* Recommended 2026 Windows Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {OPTIMAL_WINDOWS.map((win, idx) => (
          <div
            key={idx}
            className={`p-3.5 rounded-xl border ${
              win.time === "Cooldown"
                ? "border-slate-800 bg-[#0f1523]/50 opacity-60"
                : "border-slate-800 bg-[#0f1523]"
            }`}
          >
            <div className="text-xs font-semibold text-white mb-1">{win.day}</div>
            <div className="text-xs font-mono text-emerald-400 font-medium mb-1.5 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{win.time}</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">{win.desc}</p>
          </div>
        ))}
      </div>

      {/* Scheduled & Active Queue */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-white flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#0A66C2]" />
          <span>Active Pipeline & Local Drafts</span>
        </h2>

        {drafts.length === 0 ? (
          <div className="p-12 text-center rounded-xl border border-dashed border-slate-800 bg-[#0f1523]/40 text-slate-500">
            No items in queue. Schedule a draft to populate the calendar.
          </div>
        ) : (
          <div className="space-y-3">
            {drafts.map((d) => (
              <div
                key={d.id}
                className="p-4 rounded-xl border border-slate-800 bg-[#0f1523] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-white">{d.title}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded capitalize ${
                      d.status === "published"
                        ? "bg-emerald-950/60 text-emerald-300 border border-emerald-800"
                        : d.status === "scheduled"
                        ? "bg-blue-950/60 text-blue-300 border border-blue-800"
                        : "bg-slate-800 text-slate-400"
                    }`}>
                      {d.status === "published" ? "Published" : d.status === "scheduled" ? "Scheduled" : "Local Draft"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1 max-w-xl">
                    {d.content}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="text-slate-400 font-mono text-[11px]">{d.charCount} chars</span>
                  <Link
                    href={`/create?draftId=${d.id}`}
                    className="text-xs font-medium text-[#0A66C2] hover:underline flex items-center gap-1"
                  >
                    <span>Edit</span>
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
