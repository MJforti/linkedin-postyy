"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Copy,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  PenSquare,
} from "lucide-react";
import { humanizeLinkedInText } from "@/lib/humanizer";
import { HumanizerResult } from "@/lib/types";

export default function HumanizerPage() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<HumanizerResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleHumanize = () => {
    if (!inputText.trim()) return;
    const res = humanizeLinkedInText(inputText);
    setResult(res);
  };

  const handleCopy = () => {
    if (!result?.humanized) return;
    navigator.clipboard.writeText(result.humanized);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h1 className="text-xl font-bold text-white tracking-tight">LinkedIn Humanizer V3</h1>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          4-pass scrub for 2026 AI vocabulary density, reveal bridges, negative parallelism, and staccato cadence.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* LEFT: Input Area */}
        <div className="p-5 rounded-xl border border-slate-800 bg-[#0f1523] space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-slate-200">Original AI Draft</h2>
            <span className="text-[11px] font-mono text-slate-500">
              {inputText.length} characters
            </span>
          </div>

          <textarea
            rows={15}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste raw AI-generated text, ChatGPT drafts, or corporate copy to scrub..."
            className="w-full p-3 text-xs font-mono rounded-lg bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[#0A66C2] leading-relaxed resize-y min-h-[340px]"
          />

          <button
            onClick={handleHumanize}
            disabled={!inputText.trim()}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-medium text-white bg-amber-600 hover:bg-amber-500 rounded-md shadow-sm transition-colors disabled:opacity-40"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Run 4-Pass Humanizer Scrub</span>
          </button>
        </div>

        {/* RIGHT: Humanized Output */}
        <div className="p-5 rounded-xl border border-slate-800 bg-[#0f1523] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-semibold text-white">Humanized Version</h2>
              {result && (
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded capitalize ${
                  result.confidence === "reads human"
                    ? "bg-emerald-950/60 text-emerald-300 border border-emerald-800"
                    : result.confidence === "mixed"
                    ? "bg-amber-950/60 text-amber-300 border border-amber-800"
                    : "bg-rose-950/60 text-rose-300 border border-rose-800"
                }`}>
                  {result.confidence}
                </span>
              )}
            </div>

            {result && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded border border-slate-700/60 transition-colors"
              >
                {copied ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            )}
          </div>

          {result ? (
            <div className="space-y-4">
              <div className="p-3.5 text-xs font-mono rounded-lg bg-slate-950 border border-slate-800 text-slate-100 whitespace-pre-wrap leading-relaxed min-h-[300px] max-h-[460px] overflow-y-auto">
                {result.humanized}
              </div>

              {/* What Changed Summary */}
              {result.summaryOfChanges.length > 0 && (
                <div className="p-3.5 rounded-lg border border-slate-800 bg-slate-900/60 space-y-2">
                  <h3 className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>What Changed & Cleaned</span>
                  </h3>
                  <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                    {result.summaryOfChanges.map((change, idx) => (
                      <li key={idx} className="text-[11px] leading-relaxed">
                        {change}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action: Send to post writer */}
              <div className="pt-2 flex justify-end">
                <Link
                  href="/create"
                  className="flex items-center gap-1.5 text-xs font-medium text-[#0A66C2] hover:underline"
                >
                  <PenSquare className="w-3.5 h-3.5" />
                  <span>Open in Post Writer</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="p-16 text-center rounded-lg border border-dashed border-slate-800/80 bg-slate-950/40 text-slate-500 space-y-2">
              <Sparkles className="w-6 h-6 text-slate-600 mx-auto" />
              <p className="text-xs">Paste your draft on the left and run the scrub to view improvements.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
