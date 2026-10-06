"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Trash2,
  Copy,
  CheckCircle2,
  ExternalLink,
  Plus,
  Send,
  Calendar,
} from "lucide-react";
import { PostDraft } from "@/lib/types";
import { getStoredDrafts, deleteDraft } from "@/lib/storage";
import { ApprovalPublishModal } from "@/components/ApprovalPublishModal";

export default function DraftsPage() {
  const [drafts, setDrafts] = useState<PostDraft[]>([]);
  const [filter, setFilter] = useState<"all" | "draft" | "scheduled" | "published">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [publishingDraft, setPublishingDraft] = useState<PostDraft | null>(null);

  useEffect(() => {
    setDrafts(getStoredDrafts());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Delete this draft permanently?")) {
      deleteDraft(id);
      setDrafts((prev) => prev.filter((d) => d.id !== id));
    }
  };

  const handleCopy = (draft: PostDraft) => {
    navigator.clipboard.writeText(draft.content);
    setCopiedId(draft.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredDrafts = drafts.filter((d) => {
    if (filter === "all") return true;
    return d.status === filter;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Content Drafts & Library</h1>
          <p className="text-xs text-slate-400">
            Manage your working drafts, scheduled content, and historical posts.
          </p>
        </div>

        <Link
          href="/create"
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-[#0A66C2] hover:bg-[#084e96] rounded-md shadow-sm transition-colors self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create New Post</span>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        {(["all", "draft", "scheduled", "published"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-colors ${
              filter === tab
                ? "bg-slate-800 text-white font-semibold"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            {tab} {tab === "all" ? `(${drafts.length})` : `(${drafts.filter((d) => d.status === tab).length})`}
          </button>
        ))}
      </div>

      {/* Drafts List */}
      {filteredDrafts.length === 0 ? (
        <div className="p-12 text-center rounded-xl border border-dashed border-slate-800 bg-[#0f1523]/50 space-y-3">
          <FileText className="w-8 h-8 text-slate-600 mx-auto" />
          <h2 className="text-sm font-semibold text-slate-300">No {filter} drafts found</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Start a fresh post using our 2026 hook formulas or port existing ideas into the editor.
          </p>
          <Link
            href="/create"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#0A66C2] rounded-md"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Draft</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredDrafts.map((draft) => (
            <div
              key={draft.id}
              className="p-5 rounded-xl border border-slate-800 bg-[#0f1523] hover:border-slate-700/80 transition-all flex flex-col sm:flex-row justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-white">{draft.title}</span>
                  {draft.formulaCode && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60">
                      {draft.formulaCode}
                    </span>
                  )}
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded capitalize ${
                    draft.status === "published"
                      ? "bg-emerald-950/60 text-emerald-300 border border-emerald-800"
                      : draft.status === "scheduled"
                      ? "bg-blue-950/60 text-blue-300 border border-blue-800"
                      : "bg-slate-800 text-slate-400"
                  }`}>
                    {draft.status}
                  </span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed font-sans whitespace-pre-wrap">
                  {draft.content}
                </p>

                <div className="flex items-center gap-4 text-[11px] text-slate-500 font-mono pt-1">
                  <span>{draft.charCount} characters</span>
                  <span>Goal: {draft.goal}</span>
                  <span>Updated: {new Date(draft.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopy(draft)}
                    title="Copy post content"
                    className="p-2 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    {copiedId === draft.id ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  <Link
                    href={`/create?draftId=${draft.id}`}
                    title="Edit in Writer"
                    className="p-2 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => handleDelete(draft.id)}
                    title="Delete draft"
                    className="p-2 rounded text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => setPublishingDraft(draft)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#0A66C2] hover:bg-[#084e96] rounded transition-colors"
                >
                  <Send className="w-3 h-3" />
                  <span>Publish Gate</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {publishingDraft && (
        <ApprovalPublishModal
          isOpen={Boolean(publishingDraft)}
          onClose={() => setPublishingDraft(null)}
          draftText={publishingDraft.content}
          onPublished={() => {
            setDrafts(getStoredDrafts());
            setPublishingDraft(null);
          }}
        />
      )}
    </div>
  );
}
