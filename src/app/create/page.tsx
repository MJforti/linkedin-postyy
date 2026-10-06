"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  SquarePen,
  Wand2,
  Copy,
  CheckCircle2,
  Clock,
  TrendingUp,
  Bookmark,
  RefreshCw,
  FileText,
  Eye,
  Edit3,
  ThumbsUp,
  MessageSquare,
  Repeat2,
  Send,
  Sliders,
  ChevronDown,
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

  // Editor Area & Views
  const [draftContent, setDraftContent] = useState("");
  const [activeDraftId, setActiveDraftId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");
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
        setSaveStatus("Saved to drafts");
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
    try {
      const result = humanizeLinkedInText(draftContent);
      setDraftContent(result.humanized);
      setSaveStatus("Humanized (AI cadence stripped)");
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsHumanizing(false);
    }
  };

  const handleSaveDraft = () => {
    if (!draftContent.trim()) return;
    const draftId = activeDraftId || `draft-${Date.now()}`;
    setActiveDraftId(draftId);
    saveDraft({
      id: draftId,
      title: topic || "Untitled Post",
      topic: topic || "General Thought",
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
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleCopy = () => {
    if (!draftContent) return;
    navigator.clipboard.writeText(draftContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formulaObj = HOOK_FORMULAS.find((f) => f.code === selectedFormula);

  // Compute first 3 lines for LinkedIn mobile cutoff preview
  const lines = draftContent.split("\n");
  const mobilePreviewCutoffLineIndex = 3;
  const isCutoffActive = lines.length > mobilePreviewCutoffLineIndex || draftContent.length > 210;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-medium text-[#175CD3] bg-[#EFF8FF] border border-[#D1E9FF] px-2.5 py-0.5 rounded-full uppercase">
              STUDIO // ENGINE 01
            </span>
            <span className="text-xs font-mono text-[#667085]">
              Formula: {selectedFormula}
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#101828]">
            Post Writer
          </h1>
          <p className="text-xs text-[#475467] mt-0.5">
            Craft high-signal LinkedIn posts adhering to 2026 feed reach rules and dwell-time mechanics.
          </p>
        </div>

        {/* Global Save Indicator & Publish CTA */}
        <div className="flex items-center gap-2.5">
          {saveStatus && (
            <span className="text-xs font-medium text-[#027A48] bg-[#ECFDF3] border border-[#A6F4C5] px-2.5 py-1 rounded-lg animate-in fade-in">
              {saveStatus}
            </span>
          )}

          <button
            onClick={() => setIsApprovalOpen(true)}
            disabled={!draftContent.trim()}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#004EEB] hover:bg-[#0040C1] rounded-lg shadow-sm transition-colors disabled:opacity-40"
          >
            <span>Approve &amp; Schedule</span>
          </button>
        </div>
      </div>

      {/* Main Studio Grid: Left Context Controls (5 cols), Right Editor/Preview (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Context & Formula Controls (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#EAECF0] rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAECF0]">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#175CD3]" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#101828]">
                Context Controls
              </h2>
            </div>
            <span className="text-[10px] font-mono text-[#667085]">INPUT SPEC</span>
          </div>

          {/* Topic */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#344054]">
              Topic or Core Insight <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Scaling B2B SaaS without bloated sales teams"
              className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-[#D0D5DD] text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:border-[#004EEB] focus:ring-1 focus:ring-[#004EEB]"
            />
          </div>

          {/* Target Audience */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#344054]">
              Target Audience
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g. B2B founders, technical operators"
              className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-[#D0D5DD] text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:border-[#004EEB]"
            />
          </div>

          {/* Goal & Tone in 2 columns */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#344054]">Primary Goal</label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value as EngagementGoal)}
                className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white border border-[#D0D5DD] text-[#101828] focus:outline-none focus:border-[#004EEB]"
              >
                <option value="comments">Comments (Dwell)</option>
                <option value="reach">Maximum Reach</option>
                <option value="leads">Lead Gen / DM</option>
                <option value="authority">Authority / Brand</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#344054]">Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value as PostTone)}
                className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white border border-[#D0D5DD] text-[#101828] focus:outline-none focus:border-[#004EEB]"
              >
                <option value="direct">Direct &amp; Candid</option>
                <option value="contrarian">Contrarian</option>
                <option value="storytelling">Narrative / Story</option>
                <option value="educational">Educational Teardown</option>
                <option value="technical">Technical Rigor</option>
              </select>
            </div>
          </div>

          {/* Hook Formula (F1-F20) */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[#344054]">
                2026 Hook Formula
              </label>
              <span className="text-[10px] font-mono text-[#175CD3] font-semibold">
                {formulaObj?.name}
              </span>
            </div>
            <select
              value={selectedFormula}
              onChange={(e) => setSelectedFormula(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white border border-[#D0D5DD] text-[#101828] focus:outline-none focus:border-[#004EEB]"
            >
              {HOOK_FORMULAS.map((f) => (
                <option key={f.code} value={f.code}>
                  [{f.code}] {f.name} — {f.bestFor}
                </option>
              ))}
            </select>
            {formulaObj && (
              <p className="text-[11px] text-[#475467] bg-[#F8F9FA] p-2.5 rounded-lg border border-[#EAECF0] leading-relaxed mt-1">
                <span className="font-semibold text-[#101828]">Blueprint:</span> {formulaObj.skeleton}
              </p>
            )}
          </div>

          {/* Founder Angle */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#344054]">
              Founder Angle (Optional)
            </label>
            <select
              value={founderAngle}
              onChange={(e) => setFounderAngle(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white border border-[#D0D5DD] text-[#101828] focus:outline-none focus:border-[#004EEB]"
            >
              <option value="">None (Standard Operator)</option>
              {FOUNDER_ANGLES.map((a) => (
                <option key={a.code} value={a.code}>
                  [{a.code}] {a.name}
                </option>
              ))}
            </select>
          </div>

          {/* Specific Figures & Context */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#344054]">
              Specific Figures &amp; Context
            </label>
            <textarea
              rows={3}
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Paste raw numbers, dates, tools (e.g. $24,500 retainer, 38 hours, 3-person pod)..."
              className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-[#D0D5DD] text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:border-[#004EEB] leading-relaxed resize-none"
            />
          </div>

          {/* Action Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !topic.trim()}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-[#004EEB] hover:bg-[#0040C1] rounded-lg shadow-sm transition-colors disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Applying Heuristics &amp; Generating...</span>
              </>
            ) : (
              <>
                <SquarePen className="w-3.5 h-3.5" />
                <span>Generate Post Draft</span>
              </>
            )}
          </button>
        </div>

        {/* RIGHT COLUMN: Writing Studio & Realistic Preview (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-[#EAECF0] rounded-xl p-5 shadow-xs space-y-3.5">
            {/* Editor Toolbar with Tabs */}
            <div className="flex items-center justify-between pb-3 border-b border-[#EAECF0]">
              <div className="flex items-center gap-1 bg-[#F2F4F7] p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab("editor")}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                    activeTab === "editor"
                      ? "bg-white text-[#101828] shadow-xs"
                      : "text-[#667085] hover:text-[#101828]"
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Editor</span>
                </button>
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                    activeTab === "preview"
                      ? "bg-white text-[#101828] shadow-xs"
                      : "text-[#667085] hover:text-[#101828]"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>LinkedIn Preview</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleHumanizeInPlace}
                  disabled={isHumanizing || !draftContent.trim()}
                  title="Strip AI cadence and cliches"
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-[#B54708] hover:bg-[#FEF0C7] bg-[#FEF0C7]/50 border border-[#FEDF89] rounded-lg transition-colors disabled:opacity-40"
                >
                  <Wand2 className="w-3 h-3" />
                  <span>Humanize In-Place</span>
                </button>

                <button
                  onClick={handleSaveDraft}
                  disabled={!draftContent.trim()}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-[#344054] hover:bg-[#F2F4F7] bg-white border border-[#D0D5DD] rounded-lg transition-colors disabled:opacity-40"
                >
                  <Bookmark className="w-3 h-3 text-[#667085]" />
                  <span>Save</span>
                </button>

                <button
                  onClick={handleCopy}
                  disabled={!draftContent.trim()}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-[#344054] hover:bg-[#F2F4F7] bg-white border border-[#D0D5DD] rounded-lg transition-colors disabled:opacity-40"
                >
                  {copied ? <CheckCircle2 className="w-3 h-3 text-[#027A48]" /> : <Copy className="w-3 h-3 text-[#667085]" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            {/* Tab 1: Editor */}
            {activeTab === "editor" ? (
              <div className="space-y-3">
                <textarea
                  rows={15}
                  value={draftContent}
                  onChange={(e) => setDraftContent(e.target.value)}
                  placeholder="Type your post or click 'Generate Post Draft' to write using the selected formula..."
                  className="w-full p-4 text-[13px] leading-relaxed font-sans rounded-lg bg-[#FAFBFD] border border-[#EAECF0] text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:border-[#004EEB] focus:bg-white resize-y min-h-[380px]"
                />

                {/* Metrics Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-[#667085] font-mono border-t border-[#F2F4F7]">
                  <div className="flex items-center gap-4">
                    <span>
                      Chars: <strong className={audit.charCount > 3000 ? "text-red-600" : "text-[#101828]"}>{audit.charCount}</strong> / 3,000
                    </span>
                    <span>Sentences: <strong className="text-[#101828]">{audit.sentenceCount}</strong></span>
                    <span>Hook (Line 1): <strong className="text-[#101828]">{audit.hookCharCount}</strong> chars</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-semibold ${
                    audit.sweetSpotLength ? "bg-[#ECFDF3] text-[#027A48] border border-[#A6F4C5]" : "bg-[#F2F4F7] text-[#344054]"
                  }`}>
                    {audit.lengthRating}
                  </span>
                </div>
              </div>
            ) : (
              /* Tab 2: Realistic LinkedIn Feed Preview */
              <div className="p-4 rounded-xl bg-[#F2F4F7] border border-[#EAECF0] space-y-3">
                <div className="p-4 rounded-xl bg-white border border-[#D0D5DD] shadow-xs max-w-xl mx-auto space-y-3">
                  {/* Author Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-full bg-[#E0E7FF] border border-[#C7D2FE] flex items-center justify-center text-[#3730A3] font-bold text-sm">
                        ER
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#101828]">
                          Elena Rostova
                        </div>
                        <div className="text-[11px] text-[#667085]">
                          Founder &amp; Executive Operator • 1st
                        </div>
                        <div className="text-[10px] text-[#98A2B3] flex items-center gap-1">
                          <span>Just now</span> • <span>🌐</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Post Content with Cutoff Demonstration */}
                  <div className="text-[13px] text-[#101828] leading-relaxed whitespace-pre-line">
                    {draftContent || "Your drafted content will appear here in high-fidelity preview format..."}
                  </div>

                  {isCutoffActive && (
                    <div className="pt-1 text-[11px] font-mono text-[#175CD3] border-t border-dashed border-[#EAECF0]">
                      ↑ Mobile &quot;...see more&quot; fold triggers around line 3 / 210 characters
                    </div>
                  )}

                  {/* Post Action Buttons */}
                  <div className="pt-2 border-t border-[#F2F4F7] flex items-center justify-between text-[#667085] text-xs font-semibold px-2">
                    <div className="flex items-center gap-1.5 hover:text-[#101828] cursor-pointer">
                      <ThumbsUp className="w-4 h-4" />
                      <span>Like</span>
                    </div>
                    <div className="flex items-center gap-1.5 hover:text-[#101828] cursor-pointer">
                      <MessageSquare className="w-4 h-4" />
                      <span>Comment</span>
                    </div>
                    <div className="flex items-center gap-1.5 hover:text-[#101828] cursor-pointer">
                      <Repeat2 className="w-4 h-4" />
                      <span>Repost</span>
                    </div>
                    <div className="flex items-center gap-1.5 hover:text-[#101828] cursor-pointer">
                      <Send className="w-4 h-4" />
                      <span>Send</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Live 2026 Feed Heuristics Box */}
          <div className="bg-white border border-[#EAECF0] rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#12B76A]" />
                <h3 className="text-xs font-bold text-[#101828]">
                  2026 Feed Quality Signals
                </h3>
              </div>
              <span className="text-xs font-mono text-[#027A48] font-bold">
                Est. Multiplier: {audit.scoreMultiplierEstimate}x
              </span>
            </div>

            {audit.feedAlerts.length > 0 ? (
              <div className="space-y-2">
                {audit.feedAlerts.map((alert, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-lg text-xs flex items-start justify-between gap-2 ${
                      alert.type === "positive"
                        ? "bg-[#ECFDF3] border border-[#A6F4C5] text-[#027A48]"
                        : "bg-[#FEF3F2] border border-[#FECDCA] text-[#B42318]"
                    }`}
                  >
                    <span>{alert.message}</span>
                    <span className="text-[10px] font-mono shrink-0 font-semibold">{alert.impact}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#667085]">
                Generate or type a draft above to run real-time checks on hook density, question penalties, and line breaks.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Approve & Publish Modal */}
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
    <Suspense fallback={<div className="p-12 text-center text-xs text-[#667085] font-mono">Loading studio workspace...</div>}>
      <CreatePostContent />
    </Suspense>
  );
}
