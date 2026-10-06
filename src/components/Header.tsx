"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, Bell } from "lucide-react";

interface HeaderProps {
  onOpenMobileMenu: () => void;
  title?: string;
  badge?: string;
}

export function Header({ onOpenMobileMenu }: HeaderProps) {
  const pathname = usePathname();

  // Dynamic breadcrumb matching
  const getBreadcrumb = () => {
    if (pathname === "/") return "WORKSPACE / EXECUTIVE SUITE";
    if (pathname === "/create") return "TOOLS / POST WRITER";
    if (pathname === "/drafts") return "WORKSPACE / DRAFTS ARCHIVE";
    if (pathname === "/calendar") return "WORKSPACE / CONTENT CALENDAR";
    if (pathname === "/comments") return "TOOLS / COMMENT WRITER";
    if (pathname === "/analyzer") return "TOOLS / POST ANALYZER";
    if (pathname === "/profile") return "TOOLS / PROFILE OPTIMIZER";
    if (pathname === "/strategy") return "TOOLS / CONTENT STRATEGY";
    if (pathname === "/humanizer") return "TOOLS / HUMANIZER V3";
    if (pathname === "/hooks") return "TOOLS / HOOK GENERATOR";
    if (pathname.includes("/voice")) return "SETTINGS / YOUR VOICE";
    if (pathname.includes("/integrations")) return "SETTINGS / INTEGRATIONS";
    return "WORKSPACE / EXECUTIVE SUITE";
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-[60px] px-6 sm:px-8 border-b border-[#EAECF0] bg-white/95 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          aria-label="Open navigation menu"
          className="p-1.5 rounded-lg text-[#667085] hover:text-[#101828] hover:bg-[#F2F4F7] lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb matching Stitch design: WORKSPACE / EXECUTIVE SUITE */}
        <div className="text-[11px] font-mono font-medium tracking-wider text-[#475467] uppercase">
          {getBreadcrumb()}
        </div>
      </div>

      {/* Right navigation from Stitch screenshot: New Post, Active Queue, Schedule, Search, Bell, Avatar */}
      <div className="flex items-center gap-5 sm:gap-6">
        <nav className="hidden md:flex items-center gap-5 text-[13px] font-medium text-[#475467]">
          <Link
            href="/create"
            className="hover:text-[#101828] transition-colors"
          >
            New Post
          </Link>
          <Link
            href="/calendar"
            className="hover:text-[#101828] transition-colors"
          >
            Active Queue
          </Link>
          <Link
            href="/calendar"
            className="hover:text-[#101828] transition-colors"
          >
            Schedule
          </Link>
        </nav>

        <div className="flex items-center gap-2 pl-2 border-l border-[#EAECF0]">
          <button
            aria-label="Search posts and drafts"
            className="p-2 rounded-lg text-[#667085] hover:text-[#101828] hover:bg-[#F2F4F7] transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            aria-label="Notifications"
            className="p-2 rounded-lg text-[#667085] hover:text-[#101828] hover:bg-[#F2F4F7] transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#12B76A]" />
          </button>

          <Link href="/profile" className="ml-1 shrink-0">
            <div className="w-7 h-7 rounded-full bg-[#E0E7FF] border border-[#C7D2FE] flex items-center justify-center text-[#3730A3] font-semibold text-xs shadow-xs">
              ER
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}

