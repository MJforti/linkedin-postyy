"use client";

import { useState } from "react";
import {
  MessageSquare,
  Copy,
  CheckCircle2,
  RefreshCw,
  AlertCircle,
  Sparkles,
  Share2,
} from "lucide-react";
import { CommentDraft } from "@/lib/types";
import { ApprovalPublishModal } from "@/components/ApprovalPublishModal";

export default function CommentDrafterPage() {
  const [postUrl, setPostUrl] = useState("");
  const [postText, setPostText] = useState("");
  const [userPerspective, setUserPerspective] = useState("");
  const [comments, setComments] = useState<CommentDraft[]>([]);
  const [reshareCommentary, setReshareCommentary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activePublishText, setActivePublishText] = useState<string | null>(null);

  const handleDraft = async () => {
    if (!postUrl.trim() && !postText.trim()) return;
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/generate/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: postUrl || undefined,
          text: postText || undefined,
          perspective: userPerspective || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Failed to draft comments.");
      } else {
        setComments(data.comments || []);
        setReshareCommentary(data.reshareCommentary || "");
      }
    } catch (err: any) {
      setError(err.message || "Network error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-medium text-[#175CD3] bg-[#EFF8FF] border border-[#D1E9FF] px-2.5 py-0.5 rounded-full uppercase">
              TOOLS // COMMENT WRITER
            </span>
            <span className="text-xs font-mono text-[#667085]">HIGH-SIGNAL REPLIES</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#101828]">
            Comment &amp; Reply Drafter
          </h1>
          <p className="text-xs text-[#475467] mt-0.5">
            Generate insightful, conversation-sparking comments (200–350 chars) that get pinned and build executive network authority.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Input Card (5 cols) */}
        <div className="lg:col-span-5 p-5 rounded-xl bg-white border border-[#EAECF0] shadow-xs space-y-4">
          <div className="pb-3 border-b border-[#EAECF0]">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#101828]">
              Target Post Details
            </h2>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#344054]">
              LinkedIn Post URL (Optional)
            </label>
            <input
              type="text"
              value={postUrl}
              onChange={(e) => setPostUrl(e.target.value)}
              placeholder="https://www.linkedin.com/posts/..."
              className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-[#D0D5DD] text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:border-[#004EEB]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#344054]">
              Post Snippet or Topic <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={6}
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="Paste the post you want to reply to..."
              className="w-full p-3 text-xs font-sans leading-relaxed rounded-lg bg-[#FAFBFD] border border-[#EAECF0] text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:border-[#004EEB] focus:bg-white resize-y"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#344054]">
              Your Angle or Experience (Optional)
            </label>
            <input
              type="text"
              value={userPerspective}
              onChange={(e) => setUserPerspective(e.target.value)}
              placeholder="e.g. As an engineering VP who lived through this pivot..."
              className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-[#D0D5DD] text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:border-[#004EEB]"
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-[#FEF3F2] border border-[#FECDCA] text-xs text-[#B42318]">
              {error}
            </div>
          )}

          <button
            onClick={handleDraft}
            disabled={isLoading || (!postUrl.trim() && !postText.trim())}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-[#004EEB] hover:bg-[#0040C1] rounded-lg shadow-sm transition-colors disabled:opacity-40"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Crafting High-Signal Comments...</span>
              </>
            ) : (
              <>
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Draft 3 Comment Options</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Comment Options (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {comments.length > 0 ? (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-5 rounded-xl bg-white border border-[#EAECF0] shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-[#F2F4F7]">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#EFF8FF] text-[#175CD3] border border-[#D1E9FF] uppercase">
                      {comment.templateName || "Comment Angle"}
                    </span>
                    <span className="text-[11px] font-mono text-[#667085]">
                      {comment.charCount} chars
                    </span>
                  </div>

                  <p className="text-xs text-[#101828] leading-relaxed font-sans">
                    {comment.content}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-[#F2F4F7]">
                    <span className="text-[11px] text-[#475467]">
                      {comment.reaction === "LIKE" ? "👍 Like" : "💡 Insightful"} recommended
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(comment.id, comment.content)}
                        className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-[#344054] hover:bg-[#F2F4F7] bg-white border border-[#D0D5DD] rounded-lg transition-colors"
                      >
                        {copiedId === comment.id ? (
                          <CheckCircle2 className="w-3 h-3 text-[#027A48]" />
                        ) : (
                          <Copy className="w-3 h-3 text-[#667085]" />
                        )}
                        <span>{copiedId === comment.id ? "Copied" : "Copy"}</span>
                      </button>

                      <button
                        onClick={() => setActivePublishText(comment.content)}
                        className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-white bg-[#004EEB] hover:bg-[#0040C1] rounded-lg shadow-xs transition-colors"
                      >
                        <span>Publish</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {reshareCommentary && (
                <div className="p-5 rounded-xl bg-white border border-[#EAECF0] shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#F2F4F7]">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#ECFDF3] text-[#027A48] border border-[#A6F4C5] uppercase">
                      RESHARE COMMENTARY
                    </span>
                  </div>
                  <p className="text-xs text-[#101828] leading-relaxed">
                    {reshareCommentary}
                  </p>
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => handleCopy("reshare", reshareCommentary)}
                      className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-[#344054] hover:bg-[#F2F4F7] bg-white border border-[#D0D5DD] rounded-lg transition-colors"
                    >
                      <Copy className="w-3 h-3 text-[#667085]" />
                      <span>Copy Commentary</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 rounded-xl bg-white border border-[#EAECF0] shadow-xs text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#F2F4F7] text-[#667085] flex items-center justify-center mx-auto">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#101828]">
                Ready to Draft Replies
              </h3>
              <p className="text-xs text-[#667085] max-w-sm mx-auto leading-relaxed">
                Provide a post snippet on the left to generate 3 tailored comment strategies: contrarian observation, value-add operator experience, and provocative follow-up.
              </p>
            </div>
          )}
        </div>
      </div>

      <ApprovalPublishModal
        isOpen={Boolean(activePublishText)}
        onClose={() => setActivePublishText(null)}
        draftText={activePublishText || ""}
        postUrl={postUrl || undefined}
        defaultKind="comment"
      />
    </div>
  );
}
