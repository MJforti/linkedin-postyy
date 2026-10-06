"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PenSquare,
  FileText,
  Calendar,
  MessageSquare,
  Search,
  UserCheck,
  Sparkles,
  Zap,
  Target,
  Sliders,
  Radio,
  ExternalLink,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: any;
  badge?: string;
}

const WORKSPACE_NAV: NavItem[] = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "Create Post", href: "/create", icon: PenSquare },
  { title: "Drafts", href: "/drafts", icon: FileText },
  { title: "Content Calendar", href: "/calendar", icon: Calendar },
];

const TOOLS_NAV: NavItem[] = [
  { title: "Comment Drafter", href: "/comments", icon: MessageSquare },
  { title: "Post Analyzer", href: "/analyzer", icon: Search },
  { title: "Hook Library", href: "/hooks", icon: Zap },
  { title: "Profile Optimizer", href: "/profile", icon: UserCheck },
];

const STRATEGY_NAV: NavItem[] = [
  { title: "Humanizer V3", href: "/humanizer", icon: Sparkles },
  { title: "Content Strategy", href: "/strategy", icon: Target },
];

const SETTINGS_NAV: NavItem[] = [
  { title: "Voice & Tone", href: "/settings/voice", icon: Sliders },
  { title: "Integrations", href: "/settings/integrations", icon: Radio },
];

export function Sidebar({ mobileOpen, onCloseMobile }: { mobileOpen?: boolean; onCloseMobile?: () => void }) {
  const pathname = usePathname();

  const renderNavGroup = (heading: string, items: NavItem[]) => (
    <div className="mb-6">
      <div className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        {heading}
      </div>
      <div className="space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={`flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? "bg-slate-800/90 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? "text-[#0A66C2]" : "text-slate-400"}`} />
                <span>{item.title}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col w-64 border-r border-slate-800/80 bg-[#090d16] transition-transform duration-200 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between h-14 px-4 border-b border-slate-800/80">
          <Link href="/" className="flex items-center gap-2.5" onClick={onCloseMobile}>
            <div className="flex items-center justify-center w-7 h-7 rounded bg-[#0A66C2] text-white font-bold text-sm shadow-sm">
              in
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-white">LinkedIn OS</span>
              <span className="text-[10px] text-slate-400 tracking-wide font-mono">2026 EDITION</span>
            </div>
          </Link>
        </div>

        {/* Navigation items */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          {renderNavGroup("Workspace", WORKSPACE_NAV)}
          {renderNavGroup("LinkedIn Tools", TOOLS_NAV)}
          {renderNavGroup("Strategy & Voice", STRATEGY_NAV)}
          {renderNavGroup("Settings", SETTINGS_NAV)}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-900/30">
          <div className="p-2.5 rounded-lg border border-slate-800/80 bg-[#0f1523]/80">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-slate-300">Publishing Tier</span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-[11px] text-slate-400 mb-2">
              Approve-first workflow active
            </p>
            <Link
              href="/settings/integrations"
              className="flex items-center gap-1 text-[11px] font-medium text-[#0A66C2] hover:underline"
            >
              <span>Manage API Keys</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
