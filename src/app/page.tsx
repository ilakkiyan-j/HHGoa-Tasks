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
    <div className="min-h-screen flex flex-col justify-between bg-[#f8fafc] bg-cyber-grid text-slate-900 selection:bg-cyan-500 selection:text-white font-sans">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        {/* Hero Section */}
        <section className="relative text-center space-y-6 overflow-hidden">
          {/* Ambient Glow Orbs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-400/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-1/3 left-1/3 w-[300px] h-[200px] bg-emerald-300/20 rounded-full blur-[100px] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 space-y-6"
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-cyan-300 text-cyan-900 text-xs font-mono font-bold shadow-md shadow-cyan-500/10">
              <Sparkles className="w-4 h-4 text-cyan-600 animate-pulse" />
              <span>HACKER HOUSE GOA 2026</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-600"></span>
              <span className="text-emerald-700">Task 1 Portal</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-[1.15] font-display text-slate-900">
              Profile Frame & Badge
              <br />
              <span className="bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
                Generator
              </span>
            </h1>

            {/* Description */}
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-sans font-medium leading-relaxed">
              Official interactive tool for Hacker House Goa 2026 builders. Customize, frame, and export high-resolution social avatars and banner graphics.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
              <Link
                href="/task-1"
                className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 font-extrabold text-white text-base shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition duration-200"
              >
                <Sparkles className="w-5 h-5 text-white group-hover:rotate-12 transition transform" />
                <span>Open Task 1 App</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition transform" />
              </Link>

              <a
                href="https://github.com/ilakkiyan-j/HHGoa-Tasks"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white border border-slate-300 text-slate-800 hover:text-slate-900 hover:bg-slate-50 transition font-mono text-sm font-bold shadow-sm"
              >
                <Code2 className="w-4 h-4 text-cyan-600" />
                <span>View Source Code</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </motion.div>
        </section>

        {/* Task 1 Featured Project Card */}
        <section className="py-10 sm:py-12">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative rounded-3xl p-6 sm:p-10 bg-white/90 border border-cyan-200/80 shadow-2xl shadow-slate-200/80 hover:border-cyan-400 transition duration-300 backdrop-blur-xl"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-cyan-100 border border-cyan-300 text-cyan-700 flex items-center justify-center flex-shrink-0">
                  <Palette className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-700 uppercase tracking-widest">
                      Task 1
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Live
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5 font-display">
                    Profile Badge Generator
                  </h2>
                </div>
              </div>

              <Link
                href="/task-1"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-50 hover:bg-cyan-100 border border-cyan-300 text-cyan-800 font-extrabold text-sm transition group-hover:shadow-md"
              >
                <span>Launch App</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition transform" />
              </Link>
            </div>

            <div className="py-6 space-y-4">
              <p className="text-slate-700 text-base leading-relaxed font-medium">
                An interactive HTML5 Canvas application built for Hacker House Goa 2026. Custom photo positioning, preset overlay frames, custom role builder titles, high-resolution PNG export, and social sharing.
              </p>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <ShieldCheck className="w-5 h-5 text-cyan-600 mb-2" />
                  <h4 className="font-bold text-slate-900 text-sm">Interactive Editor</h4>
                  <p className="text-xs text-slate-600 mt-1 font-medium">Drag, zoom, pan, and rotate photo positioning.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <Palette className="w-5 h-5 text-teal-600 mb-2" />
                  <h4 className="font-bold text-slate-900 text-sm">Badge Presets</h4>
                  <p className="text-xs text-slate-600 mt-1 font-medium">Profile pictures and banner format presets.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <Share2 className="w-5 h-5 text-emerald-600 mb-2" />
                  <h4 className="font-bold text-slate-900 text-sm">Instant Export</h4>
                  <p className="text-xs text-slate-600 mt-1 font-medium">Export high-res PNG or share via Web Share API.</p>
                </div>
              </div>
            </div>

            {/* Tech Stack Footer */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-mono font-bold text-slate-500">Tech Stack:</span>
              <div className="flex flex-wrap gap-2">
                {['Next.js 16', 'HTML5 Canvas', 'Framer Motion', 'TypeScript', 'Tailwind CSS v4'].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-slate-100 text-xs font-mono font-bold text-cyan-800 border border-slate-200"
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
