"use client";

import { useState, useEffect } from "react";
import {
  Mic,
  Bookmark,
  CheckCircle2,
  Plus,
  Trash2,
  Sliders,
  ShieldAlert,
} from "lucide-react";
import { VoiceProfile } from "@/lib/types";
import { getStoredVoiceProfile, saveVoiceProfile } from "@/lib/storage";

export default function VoiceSettingsPage() {
  const [profile, setProfile] = useState<VoiceProfile>(getStoredVoiceProfile());
  const [saveStatus, setSaveStatus] = useState(false);
  const [newAvoidWord, setNewAvoidWord] = useState("");
  const [newPreferredWord, setNewPreferredWord] = useState("");

  useEffect(() => {
    setProfile(getStoredVoiceProfile());
  }, []);

  const handleSave = () => {
    saveVoiceProfile(profile);
    setSaveStatus(true);
    setTimeout(() => setSaveStatus(false), 2500);
  };

  const addAvoidWord = () => {
    if (!newAvoidWord.trim()) return;
    setProfile((prev) => ({
      ...prev,
      avoidWords: [...prev.avoidWords, newAvoidWord.trim().toLowerCase()],
    }));
    setNewAvoidWord("");
  };

  const removeAvoidWord = (word: string) => {
    setProfile((prev) => ({
      ...prev,
      avoidWords: prev.avoidWords.filter((w) => w !== word),
    }));
  };

  const addPreferredWord = () => {
    if (!newPreferredWord.trim()) return;
    setProfile((prev) => ({
      ...prev,
      preferredWords: [...prev.preferredWords, newPreferredWord.trim().toLowerCase()],
    }));
    setNewPreferredWord("");
  };

  const removePreferredWord = (word: string) => {
    setProfile((prev) => ({
      ...prev,
      preferredWords: prev.preferredWords.filter((w) => w !== word),
    }));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-medium text-[#175CD3] bg-[#EFF8FF] border border-[#D1E9FF] px-2.5 py-0.5 rounded-full uppercase">
              SETTINGS // YOUR VOICE
            </span>
            <span className="text-xs font-mono text-[#667085]">CALIBRATION</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#101828]">
            Executive Voice Calibration
          </h1>
          <p className="text-xs text-[#475467] mt-0.5">
            Configure your tone, preferred practitioner vocabulary, and blacklisted clichés to govern draft generation.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#004EEB] hover:bg-[#0040C1] rounded-lg shadow-sm transition-colors self-start sm:self-auto"
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>{saveStatus ? "Saved!" : "Save Profile"}</span>
        </button>
      </div>

      <div className="p-6 rounded-xl bg-white border border-[#EAECF0] shadow-xs space-y-6">
        {/* Name & Tagline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#344054]">Voice Persona Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-[#D0D5DD] text-[#101828] focus:outline-none focus:border-[#004EEB]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#344054]">Core Tagline / Stance</label>
            <input
              type="text"
              value={profile.tagline || ""}
              onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
              placeholder="e.g. Building high-signal software without billable bloat"
              className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-[#D0D5DD] text-[#101828] focus:outline-none focus:border-[#004EEB]"
            />
          </div>
        </div>

        {/* Tone Descriptors */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#344054]">
            Tone Descriptors (Comma separated)
          </label>
          <input
            type="text"
            value={profile.tone || "Authoritative, candid, data-grounded, contrarian"}
            onChange={(e) =>
              setProfile({
                ...profile,
                tone: e.target.value,
              })
            }
            className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-[#D0D5DD] text-[#101828] focus:outline-none focus:border-[#004EEB]"
          />
        </div>

        {/* Words Avoided (Blacklist) */}
        <div className="space-y-2 pt-2 border-t border-[#F2F4F7]">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-[#344054]">
              Blacklisted Words &amp; Corporate Clichés (Always Stripped)
            </label>
            <span className="text-[11px] font-mono text-[#B54708]">
              {profile.avoidWords.length} banned phrases
            </span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newAvoidWord}
              onChange={(e) => setNewAvoidWord(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addAvoidWord())}
              placeholder="Add word to blacklist (e.g. delve, game changer, thrilled)..."
              className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-[#FAFBFD] border border-[#EAECF0] text-[#101828] focus:outline-none focus:border-[#004EEB]"
            />
            <button
              onClick={addAvoidWord}
              className="px-3 py-1.5 text-xs font-semibold text-[#344054] hover:bg-[#F2F4F7] bg-white border border-[#D0D5DD] rounded-lg transition-colors"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {profile.avoidWords.map((word) => (
              <span
                key={word}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full bg-[#FEF3F2] text-[#B42318] border border-[#FECDCA]"
              >
                <span>{word}</span>
                <button onClick={() => removeAvoidWord(word)} className="hover:text-red-800">
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Words Preferred */}
        <div className="space-y-2 pt-2 border-t border-[#F2F4F7]">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-[#344054]">
              Preferred Vocabulary &amp; Operator Terms
            </label>
            <span className="text-[11px] font-mono text-[#027A48]">
              {profile.preferredWords.length} terms
            </span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newPreferredWord}
              onChange={(e) => setNewPreferredWord(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addPreferredWord())}
              placeholder="Add preferred word (e.g. leverage, pipeline, latency)..."
              className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-[#FAFBFD] border border-[#EAECF0] text-[#101828] focus:outline-none focus:border-[#004EEB]"
            />
            <button
              onClick={addPreferredWord}
              className="px-3 py-1.5 text-xs font-semibold text-[#344054] hover:bg-[#F2F4F7] bg-white border border-[#D0D5DD] rounded-lg transition-colors"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {profile.preferredWords.map((word) => (
              <span
                key={word}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full bg-[#ECFDF3] text-[#027A48] border border-[#A6F4C5]"
              >
                <span>{word}</span>
                <button onClick={() => removePreferredWord(word)} className="hover:text-emerald-800">
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Writing Sample */}
        <div className="space-y-1 pt-2 border-t border-[#F2F4F7]">
          <label className="text-xs font-semibold text-[#344054]">
            Writing Sample (Golden Standard)
          </label>
          <textarea
            rows={5}
            value={profile.examples?.[0] || ""}
            onChange={(e) => setProfile({ ...profile, examples: [e.target.value] })}
            placeholder="Paste 1–2 paragraphs of your best writing to tune the AI synthesizer..."
            className="w-full p-3 text-xs font-sans leading-relaxed rounded-lg bg-[#FAFBFD] border border-[#EAECF0] text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:border-[#004EEB] resize-y"
          />
        </div>
      </div>
    </div>
  );
}
