"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Search,
  Trash2,
  Copy,
  CheckCircle2,
  Plus,
  ArrowRight,
  Send,
  MoreVertical,
  Link as LinkIcon,
} from "lucide-react";
import { PostDraft } from "@/lib/types";
import { getStoredDrafts, deleteDraft } from "@/lib/storage";
import { ApprovalPublishModal } from "@/components/ApprovalPublishModal";

export default function DraftsPage() {
  const [drafts, setDrafts] = useState<PostDraft[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<string>("all");
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
    if (filter !== "all" && d.status !== filter) return false;
    if (
      searchQuery.trim() &&
      !d.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !d.content.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-medium text-[#175CD3] bg-[#EFF8FF] border border-[#D1E9FF] px-2.5 py-0.5 rounded-full uppercase">
              WORKSPACE // DRAFTS ARCHIVE
            </span>
            <span className="text-xs font-mono text-[#667085]">
              {drafts.length} total entries
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#101828]">
            Editorial Archive
          </h1>
          <p className="text-xs text-[#475467] mt-0.5">
            Search, manage, and refine your active pipeline, reviewed posts, and scheduled dispatches.
          </p>
        </div>

        <Link
          href="/create"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#004EEB] hover:bg-[#0040C1] rounded-lg shadow-sm transition-colors self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Post</span>
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-xl bg-white border border-[#EAECF0] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#667085] absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search drafts by title, hook, or body text..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-[#FAFBFD] border border-[#EAECF0] text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:border-[#004EEB] focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {["all", "draft", "in_review", "ready", "published"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition-colors ${
                filter === tab
                  ? "bg-[#EFF8FF] text-[#175CD3]"
                  : "text-[#667085] hover:text-[#101828] hover:bg-[#F2F4F7]"
              }`}
            >
              {tab.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Editorial Archive List */}
      <div className="space-y-3">
        {filteredDrafts.length === 0 ? (
          <div className="p-12 text-center rounded-xl bg-white border border-[#EAECF0] shadow-xs space-y-3">
            <FileText className="w-8 h-8 text-[#98A2B3] mx-auto" />
            <h3 className="text-sm font-bold text-[#101828]">
              No matching drafts found
            </h3>
            <p className="text-xs text-[#667085] max-w-sm mx-auto">
              Drafts generated in the Post Writer or Humanizer will automatically appear in this archive.
            </p>
          </div>
        ) : (
          filteredDrafts.map((draft) => (
            <div
              key={draft.id}
              className="p-5 rounded-xl bg-white border border-[#EAECF0] hover:border-[#D0D5DD] shadow-xs transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      draft.status === "published"
                        ? "bg-[#ECFDF3] text-[#027A48] border border-[#A6F4C5]"
                        : draft.status === "in_review"
                        ? "bg-[#FEF0C7] text-[#B54708] border border-[#FEDF89]"
                        : draft.status === "ready"
                        ? "bg-[#ECFDF3] text-[#027A48] border border-[#A6F4C5]"
                        : "bg-[#F2F4F7] text-[#344054] border border-[#EAECF0]"
                    }`}
                  >
                    {draft.status?.replace("_", " ") || "DRAFT"}
                  </span>
                  {draft.formulaCode && (
                    <span className="text-[11px] font-mono text-[#175CD3] bg-[#EFF8FF] px-2 py-0.5 rounded">
                      [{draft.formulaCode}]
                    </span>
                  )}
                  <span className="text-xs text-[#667085]">
                    Updated {new Date(draft.updatedAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(draft)}
                    className="p-1.5 text-[#667085] hover:text-[#101828] hover:bg-[#F2F4F7] rounded-lg transition-colors"
                    title="Copy text"
                  >
                    {copiedId === draft.id ? (
                      <CheckCircle2 className="w-4 h-4 text-[#027A48]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    onClick={() => handleDelete(draft.id)}
                    className="p-1.5 text-[#667085] hover:text-[#B42318] hover:bg-[#FEF3F2] rounded-lg transition-colors"
                    title="Delete draft"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <Link
                    href={`/create?draftId=${draft.id}`}
                    className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-[#004EEB] hover:bg-[#EFF8FF] rounded-lg transition-colors"
                  >
                    <span>Open in Writer</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              <Link href={`/create?draftId=${draft.id}`}>
                <h2 className="text-sm font-bold text-[#101828] group-hover:text-[#004EEB] transition-colors">
                  {draft.title}
                </h2>
                <p className="text-xs text-[#475467] line-clamp-2 mt-1 leading-relaxed">
                  {draft.content}
                </p>
              </Link>

              <div className="flex items-center gap-4 pt-2 border-t border-[#F2F4F7] text-[11px] font-mono text-[#667085]">
                <span>≡ {draft.charCount || draft.content.length} characters</span>
                <span>⏱ {Math.max(1, Math.round((draft.charCount || 1000) / 600))} min read</span>
                {draft.topic && (
                  <span className="truncate max-w-xs font-sans text-[#475467]">
                    Topic: {draft.topic}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <ApprovalPublishModal
        isOpen={Boolean(publishingDraft)}
        onClose={() => setPublishingDraft(null)}
        draftText={publishingDraft?.content || ""}
      />
    </div>
  );
}
