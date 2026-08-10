'use client';

import React from 'react';
import { ShieldCheck, Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-cyan-200/60 bg-white/70 backdrop-blur-md py-6 px-4 sm:px-6 lg:px-8 mt-auto shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-600 font-mono">
        {/* Left info */}
        <div className="flex items-center gap-2 font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Privacy First — Canvas image processing runs 100% locally in your browser</span>
        </div>

        {/* Center Tagline */}
        <div className="flex items-center gap-1.5 text-slate-700 font-bold">
          <span>HH GOA 2026</span>
          <span className="text-cyan-600">•</span>
          <span>FRAME IN GOA</span>
          <span className="text-cyan-600">•</span>
          <span className="flex items-center gap-1">
            Built with <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> for Builders
          </span>
        </div>

        {/* Right tag */}
        <div className="text-slate-500 font-medium">
          Zero Server Uploads • Instant Download
        </div>
      </div>
    </footer>
  );
};
