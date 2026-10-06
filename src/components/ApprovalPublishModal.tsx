"use client";

import { useState } from "react";
import { CheckCircle2, Copy, Send, Calendar, AlertCircle, X, ShieldCheck } from "lucide-react";

interface ApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  draftText: string;
  onPublished?: (result: any) => void;
}

export function ApprovalPublishModal({ isOpen, onClose, draftText, onPublished }: ApprovalModalProps) {
  const [scheduledTime, setScheduledTime] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const charCount = draftText.length;

  const handleCopy = () => {
    navigator.clipboard.writeText(draftText);
    setCopied(true);
    setStatusMessage({ type: "info", text: "Draft text copied to clipboard. Ready for manual posting on LinkedIn." });
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/linkedin/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: draftText,
          approved: true,
          scheduledTime: scheduledTime ? new Date(scheduledTime).toISOString() : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatusMessage({
          type: "error",
          text: data.error || "Publishing service unavailable. You can use Manual Copy & Paste.",
        });
      } else {
        setStatusMessage({
          type: "success",
          text: data.message || "Post successfully published to LinkedIn!",
        });
        if (onPublished) onPublished(data);
      }
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err.message || "Network error. Please use manual copy & paste.",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-xl border border-slate-800 bg-[#0f1523] shadow-2xl p-6 text-slate-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#0A66C2]" />
            <h2 className="text-base font-semibold text-white">Approval Gate: Ready to Publish?</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="my-4 space-y-3">
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-mono max-h-40 overflow-y-auto leading-relaxed text-slate-300 whitespace-pre-wrap">
            {draftText}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Character count: <strong className="text-white">{charCount}</strong> / 3,000</span>
            <span>Target: <strong className="text-white">Personal Profile</strong></span>
          </div>

          <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/40 space-y-2">
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Optional Schedule Time (Leave empty to publish immediately)</span>
            </label>
            <input
              type="datetime-local"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-[#0A66C2]"
            />
          </div>

          {statusMessage && (
            <div
              className={`p-3 rounded-lg text-xs flex items-start gap-2 ${
                statusMessage.type === "success"
                  ? "bg-emerald-950/60 border border-emerald-800/80 text-emerald-200"
                  : statusMessage.type === "error"
                  ? "bg-rose-950/60 border border-rose-800/80 text-rose-200"
                  : "bg-blue-950/60 border border-blue-800/80 text-blue-200"
              }`}
            >
              {statusMessage.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-end gap-2.5 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 text-xs font-medium text-slate-400 hover:text-white rounded border border-slate-800 hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-medium text-slate-200 hover:text-white rounded border border-slate-700 bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied" : "Copy (Manual)"}</span>
          </button>

          <button
            type="button"
            onClick={handlePublish}
            disabled={isPublishing}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-[#0A66C2] hover:bg-[#084e96] rounded shadow-sm transition-colors disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isPublishing ? "Publishing..." : scheduledTime ? "Approve & Schedule" : "Approve & Publish"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
