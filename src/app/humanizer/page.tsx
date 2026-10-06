"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Wand2,
  Copy,
  CheckCircle2,
  ArrowRight,
  Bookmark,
  SquarePen,
  ShieldCheck,
  RefreshCw,
  FileText,
  AlertCircle,
} from "lucide-react";
import { humanizeLinkedInText } from "@/lib/humanizer";
import { saveDraft } from "@/lib/storage";

export default function HumanizerPage() {
  const [inputText, setInputText] = useState("");
  const [cleanedText, setCleanedText] = useState("");
  const [removedTerms, setRemovedTerms] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savedStatus, setSavedStatus] = useState<string | null>(null);

  const handleHumanize = () => {
    if (!inputText.trim()) return;
    setIsProcessing(true);
    try {
      const res = humanizeLinkedInText(inputText);
      setCleanedText(res.humanized);
      setRemovedTerms(res.tellsDetected.map((t) => t.trigger));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    if (!cleanedText) return;
    navigator.clipboard.writeText(cleanedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToDrafts = () => {
    if (!cleanedText) return;
    const newDraftId = `humanized-${Date.now()}`;
    saveDraft({
      id: newDraftId,
      title: "Humanized Draft",
      topic: "Scrubbed AI Content",
      content: cleanedText,
      goal: "comments",
      tone: "direct",
      targetAudience: "LinkedIn network",
      charCount: cleanedText.length,
      status: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setSavedStatus("Saved to drafts archive");
    setTimeout(() => setSavedStatus(null), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-medium text-[#B54708] bg-[#FEF0C7] border border-[#FEDF89] px-2.5 py-0.5 rounded-full uppercase">
              TOOLS // HUMANIZER V3
            </span>
            <span className="text-xs font-mono text-[#667085]">4-PASS PIPELINE</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#101828]">
            Humanizer Studio
          </h1>
          <p className="text-xs text-[#475467] mt-0.5">
            Strip ChatGPT cadence, buzzword bloat, and corporate rhythm to sound like an authentic high-signal practitioner.
          </p>
        </div>

        {savedStatus && (
          <span className="text-xs font-medium text-[#027A48] bg-[#ECFDF3] border border-[#A6F4C5] px-3 py-1 rounded-lg">
            {savedStatus}
          </span>
        )}
      </div>

      {/* Stitch Split View: Original vs Improved */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Original Content */}
        <div className="p-5 rounded-xl bg-white border border-[#EAECF0] shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#EAECF0]">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#667085]" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#101828]">
                  Original Content
                </h2>
              </div>
              <span className="text-[11px] font-mono text-[#667085]">
                {inputText.length} characters
              </span>
            </div>

            <textarea
              rows={14}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste raw AI-generated text or corporate copy here..."
              className="w-full mt-3 p-3.5 text-xs font-mono leading-relaxed rounded-lg bg-[#FAFBFD] border border-[#EAECF0] text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:border-[#004EEB] focus:bg-white resize-y min-h-[320px]"
            />
          </div>

          <button
            onClick={handleHumanize}
            disabled={isProcessing || !inputText.trim()}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-[#004EEB] hover:bg-[#0040C1] rounded-lg shadow-sm transition-colors disabled:opacity-40"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Running 4-Pass Scrub...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-3.5 h-3.5" />
                <span>Humanize Content</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Improved Content */}
        <div className="p-5 rounded-xl bg-white border border-[#EAECF0] shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#EAECF0]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#12B76A]" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#101828]">
                  Improved Content
                </h2>
                {cleanedText && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ECFDF3] text-[#027A48] border border-[#A6F4C5]">
                    READS HUMAN
                  </span>
                )}
              </div>

              {cleanedText && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveToDrafts}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-[#344054] hover:bg-[#F2F4F7] bg-white border border-[#D0D5DD] rounded-lg transition-colors"
                  >
                    <Bookmark className="w-3 h-3 text-[#667085]" />
                    <span>Save</span>
                  </button>

                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-[#344054] hover:bg-[#F2F4F7] bg-white border border-[#D0D5DD] rounded-lg transition-colors"
                  >
                    {copied ? (
                      <CheckCircle2 className="w-3 h-3 text-[#027A48]" />
                    ) : (
                      <Copy className="w-3 h-3 text-[#667085]" />
                    )}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                </div>
              )}
            </div>

            <textarea
              rows={14}
              readOnly
              value={cleanedText}
              placeholder="Your humanized, de-clichéd post will appear here ready to copy..."
              className="w-full mt-3 p-3.5 text-xs font-sans leading-relaxed rounded-lg bg-[#FAFBFD] border border-[#EAECF0] text-[#101828] placeholder-[#98A2B3] focus:outline-none resize-y min-h-[320px]"
            />
          </div>

          {cleanedText && (
            <Link
              href={`/create?draftId=${encodeURIComponent(cleanedText.slice(0, 30))}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-[#344054] hover:bg-[#F9FAFB] bg-white border border-[#D0D5DD] rounded-lg shadow-xs transition-colors"
            >
              <SquarePen className="w-3.5 h-3.5 text-[#004EEB]" />
              <span>Load Into Post Writer</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>

      {/* What Changed / Heuristic Report Card */}
      {cleanedText && (
        <div className="p-5 rounded-xl bg-white border border-[#EAECF0] shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#EAECF0]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#101828]">
              What Changed In This Scrub
            </h3>
            <span className="text-[11px] font-mono text-[#027A48] font-semibold">
              {removedTerms.length} AI markers sanitized
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
            <div className="p-3 rounded-lg bg-[#FAFBFD] border border-[#EAECF0]">
              <div className="text-[11px] font-bold text-[#101828]">Pass 1: Vocabulary</div>
              <div className="text-[11px] text-[#475467] mt-1">
                Stripped &quot;delve&quot;, &quot;tapestry&quot;, &quot;game changer&quot;, &quot;testament to&quot;, &quot;harness&quot;.
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#FAFBFD] border border-[#EAECF0]">
              <div className="text-[11px] font-bold text-[#101828]">Pass 2: Reveal Bridges</div>
              <div className="text-[11px] text-[#475467] mt-1">
                Removed &quot;Here&apos;s the thing:&quot;, &quot;Let that sink in&quot;, and &quot;Read that again&quot;.
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#FAFBFD] border border-[#EAECF0]">
              <div className="text-[11px] font-bold text-[#101828]">Pass 3: Negative Parallelism</div>
              <div className="text-[11px] text-[#475467] mt-1">
                Converted rhetorical &quot;It&apos;s not X, it&apos;s Y&quot; loops into direct positive assertions.
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#FAFBFD] border border-[#EAECF0]">
              <div className="text-[11px] font-bold text-[#101828]">Pass 4: Cadence &amp; Fold</div>
              <div className="text-[11px] text-[#475467] mt-1">
                Enforced natural line breaks and preserved mobile fold cutoff dynamics.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
