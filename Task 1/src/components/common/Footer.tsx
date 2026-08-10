'use client';

import React from 'react';
import { ShieldCheck, Zap, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950/60 py-8 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
        {/* Left info */}
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Privacy First — Your photo never leaves your browser</span>
        </div>

        {/* Center Tagline */}
        <div className="flex items-center gap-1.5 text-slate-300">
          <span>HH GOA 2026</span>
          <span className="text-cyan-500">•</span>
          <span>FRAME IN GOA</span>
          <span className="text-cyan-500">•</span>
          <span className="flex items-center gap-1">
            Built with <Zap className="w-3 h-3 text-amber-400 fill-amber-400" /> for Builders
          </span>
        </div>

        {/* Right copyright/tag */}
        <div className="text-slate-500">
          No Login Required • Fast Canvas Compositing
        </div>
      </div>
    </footer>
  );
};
