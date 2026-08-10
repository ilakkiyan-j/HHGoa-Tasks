'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import {
  Sparkles,
  ArrowRight,
  Code2,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Palette,
  Share2,
} from 'lucide-react';

export default function MainPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#07090e] bg-cyber-grid text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
        {/* Hero Section */}
        <section className="relative text-center space-y-6 overflow-hidden">
          {/* Ambient Glow Orbs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-1/3 left-1/3 w-[300px] h-[200px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 space-y-6"
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-mono shadow-lg shadow-cyan-500/10">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>HACKER HOUSE GOA 2026</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span className="text-slate-400">Task 1 Portal</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-[1.15]">
              <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                Profile Frame & Badge
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
                Generator
              </span>
            </h1>

            {/* Description */}
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto font-sans leading-relaxed">
              Official interactive tool for Hacker House Goa 2026 builders. Customize, frame, and export high-resolution social avatars and banner graphics.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/task-1"
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 font-bold text-slate-950 text-base shadow-xl shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:scale-[1.02] active:scale-[0.98] transition duration-200"
              >
                <Sparkles className="w-5 h-5 text-slate-950 group-hover:rotate-12 transition transform" />
                <span>Open Task 1 App</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition transform" />
              </Link>

              <a
                href="https://github.com/ilakkiyan-j/HHGoa-Tasks"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition font-mono text-sm"
              >
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>View Source Code</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>
            </div>
          </motion.div>
        </section>

        {/* Task 1 Featured Project Card */}
        <section className="py-12">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-cyan-500/40 shadow-2xl shadow-cyan-500/10 hover:border-cyan-400 transition duration-300"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 flex items-center justify-center">
                  <Palette className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
                      Task 1
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Live
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
                    Profile Badge Generator
                  </h2>
                </div>
              </div>

              <Link
                href="/task-1"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 font-bold text-sm transition group-hover:shadow-lg group-hover:shadow-cyan-500/20"
              >
                <span>Launch App</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition transform" />
              </Link>
            </div>

            <div className="py-6 space-y-4">
              <p className="text-slate-300 text-base leading-relaxed">
                An interactive HTML5 Canvas application built for Hacker House Goa 2026. Custom photo positioning, preset overlay frames, custom role builder titles, high-resolution PNG export, and social sharing.
              </p>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <ShieldCheck className="w-5 h-5 text-cyan-400 mb-2" />
                  <h4 className="font-bold text-white text-sm">Interactive Editor</h4>
                  <p className="text-xs text-slate-400 mt-1">Drag, zoom, pan, and rotate photo positioning.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <Palette className="w-5 h-5 text-teal-400 mb-2" />
                  <h4 className="font-bold text-white text-sm">Badge Presets</h4>
                  <p className="text-xs text-slate-400 mt-1">Profile pictures and banner format presets.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <Share2 className="w-5 h-5 text-emerald-400 mb-2" />
                  <h4 className="font-bold text-white text-sm">Instant Export</h4>
                  <p className="text-xs text-slate-400 mt-1">Export high-res PNG or share via Web Share API.</p>
                </div>
              </div>
            </div>

            {/* Tech Stack Footer */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-mono text-slate-400">Tech Stack:</span>
              <div className="flex flex-wrap gap-2">
                {['Next.js 16', 'HTML5 Canvas', 'Framer Motion', 'TypeScript', 'Tailwind CSS v4'].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-slate-800 text-xs font-mono text-cyan-300 border border-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
