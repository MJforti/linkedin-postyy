"use client";

import { useState } from "react";
import { CheckCircle2, Copy, Send, Calendar, AlertCircle, X, ShieldCheck } from "lucide-react";

interface ApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  draftText: string;
  postUrl?: string;
  defaultKind?: "post" | "comment";
  onPublished?: (result: any) => void;
}

export function ApprovalPublishModal({
  isOpen,
  onClose,
  draftText,
  postUrl,
  defaultKind = "post",
  onPublished,
}: ApprovalModalProps) {
  const [scheduledTime, setScheduledTime] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const charCount = draftText.length;

  const handleCopy = () => {
    navigator.clipboard.writeText(draftText);
    setCopied(true);
    setStatusMessage({ type: "info", text: "Copied to clipboard! Ready to paste into LinkedIn." });
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
          kind: defaultKind,
          postUrl,
          scheduledTime: scheduledTime ? new Date(scheduledTime).toISOString() : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatusMessage({
          type: "error",
          text: data.error || "Publishing service unconfigured or unavailable. You can use manual copy & paste.",
        });
      } else {
        setStatusMessage({
          type: "success",
          text: data.message || "Content approved and published to LinkedIn!",
        });
        if (onPublished) onPublished(data);
      }
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err.message || "Network error. Please copy to clipboard manually.",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-xl border border-[#EAECF0] bg-white shadow-xl p-6 text-[#101828]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#EAECF0]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#EFF8FF] text-[#175CD3] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#101828]">Executive Approval Gate</h2>
              <div className="text-[11px] text-[#667085]">Explicit user confirmation required</div>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1 rounded-lg text-[#667085] hover:text-[#101828] hover:bg-[#F2F4F7]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="my-4 space-y-3">
          {/* Post Snippet Box */}
          <div className="p-3.5 rounded-lg bg-[#FAFBFD] border border-[#EAECF0] text-xs font-mono max-h-40 overflow-y-auto leading-relaxed text-[#101828] whitespace-pre-wrap">
            {draftText}
          </div>

          <div className="flex items-center justify-between text-xs text-[#667085] px-1">
            <span>Length: <strong className="text-[#101828]">{charCount}</strong> chars</span>
            <span>Target: <strong className="text-[#101828]">LinkedIn Profile</strong></span>
          </div>

          {/* Schedule Picker */}
          <div className="p-3 rounded-lg border border-[#EAECF0] bg-[#FAFBFD] space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-[#344054]">
              <Calendar className="w-3.5 h-3.5 text-[#175CD3]" />
              <span>Schedule Dispatch (Leave blank to dispatch immediately)</span>
            </label>
            <input
              type="datetime-local"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-lg bg-white border border-[#D0D5DD] text-[#101828] focus:outline-none focus:border-[#004EEB]"
            />
          </div>

          {/* Feedback message */}
          {statusMessage && (
            <div
              className={`p-3 rounded-lg text-xs flex items-start gap-2 ${
                statusMessage.type === "success"
                  ? "bg-[#ECFDF3] border border-[#A6F4C5] text-[#027A48]"
                  : statusMessage.type === "info"
                  ? "bg-[#EFF8FF] border border-[#D1E9FF] text-[#175CD3]"
                  : "bg-[#FEF3F2] border border-[#FECDCA] text-[#B42318]"
              }`}
            >
              {statusMessage.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-[#EAECF0]">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#344054] hover:bg-[#F2F4F7] bg-white border border-[#D0D5DD] rounded-lg transition-colors"
          >
            <Copy className="w-3.5 h-3.5 text-[#667085]" />
            <span>{copied ? "Copied!" : "Copy to Clipboard"}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-semibold text-[#667085] hover:text-[#101828] hover:bg-[#F2F4F7] rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-[#004EEB] hover:bg-[#0040C1] rounded-lg shadow-sm transition-colors disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isPublishing ? "Dispatching..." : "Approve & Publish"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
