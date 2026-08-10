'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, MapPin, Calendar, LayoutGrid, Image as ImageIcon } from 'lucide-react';

interface HeaderProps {
  onReset?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onReset }) => {
  const pathname = usePathname();

  return (
    <header className="w-full border-b border-cyan-500/20 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <Link
          href="/"
          onClick={onReset}
          className="flex items-center gap-3 group text-left transition hover:opacity-90 focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 via-teal-500 to-emerald-400 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/40 transition">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                HH GOA 2026
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 uppercase tracking-widest hidden sm:inline-block">
                Tasks Hub
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono tracking-wider">
              BUILD • SHIP • SHARE
            </p>
          </div>
        </Link>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition flex items-center gap-1.5 ${
              pathname === '/'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Tasks Hub</span>
          </Link>

          <Link
            href="/task-1"
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition flex items-center gap-1.5 ${
              pathname === '/task-1'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Task 1: Badge Builder</span>
          </Link>
        </nav>

        {/* Location & Event Badge */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-4 text-xs font-mono text-slate-300 bg-slate-900/60 border border-slate-800 rounded-full px-4 py-1.5">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <MapPin className="w-3.5 h-3.5" /> GOA, INDIA
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Calendar className="w-3.5 h-3.5" /> OCT 2026
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
