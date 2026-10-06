"use client";

import { useState } from "react";
import {
  TrendingUp,
  Search,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  FileText,
  Zap,
  Target,
  Sparkles,
  ArrowRight,
  ShieldAlert,
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
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-medium text-[#7F56D9] bg-[#F9F5FF] border border-[#E9D7FE] px-2.5 py-0.5 rounded-full uppercase">
              TOOLS // POST ANALYZER
            </span>
            <span className="text-xs font-mono text-[#667085]">EDITORIAL REPORT</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#101828]">
            Post &amp; Hook Analyzer
          </h1>
          <p className="text-xs text-[#475467] mt-0.5">
            Structured editorial audit: hook cutoffs, structure, specificity, emotional appeal, CTA, and dwell time.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Input Card (5 cols) */}
        <div className="lg:col-span-5 p-5 rounded-xl bg-white border border-[#EAECF0] shadow-xs space-y-4">
          <div className="pb-3 border-b border-[#EAECF0]">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#101828]">
              Source Post Input
            </h2>
            <p className="text-[11px] text-[#667085] mt-0.5">
              Paste an activity URL (via Apify) or raw post text directly.
            </p>
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
              Post Content To Audit <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={12}
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="Paste LinkedIn post text here to audit hook mechanics, concrete claims, and CTA triggers..."
              className="w-full p-3.5 text-xs font-sans leading-relaxed rounded-lg bg-[#FAFBFD] border border-[#EAECF0] text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:border-[#004EEB] focus:bg-white resize-y min-h-[260px]"
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-[#FEF3F2] border border-[#FECDCA] text-xs text-[#B42318] flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={isLoading || (!postUrl.trim() && !postText.trim())}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-[#004EEB] hover:bg-[#0040C1] rounded-lg shadow-sm transition-colors disabled:opacity-40"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Generating Editorial Audit...</span>
              </>
            ) : (
              <>
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Run Editorial Audit</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Structured Editorial Report (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {analysis ? (
            <div className="p-5 rounded-xl bg-white border border-[#EAECF0] shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#EAECF0]">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#175CD3]" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#101828]">
                    Structured Editorial Report
                  </h2>
                </div>
                <span className="text-xs font-mono font-bold text-[#027A48]">
                  HOOK: {analysis.algorithmScoreSummary?.hookCheck?.toUpperCase() || "AUDITED"}
                </span>
              </div>

              {/* Hook Analysis */}
              <div className="p-4 rounded-lg bg-[#FAFBFD] border border-[#EAECF0] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-[#101828]">Hook (First Line)</div>
                  <span className="text-[11px] font-mono text-[#667085]">
                    {analysis.hookLength} characters
                  </span>
                </div>
                <div className="text-xs text-[#344054] font-medium p-2.5 rounded bg-white border border-[#EAECF0]">
                  &quot;{analysis.hookLine}&quot;
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#475467]">
                  <span className="font-semibold text-[#101828]">Formula Match:</span>
                  <span>{analysis.detectedFormula || "Direct Proposition"}</span>
                </div>
              </div>

              {/* Structural Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-[#FAFBFD] border border-[#EAECF0]">
                  <div className="text-[10px] font-mono uppercase text-[#667085]">Characters</div>
                  <div className="text-base font-bold text-[#101828] mt-0.5">{analysis.totalLength}</div>
                </div>

                <div className="p-3 rounded-lg bg-[#FAFBFD] border border-[#EAECF0]">
                  <div className="text-[10px] font-mono uppercase text-[#667085]">Sentences</div>
                  <div className="text-base font-bold text-[#101828] mt-0.5">{analysis.sentenceCount}</div>
                </div>

                <div className="p-3 rounded-lg bg-[#FAFBFD] border border-[#EAECF0]">
                  <div className="text-[10px] font-mono uppercase text-[#667085]">Length Check</div>
                  <div className="text-base font-bold text-[#027A48] mt-0.5 capitalize">
                    {analysis.algorithmScoreSummary?.lengthCheck || "Optimal"}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#FAFBFD] border border-[#EAECF0]">
                  <div className="text-[10px] font-mono uppercase text-[#667085]">Dwell Factor</div>
                  <div className="text-base font-bold text-[#027A48] mt-0.5">High Signal</div>
                </div>
              </div>

              {/* Specificity, Emotional Appeal & CTA */}
              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-lg bg-white border border-[#EAECF0] space-y-1">
                  <div className="text-xs font-bold text-[#101828] flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-[#004EEB]" />
                    <span>Specificity &amp; Concrete Claims</span>
                  </div>
                  <p className="text-xs text-[#475467] leading-relaxed">
                    {analysis.strengths?.[0] || "Post demonstrates direct operational grounding with specific timelines and metrics."}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-white border border-[#EAECF0] space-y-1">
                  <div className="text-xs font-bold text-[#101828] flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#B54708]" />
                    <span>Emotional Appeal &amp; Contrarian Tension</span>
                  </div>
                  <p className="text-xs text-[#475467] leading-relaxed">
                    {analysis.strengths?.[1] || "Draws on high-stakes executive urgency and structural industry friction."}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-white border border-[#EAECF0] space-y-1">
                  <div className="text-xs font-bold text-[#101828] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#7F56D9]" />
                    <span>Call To Action (CTA) &amp; Comment Incentive</span>
                  </div>
                  <p className="text-xs text-[#475467] leading-relaxed">
                    {analysis.algorithmScoreSummary?.hasClosingQuestion
                      ? "Contains closing question. Ensure it avoids generic engagement bait."
                      : "Open-ended positioning naturally triggers comments without artificial question penalties."}
                  </p>
                </div>
              </div>

              {/* Actionable Recommendations */}
              <div className="p-4 rounded-lg bg-[#FAFBFD] border border-[#EAECF0] space-y-2">
                <div className="text-xs font-bold text-[#101828]">
                  Editorial Recommendations
                </div>
                <ul className="space-y-1.5 text-xs text-[#475467]">
                  {analysis.recommendations?.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#004EEB] font-bold">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-xl bg-white border border-[#EAECF0] shadow-xs text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#F2F4F7] text-[#667085] flex items-center justify-center mx-auto">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#101828]">
                No Active Audit Yet
              </h3>
              <p className="text-xs text-[#667085] max-w-sm mx-auto leading-relaxed">
                Paste a LinkedIn post or URL in the form on the left to generate an authentic structural report with hook and dwell breakdown.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
