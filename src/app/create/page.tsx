"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  PenSquare,
  Sparkles,
  Send,
  Copy,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  Bookmark,
  RefreshCw,
  FileText,
} from "lucide-react";
import { HOOK_FORMULAS, FOUNDER_ANGLES } from "@/lib/hook-formulas";
import { EngagementGoal, PostTone, PostDraft } from "@/lib/types";
import { auditAlgorithmHeuristics } from "@/lib/algorithm-heuristics";
import { getStoredDrafts, saveDraft } from "@/lib/storage";
import { humanizeLinkedInText } from "@/lib/humanizer";
import { ApprovalPublishModal } from "@/components/ApprovalPublishModal";

function CreatePostContent() {
  const searchParams = useSearchParams();
  const initialDraftId = searchParams.get("draftId");
  const formulaParam = searchParams.get("formula");

  // Input Controls
  const [topic, setTopic] = useState("");
  const [targetAudience, setTargetAudience] = useState("B2B leaders, founders, and operators");
  const [goal, setGoal] = useState<EngagementGoal>("comments");
  const [tone, setTone] = useState<PostTone>("direct");
  const [selectedFormula, setSelectedFormula] = useState(formulaParam || "F17");
  const [founderAngle, setFounderAngle] = useState("");
  const [context, setContext] = useState("");

  // Editor Area
  const [draftContent, setDraftContent] = useState("");
  const [activeDraftId, setActiveDraftId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isHumanizing, setIsHumanizing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Modal
  const [isApprovalOpen, setIsApprovalOpen] = useState(false);

  // Load draft if requested via query param
  useEffect(() => {
    if (initialDraftId) {
      const drafts = getStoredDrafts();
      const match = drafts.find((d) => d.id === initialDraftId);
      if (match) {
        setTopic(match.topic || "");
        setDraftContent(match.content || "");
        setGoal(match.goal || "comments");
        setTone(match.tone || "direct");
        if (match.formulaCode) setSelectedFormula(match.formulaCode);
        if (match.founderAngleCode) setFounderAngle(match.founderAngleCode);
        setActiveDraftId(match.id);
      }
    } else if (formulaParam) {
      setSelectedFormula(formulaParam);
    }
  }, [initialDraftId, formulaParam]);

  // Real-time algorithm heuristic audit
  const audit = auditAlgorithmHeuristics(draftContent);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);

    try {
      const res = await fetch("/api/generate/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          targetAudience,
          goal,
          tone,
          context,
          formulaCode: selectedFormula,
          founderAngleCode: founderAngle || undefined,
        }),
      });

      const data = await res.json();
      if (data.success && data.content) {
        setDraftContent(data.content);
        const newDraftId = activeDraftId || `draft-${Date.now()}`;
        setActiveDraftId(newDraftId);
        saveDraft({
          id: newDraftId,
          title: data.title || topic,
          topic,
          content: data.content,
          formulaCode: selectedFormula,
          founderAngleCode: founderAngle || undefined,
          goal,
          tone,
          targetAudience,
          charCount: data.charCount || data.content.length,
          status: "draft",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        setSaveStatus("Generated and saved to local drafts");
        setTimeout(() => setSaveStatus(null), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleHumanizeInPlace = () => {
    if (!draftContent.trim()) return;
    setIsHumanizing(true);
    const result = humanizeLinkedInText(draftContent);
    setDraftContent(result.humanized);
    setIsHumanizing(false);
    setSaveStatus("Applied Humanizer V3 scrub");
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleSaveDraft = () => {
    if (!draftContent.trim()) return;
    const id = activeDraftId || `draft-${Date.now()}`;
    setActiveDraftId(id);
    saveDraft({
      id,
      title: topic || "Untitled Post",
      topic: topic || "General Topic",
      content: draftContent,
      formulaCode: selectedFormula,
      founderAngleCode: founderAngle || undefined,
      goal,
      tone,
      targetAudience,
      charCount: draftContent.length,
      status: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setSaveStatus("Draft saved successfully");
    setTimeout(() => setSaveStatus(null), 2500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(draftContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Post Writing Workspace</h1>
          <p className="text-xs text-slate-400">
            Engineered around 2026 reach formulas, character thresholds, and approve-first publishing.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {saveStatus && (
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{saveStatus}</span>
            </span>
          )}
          <button
            onClick={handleSaveDraft}
            disabled={!draftContent.trim()}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded border border-slate-700 bg-slate-800 hover:bg-slate-700 transition-colors disabled:opacity-40"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Save Draft</span>
          </button>
          <button
            onClick={() => setIsApprovalOpen(true)}
            disabled={!draftContent.trim()}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-[#0A66C2] hover:bg-[#084e96] rounded-md shadow-sm transition-colors disabled:opacity-40"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Approve & Publish</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Input Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-4 p-5 rounded-xl border border-slate-800 bg-[#0f1523]">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Topic or Core Idea <span className="text-rose-400">*</span>
            </label>
            <textarea
              rows={2}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Why autonomous agencies are replacing traditional retainers..."
              className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#0A66C2] leading-relaxed resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Primary Goal</label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value as EngagementGoal)}
                className="w-full px-2.5 py-1.5 text-xs rounded-md bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-[#0A66C2]"
              >
                <option value="comments">Comments (Discussion)</option>
                <option value="reposts">Reposts (Reach)</option>
                <option value="saves">Saves (Frameworks)</option>
                <option value="likes">Likes (Stories)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value as PostTone)}
                className="w-full px-2.5 py-1.5 text-xs rounded-md bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-[#0A66C2]"
              >
                <option value="direct">Direct & Sharp</option>
                <option value="conversational">Conversational</option>
                <option value="analytical">Analytical / Data</option>
                <option value="founder">Founder Perspective</option>
                <option value="opinionated">Contrarian</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Hook Formula (2026 Canonical)
            </label>
            <select
              value={selectedFormula}
              onChange={(e) => setSelectedFormula(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs rounded-md bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-[#0A66C2]"
            >
              {HOOK_FORMULAS.map((f) => (
                <option key={f.code} value={f.code}>
                  {f.code} — {f.name} ({f.bestFor})
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-400 mt-1">
              {HOOK_FORMULAS.find((f) => f.code === selectedFormula)?.whyItWorks}
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Founder Edition Angle (Optional)
            </label>
            <select
              value={founderAngle}
              onChange={(e) => setFounderAngle(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs rounded-md bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-[#0A66C2]"
            >
              <option value="">None (General Audience)</option>
              {FOUNDER_ANGLES.map((a) => (
                <option key={a.code} value={a.code}>
                  {a.code} — {a.name} ({a.territory})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Target Audience</label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g. Enterprise CTOs, Series B founders"
              className="w-full px-3 py-1.5 text-xs rounded-md bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#0A66C2]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Operational Context & Numbers (Optional)
            </label>
            <textarea
              rows={3}
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Paste specific numbers, dates, tools (e.g. $24,500 retainer, 38 hours, Claude, Make)..."
              className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#0A66C2] leading-relaxed resize-none"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !topic.trim()}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-medium text-white bg-[#0A66C2] hover:bg-[#084e96] rounded-md shadow-sm transition-colors disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Applying Formula & Writing Draft...</span>
              </>
            ) : (
              <>
                <PenSquare className="w-3.5 h-3.5" />
                <span>Generate Post Draft</span>
              </>
            )}
          </button>
        </div>

        {/* RIGHT COLUMN: Writing Area & Live Feed Audit (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-xl border border-slate-800 bg-[#0f1523] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <FileText className="w-4 h-4 text-[#0A66C2]" />
                <span>Draft Editor</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleHumanizeInPlace}
                  disabled={isHumanizing || !draftContent.trim()}
                  title="Run Humanizer V3 scrub on editor content"
                  className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-amber-300 hover:text-amber-200 bg-amber-950/40 border border-amber-900/60 rounded transition-colors disabled:opacity-40"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Humanize In-Place</span>
                </button>

                <button
                  onClick={handleCopy}
                  disabled={!draftContent.trim()}
                  title="Copy text to clipboard"
                  className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700/60 rounded transition-colors disabled:opacity-40"
                >
                  {copied ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            <textarea
              rows={16}
              value={draftContent}
              onChange={(e) => setDraftContent(e.target.value)}
              placeholder="Draft your post or hit 'Generate Post Draft' to write using the selected formula..."
              className="w-full p-3 text-sm font-sans rounded-lg bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-[#0A66C2] leading-relaxed resize-y min-h-[380px]"
            />

            {/* Metrics Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-4">
                <span>
                  Chars: <strong className={audit.charCount > 3000 ? "text-rose-400" : "text-white"}>{audit.charCount}</strong> / 3,000
                </span>
                <span>Sentences: <strong className="text-white">{audit.sentenceCount}</strong></span>
                <span>Hook (Line 1): <strong className="text-white">{audit.hookCharCount}</strong> chars</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-semibold ${
                audit.sweetSpotLength ? "bg-emerald-950/60 text-emerald-300 border border-emerald-800" : "bg-slate-800 text-slate-300"
              }`}>
                {audit.lengthRating}
              </span>
            </div>
          </div>

          {/* Live Heuristics Card */}
          <div className="p-4 rounded-xl border border-slate-800 bg-[#0f1523]/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>2026 Feed Quality Signals</span>
              </div>
              <span className="text-xs font-mono text-emerald-400">
                Est. Multiplier: <strong>{audit.scoreMultiplierEstimate}x</strong>
              </span>
            </div>

            {audit.feedAlerts.length > 0 ? (
              <div className="space-y-2">
                {audit.feedAlerts.map((alert, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-lg text-xs flex items-start justify-between gap-2 ${
                      alert.type === "positive"
                        ? "bg-emerald-950/30 border border-emerald-900/50 text-emerald-200"
                        : "bg-rose-950/30 border border-rose-900/50 text-rose-200"
                    }`}
                  >
                    <span>{alert.message}</span>
                    <span className="text-[10px] font-mono shrink-0 font-semibold">{alert.impact}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500">
                Type or generate a draft above to see real-time algorithm checks (hook cutoffs, question penalties, number-first openers).
              </p>
            )}
          </div>
        </div>
      </div>

      <ApprovalPublishModal
        isOpen={isApprovalOpen}
        onClose={() => setIsApprovalOpen(false)}
        draftText={draftContent}
        onPublished={() => {
          if (activeDraftId) {
            saveDraft({
              id: activeDraftId,
              title: topic || "Published Post",
              topic: topic || "Post",
              content: draftContent,
              goal,
              tone,
              targetAudience,
              charCount: draftContent.length,
              status: "published",
              publishedAt: new Date().toISOString(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            });
          }
        }}
      />
    </div>
  );
}

export default function CreatePostPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-500 font-mono">Loading writer workspace...</div>}>
      <CreatePostContent />
    </Suspense>
  );
}

