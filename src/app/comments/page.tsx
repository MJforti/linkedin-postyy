"use client";

import { useState } from "react";
import {
  MessageSquare,
  Copy,
  CheckCircle2,
  Send,
  Sparkles,
  Share2,
  ExternalLink,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { CommentDraft, ReactionType } from "@/lib/types";
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
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-emerald-400" />
          <h1 className="text-xl font-bold text-white tracking-tight">LinkedIn Comment & Reply Drafter</h1>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Generate conversation-sparking comments (200–350 chars) and reshare commentary that authors actually reply to.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* INPUTS (5 cols) */}
        <div className="lg:col-span-5 p-5 rounded-xl border border-slate-800 bg-[#0f1523] space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              LinkedIn Post URL (Optional)
            </label>
            <input
              type="text"
              value={postUrl}
              onChange={(e) => setPostUrl(e.target.value)}
              placeholder="https://www.linkedin.com/posts/..."
              className="w-full px-3 py-1.5 text-xs rounded-md bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[#0A66C2]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Post Snippet or Context <span className="text-rose-400">*</span>
            </label>
            <textarea
              rows={5}
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="Paste the target post's text here (especially the ending question or claim)..."
              className="w-full p-2.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[#0A66C2] leading-relaxed resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Your Perspective / Operating Angle (Optional)
            </label>
            <textarea
              rows={2}
              value={userPerspective}
              onChange={(e) => setUserPerspective(e.target.value)}
              placeholder="e.g. In our workflow we cut meeting syncs by 40% with automated changelogs..."
              className="w-full p-2.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[#0A66C2] leading-relaxed resize-none"
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-900/60 text-xs text-rose-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <button
            onClick={handleDraft}
            disabled={isLoading || (!postUrl.trim() && !postText.trim())}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-500 rounded-md shadow-sm transition-colors disabled:opacity-40"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Drafting Context-Aware Comments...</span>
              </>
            ) : (
              <>
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Generate Comment Variants</span>
              </>
            )}
          </button>
        </div>

        {/* OUTPUTS (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {comments.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">Generated Comment Variants</span>
                <span className="text-[11px] text-slate-400">Target 200–350 chars</span>
              </div>

              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-4 rounded-xl border border-slate-800 bg-[#0f1523] space-y-3 hover:border-slate-700/80 transition-all"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">Variant #{comment.variant}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60">
                        {comment.templateName}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0A66C2]/20 text-[#0A66C2]">
                      Reaction: {comment.reaction}
                    </span>
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed font-sans whitespace-pre-wrap p-3 rounded-lg bg-slate-950 border border-slate-800/80">
                    {comment.content}
                  </p>

                  <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                    <span className="italic">{comment.whyThisFits}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono">{comment.charCount} chars</span>
                      <button
                        onClick={() => handleCopy(comment.id, comment.content)}
                        className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                        title="Copy comment"
                      >
                        {copiedId === comment.id ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <button
                        onClick={() => setActivePublishText(comment.content)}
                        className="px-2.5 py-1 text-xs font-medium text-white bg-[#0A66C2] hover:bg-[#084e96] rounded transition-colors flex items-center gap-1"
                      >
                        <Send className="w-3 h-3" />
                        <span>Publish</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Reshare commentary section */}
              {reshareCommentary && (
                <div className="p-4 rounded-xl border border-slate-800 bg-[#0f1523] space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Share2 className="w-3.5 h-3.5 text-[#0A66C2]" />
                      <span>Reshare / Repost Commentary</span>
                    </span>
                    <button
                      onClick={() => handleCopy("reshare", reshareCommentary)}
                      className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                    >
                      {copiedId === "reshare" ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 font-mono p-2.5 rounded bg-slate-950 border border-slate-800 leading-relaxed">
                    {reshareCommentary}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-16 text-center rounded-xl border border-dashed border-slate-800 bg-[#0f1523]/40 text-slate-500 space-y-2">
              <MessageSquare className="w-6 h-6 text-slate-600 mx-auto" />
              <p className="text-xs">
                Enter the LinkedIn post text or URL on the left to draft high-engagement comments.
              </p>
            </div>
          )}
        </div>
      </div>

      {activePublishText && (
        <ApprovalPublishModal
          isOpen={Boolean(activePublishText)}
          onClose={() => setActivePublishText(null)}
          draftText={activePublishText}
        />
      )}
    </div>
  );
}
