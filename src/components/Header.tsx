"use client";

import Link from "next/link";
import { Menu, PenSquare, Radio } from "lucide-react";

interface HeaderProps {
  onOpenMobileMenu: () => void;
  title?: string;
  badge?: string;
}

export function Header({ onOpenMobileMenu, title, badge }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-4 sm:px-6 border-b border-slate-800/80 bg-[#090d16]/90 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          aria-label="Open navigation menu"
          className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        {title && (
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-semibold text-white tracking-tight">{title}</h1>
            {badge && (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/50">
                {badge}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2.5">
        <Link
          href="/settings/integrations"
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-400 hover:text-slate-200 rounded border border-slate-800 hover:border-slate-700 transition-colors"
        >
          <Radio className="w-3.5 h-3.5 text-slate-400" />
          <span>Integrations</span>
        </Link>

        <Link
          href="/create"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#0A66C2] hover:bg-[#084e96] rounded-md shadow-sm transition-colors"
        >
          <PenSquare className="w-3.5 h-3.5" />
          <span>New Post</span>
        </Link>
      </div>
    </header>
  );
}
