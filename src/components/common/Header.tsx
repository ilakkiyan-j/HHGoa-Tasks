'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, MapPin, Calendar } from 'lucide-react';

interface HeaderProps {
  onReset?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onReset }) => {

  return (
    <header className="w-full border-b border-cyan-200/60 bg-white/85 backdrop-blur-xl sticky top-0 z-50 shadow-sm shadow-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <Link
          href="/"
          onClick={onReset}
          className="flex items-center gap-2.5 sm:gap-3 group text-left transition hover:opacity-90 focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 p-[1.5px] shadow-md shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-600 group-hover:rotate-12 transition transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-base sm:text-lg tracking-tight text-slate-900 font-display">
                HH GOA 2026
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-100 border border-cyan-300 text-cyan-800 uppercase tracking-widest hidden sm:inline-block">
                Badge Builder
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 font-mono tracking-wider font-semibold">
              BUILD • SHIP • SHARE
            </p>
          </div>
        </Link>

        {/* Right Action Links */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/HHGoa-26/HHGoa-26-Task-01"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 border border-slate-200 transition flex items-center gap-1.5 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span className="hidden sm:inline">Source Code</span>
            <span className="sm:hidden">GitHub</span>
          </a>
        </div>

        {/* Location & Event Badge */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-4 text-xs font-mono font-semibold text-slate-600 bg-slate-100 border border-slate-200 rounded-full px-4 py-1.5 shadow-inner">
            <span className="flex items-center gap-1.5 text-cyan-700 font-bold">
              <MapPin className="w-3.5 h-3.5 text-cyan-600" /> GOA, INDIA
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" /> OCT 2026
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
