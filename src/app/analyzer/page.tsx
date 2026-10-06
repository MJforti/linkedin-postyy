"use client";

import { useState } from "react";
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  RefreshCw,
  AlertCircle,
  HelpCircle,
  Zap,
} from "lucide-react";
import { PostAnalysis } from "@/lib/types";

export default function PostAnalyzerPage() {
  const [postUrl, setPostUrl] = useState("");
  const [postText, setPostText] = useState("");
  const [analysis, setAnalysis] = useState<PostAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!postUrl.trim() && !postText.trim()) return;
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/analyze/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: postUrl || undefined,
          text: postText || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Analysis failed.");
      } else {
        setAnalysis(data.analysis);
      }
    } catch (err: any) {
      setError(err.message || "Network error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-purple-400" />
          <h1 className="text-xl font-bold text-white tracking-tight">LinkedIn Post & Hook Analyzer</h1>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Forensic breakdown of hook cutoff, formula classification, algorithm penalties, and tactical improvements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* INPUT (5 cols) */}
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
              Post Content To Audit <span className="text-rose-400">*</span>
            </label>
            <textarea
              rows={12}
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="Paste full LinkedIn post text here to analyze hook cutoffs, AI tells, and algorithm compliance..."
              className="w-full p-2.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[#0A66C2] leading-relaxed resize-y min-h-[260px]"
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-900/60 text-xs text-rose-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={isLoading || (!postUrl.trim() && !postText.trim())}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-medium text-white bg-purple-600 hover:bg-purple-500 rounded-md shadow-sm transition-colors disabled:opacity-40"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Running Audit Pipeline...</span>
              </>
            ) : (
              <>
                <Search className="w-3.5 h-3.5" />
                <span>Run In-Depth Post Audit</span>
              </>
            )}
          </button>
        </div>

        {/* REPORT (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {analysis ? (
            <div className="space-y-4">
              {/* Formula & Hook Scorecard */}
              <div className="p-5 rounded-xl border border-slate-800 bg-[#0f1523] space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div>
                    <span className="text-xs text-slate-400">Classified Formula</span>
                    <div className="text-sm font-semibold text-white flex items-center gap-2 mt-0.5">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span>{analysis.detectedFormula}</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    Fit: {analysis.formulaConfidence}
                  </span>
                </div>

                {/* Hook Diagnostics */}
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Line 1 Hook Performance</span>
                    <span className="font-mono text-slate-300">{analysis.hookLength} chars</span>
                  </div>
                  <p className="text-xs font-mono text-slate-200">
                    "{analysis.hookLine}"
                  </p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 text-center pt-1 font-mono text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                    <div className="text-slate-500 text-[10px]">TOTAL CHARS</div>
                    <div className="text-white font-bold mt-0.5">{analysis.totalLength}</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                    <div className="text-slate-500 text-[10px]">SENTENCES</div>
                    <div className="text-white font-bold mt-0.5">{analysis.sentenceCount}</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                    <div className="text-slate-500 text-[10px]">CLOSING Q</div>
                    <div className="text-white font-bold mt-0.5">
                      {analysis.algorithmScoreSummary.hasClosingQuestion ? "YES (+3%)" : "NO"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Strengths */}
              {analysis.strengths.length > 0 && (
                <div className="p-4 rounded-xl border border-slate-800 bg-[#0f1523] space-y-2">
                  <h3 className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Algorithmic Strengths</span>
                  </h3>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                    {analysis.strengths.map((str, idx) => (
                      <li key={idx} className="leading-relaxed">{str}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Weaknesses */}
              {analysis.weaknesses.length > 0 && (
                <div className="p-4 rounded-xl border border-slate-800 bg-[#0f1523] space-y-2">
                  <h3 className="text-xs font-semibold text-rose-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Potential Feed Penalties & AI Tells</span>
                  </h3>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                    {analysis.weaknesses.map((w, idx) => (
                      <li key={idx} className="leading-relaxed">{w}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommendations */}
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 space-y-2">
                <h3 className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-[#0A66C2]" />
                  <span>Actionable Improvements</span>
                </h3>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  {analysis.recommendations.map((rec, idx) => (
                    <li key={idx} className="leading-relaxed">{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="p-16 text-center rounded-xl border border-dashed border-slate-800 bg-[#0f1523]/40 text-slate-500 space-y-2">
              <Search className="w-6 h-6 text-slate-600 mx-auto" />
              <p className="text-xs">
                Enter your post text on the left to generate an in-depth audit report.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
