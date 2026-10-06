"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  SquarePen,
  FileText,
  Calendar,
  PenTool,
  MessageSquare,
  TrendingUp,
  UserCheck,
  Compass,
  Wand2,
  Zap,
  BarChart2,
  Mic,
  Share2,
  Settings,
  SlidersHorizontal,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: any;
  badge?: string;
}

const WORKSPACE_NAV: NavItem[] = [
  { title: "Dashboard", href: "/", icon: LayoutGrid },
  { title: "Create", href: "/create", icon: SquarePen },
  { title: "Drafts", href: "/drafts", icon: FileText },
  { title: "Content Calendar", href: "/calendar", icon: Calendar },
];

const TOOLS_NAV: NavItem[] = [
  { title: "Post Writer", href: "/create", icon: PenTool },
  { title: "Comment Writer", href: "/comments", icon: MessageSquare },
  { title: "Post Analyzer", href: "/analyzer", icon: TrendingUp },
  { title: "Profile Optimizer", href: "/profile", icon: UserCheck },
  { title: "Content Strategy", href: "/strategy", icon: Compass },
  { title: "Humanizer", href: "/humanizer", icon: Wand2 },
  { title: "Hook Generator", href: "/hooks", icon: Zap },
  { title: "Feed Analyzer", href: "/analyzer", icon: BarChart2 },
];

const SETTINGS_NAV: NavItem[] = [
  { title: "Your Voice", href: "/settings/voice", icon: Mic },
  { title: "Integrations", href: "/settings/integrations", icon: Share2 },
  { title: "Settings", href: "/settings/voice", icon: Settings },
];

export function Sidebar({ mobileOpen, onCloseMobile }: { mobileOpen?: boolean; onCloseMobile?: () => void }) {
  const pathname = usePathname();

  const renderNavGroup = (heading: string, items: NavItem[]) => (
    <div className="mb-5">
      <div className="px-3 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#667085]">
        {heading}
      </div>
      <div className="space-y-0.5">
        {items.map((item, idx) => {
          // Special active matching
          const isActive =
            pathname === item.href ||
            (item.href === "/create" && item.title === "Create" && pathname === "/create");
          const Icon = item.icon;

          return (
            <Link
              key={`${item.title}-${idx}`}
              href={item.href}
              onClick={onCloseMobile}
              className={`flex items-center justify-between px-3 py-2 text-[13px] rounded-lg transition-colors duration-150 ${
                isActive
                  ? "bg-[#EFF8FF] text-[#175CD3] font-semibold shadow-none"
                  : "text-[#344054] hover:text-[#101828] hover:bg-[#F2F4F7] font-medium"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? "text-[#175CD3]" : "text-[#667085]"
                  }`}
                />
                <span className="truncate">{item.title}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#EAECF0] text-[#344054]">
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
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col w-[240px] border-r border-[#EAECF0] bg-white transition-transform duration-200 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header: B. Postyy */}
        <div className="flex items-center justify-between h-[60px] px-4 border-b border-[#EAECF0]">
          <Link href="/" className="flex items-center gap-2.5" onClick={onCloseMobile}>
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#004EEB] text-white font-bold text-sm shadow-sm">
              B.
            </div>
            <span className="text-base font-bold tracking-tight text-[#101828]">
              Postyy
            </span>
          </Link>
        </div>

        {/* Navigation items */}
        <div className="flex-1 overflow-y-auto px-2.5 py-3">
          {renderNavGroup("WORKSPACE", WORKSPACE_NAV)}
          {renderNavGroup("TOOLS", TOOLS_NAV)}
          {renderNavGroup("SETTINGS", SETTINGS_NAV)}
        </div>

        {/* User Card in footer */}
        <div className="p-3 border-t border-[#EAECF0] bg-[#FAFAFA]">
          <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white transition-colors cursor-pointer border border-transparent hover:border-[#EAECF0]">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#E0E7FF] border border-[#C7D2FE] flex items-center justify-center text-[#3730A3] font-semibold text-xs shrink-0">
                ER
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-[#101828] truncate">
                  Elena Rostova
                </div>
                <div className="text-[11px] text-[#667085] truncate">
                  Pro Creator • Work...
                </div>
              </div>
            </div>
            <SlidersHorizontal className="w-4 h-4 text-[#98A2B3] shrink-0" />
          </div>
        </div>
      </aside>
    </>
  );
}

