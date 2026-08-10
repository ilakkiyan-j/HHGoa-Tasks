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
  Clock,
  Layers,
  Zap,
  ExternalLink,
  ShieldCheck,
  Palette,
  Share2,
} from 'lucide-react';

export default function MainPage() {
  const tasks = [
    {
      id: 'task-1',
      title: 'Task 1: Profile Frame & Badge Generator',
      subtitle: 'HH Goa 2026 Official Avatar Builder',
      description:
        'Interactive HTML5 Canvas engine for customizing, framing, and generating high-res profile badges and banner graphics for Hacker House Goa 2026 builders.',
      href: '/task-1',
      status: 'Live & Active',
      statusColor: 'emerald',
      tags: ['Next.js 16', 'Canvas API', 'Framer Motion', 'TypeScript', 'Tailwind CSS v4'],
      features: [
        'Custom photo drag, zoom, pan, and rotation',
        'Multiple frame presets & custom role builder titles',
        'Instant high-res PNG download & Web Share API',
      ],
      icon: Palette,
      badge: 'Task 1 Completed',
    },
    {
      id: 'task-2',
      title: 'Task 2: Intelligent Workflow Engine',
      subtitle: 'Automated Developer Agent Dashboard',
      description:
        'Next-generation automated workflow engine for hackathon submissions, real-time status monitoring, and hacker collaboration.',
      href: '#',
      status: 'Upcoming / In Development',
      statusColor: 'amber',
      tags: ['AI Agents', 'State Engine', 'React 19', 'WebSockets'],
      features: [
        'Real-time task execution logs',
        'Automated code verification & lint checks',
        'Peer feedback & review portal',
      ],
      icon: Layers,
      badge: 'Task 2 Next',
    },
    {
      id: 'task-3',
      title: 'Task 3: Hacker Showcase & Leaderboard',
      subtitle: 'Community Project Submission Hub',
      description:
        'Real-time community project gallery, interactive voting leaderboard, and peer networking hub for HH Goa 2026 participants.',
      href: '#',
      status: 'Planned',
      statusColor: 'cyan',
      tags: ['Community Hub', 'Leaderboard', 'Realtime DB'],
      features: [
        'Project demo showcase & video embedding',
        'Community voting & peer leaderboard',
        'Interactive hacker profile directory',
      ],
      icon: Zap,
      badge: 'Task 3 Planned',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#07090e] bg-cyber-grid text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Hero Section */}
        <section className="relative text-center py-12 sm:py-16 overflow-hidden">
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
              <span>HH GOA 2026 OFFICIAL TASKS PORTAL</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span className="text-slate-400">1 Task Live</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-[1.15]">
              <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                Hacker House Goa 2026
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
                Engineering Tasks & Projects
              </span>
            </h1>

            {/* Description */}
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto font-sans leading-relaxed">
              Explore official interactive web tools, avatar builders, and engineering assignments
              built for the Hacker House Goa 2026 community.
            </p>

            {/* CTA Button pointing directly to Task 1 */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/task-1"
                className="group relative inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 font-semibold text-slate-950 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:scale-[1.02] active:scale-[0.98] transition duration-200"
              >
                <Sparkles className="w-5 h-5 text-slate-950 group-hover:rotate-12 transition transform" />
                <span>Launch Task 1: Profile Badge Generator</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition transform" />
              </Link>

              <a
                href="https://github.com/ilakkiyan-j/HHGoa-Tasks"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition font-mono text-sm"
              >
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>View GitHub Repository</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>
            </div>
          </motion.div>
        </section>

        {/* Tasks Directory Grid */}
        <section className="py-12 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Layers className="w-6 h-6 text-cyan-400" />
                <span>Tasks & Assignments Directory</span>
              </h2>
              <p className="text-sm text-slate-400 font-mono">
                Click any active task to launch its interactive experience
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Production Deployment: Ready</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tasks.map((task, idx) => {
              const IconComp = task.icon;
              const isLive = task.id === 'task-1';

              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className={`group relative rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between ${
                    isLive
                      ? 'bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-cyan-500/40 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/20'
                      : 'bg-slate-900/40 border border-slate-800/80 opacity-80 hover:opacity-100'
                  }`}
                >
                  {/* Card Header & Badge */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          isLive
                            ? 'bg-cyan-500/10 border border-cyan-400/30 text-cyan-400'
                            : 'bg-slate-800 border border-slate-700 text-slate-400'
                        }`}
                      >
                        <IconComp className="w-6 h-6" />
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-mono font-semibold flex items-center gap-1.5 ${
                          isLive
                            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                            : task.statusColor === 'amber'
                            ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
                            : 'bg-slate-800 border border-slate-700 text-slate-400'
                        }`}
                      >
                        {isLive ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Clock className="w-3.5 h-3.5" />
                        )}
                        <span>{task.status}</span>
                      </span>
                    </div>

                    {/* Titles */}
                    <div>
                      <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                        {task.badge}
                      </span>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition mt-1">
                        {task.title}
                      </h3>
                      <p className="text-xs font-mono text-slate-400 mt-1">{task.subtitle}</p>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed">{task.description}</p>

                    {/* Features List */}
                    <div className="space-y-2 pt-2">
                      <p className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
                        Key Features:
                      </p>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {task.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <span className="text-cyan-400 mt-0.5">•</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {task.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-slate-800/80 text-[10px] font-mono text-slate-300 border border-slate-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-6">
                    {isLive ? (
                      <Link
                        href="/task-1"
                        className="w-full py-3 px-4 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 font-semibold text-sm flex items-center justify-center gap-2 transition group-hover:shadow-lg group-hover:shadow-cyan-500/20"
                      >
                        <span>Launch Task 1 App</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition transform" />
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="w-full py-3 px-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-500 font-mono text-xs cursor-not-allowed text-center"
                      >
                        Upcoming Task
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Feature Highlights Banner */}
        <section className="mt-12 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Production Tested</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Strict TypeScript verification, zero lint errors, and Turbopack builds.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400">
                <Palette className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">HTML5 Canvas Engine</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Pixel-perfect high-res canvas rendering with custom avatars and builder titles.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <Share2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Instant Social Export</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Download PNG frames or share directly via Web Share API to Twitter / X & LinkedIn.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
