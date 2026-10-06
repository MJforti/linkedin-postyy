"use client";

import { useState, useEffect } from "react";
import {
  Sliders,
  CheckCircle2,
  Bookmark,
  ShieldCheck,
  AlertCircle,
  Plus,
  Trash2,
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
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#0A66C2]" />
            <h1 className="text-xl font-bold text-white tracking-tight">Voice & Brand Profile</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Define your unique practitioner voice, blacklisted vocabulary, and formatting cadence.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-[#0A66C2] hover:bg-[#084e96] rounded-md shadow-sm transition-colors"
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>{saveStatus ? "Saved!" : "Save Voice Profile"}</span>
        </button>
      </div>

      <div className="p-6 rounded-xl border border-slate-800 bg-[#0f1523] space-y-6">
        {/* Profile Name & Tagline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Profile Identifier</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-3 py-1.5 text-xs rounded-md bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-[#0A66C2]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Tagline / Mission</label>
            <input
              type="text"
              value={profile.tagline}
              onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
              className="w-full px-3 py-1.5 text-xs rounded-md bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-[#0A66C2]"
            />
          </div>
        </div>

        {/* Style & Tone Description */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Writing Style & Cadence</label>
          <textarea
            rows={3}
            value={profile.styleDescription}
            onChange={(e) => setProfile({ ...profile, styleDescription: e.target.value })}
            className="w-full p-2.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-[#0A66C2] resize-none"
          />
        </div>

        {/* Words to Avoid (Blacklist) */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-300">
            Blacklisted Words (Always Scrubbed by Humanizer)
          </label>
          <div className="flex flex-wrap items-center gap-1.5 p-3 rounded-lg bg-slate-950 border border-slate-800 min-h-[44px]">
            {profile.avoidWords.map((word) => (
              <span
                key={word}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-rose-950/60 text-rose-300 border border-rose-900/60 font-mono"
              >
                <span>{word}</span>
                <button
                  onClick={() => removeAvoidWord(word)}
                  className="hover:text-white"
                  title="Remove word"
                >
                  <Trash2 className="w-2.5 h-2.5" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="text"
              value={newAvoidWord}
              onChange={(e) => setNewAvoidWord(e.target.value)}
              placeholder="Add word to avoid (e.g. robust, synergy)..."
              onKeyDown={(e) => e.key === "Enter" && addAvoidWord()}
              className="px-3 py-1.5 text-xs rounded-md bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-[#0A66C2] flex-1"
            />
            <button
              onClick={addAvoidWord}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded transition-colors"
            >
              Add Word
            </button>
          </div>
        </div>

        {/* Preferred Words */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-300">
            Preferred Practitioner Vocabulary
          </label>
          <div className="flex flex-wrap items-center gap-1.5 p-3 rounded-lg bg-slate-950 border border-slate-800 min-h-[44px]">
            {profile.preferredWords.map((word) => (
              <span
                key={word}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-emerald-950/60 text-emerald-300 border border-emerald-900/60 font-mono"
              >
                <span>{word}</span>
                <button
                  onClick={() => removePreferredWord(word)}
                  className="hover:text-white"
                  title="Remove word"
                >
                  <Trash2 className="w-2.5 h-2.5" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="text"
              value={newPreferredWord}
              onChange={(e) => setNewPreferredWord(e.target.value)}
              placeholder="Add preferred term (e.g. receipts, throughput)..."
              onKeyDown={(e) => e.key === "Enter" && addPreferredWord()}
              className="px-3 py-1.5 text-xs rounded-md bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-[#0A66C2] flex-1"
            />
            <button
              onClick={addPreferredWord}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded transition-colors"
            >
              Add Word
            </button>
          </div>
        </div>

        {/* CTA Preferences */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">CTA & Closing Preference</label>
          <input
            type="text"
            value={profile.ctaPreferences}
            onChange={(e) => setProfile({ ...profile, ctaPreferences: e.target.value })}
            className="w-full px-3 py-1.5 text-xs rounded-md bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-[#0A66C2]"
          />
        </div>
      </div>
    </div>
  );
}
