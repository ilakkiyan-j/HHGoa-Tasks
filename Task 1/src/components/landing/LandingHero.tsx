'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Sparkles, Image as ImageIcon, ArrowRight, Zap, Play, CheckCircle2, AlertCircle } from 'lucide-react';
import { processImageFile } from '@/lib/image/imageProcessor';
import { UserImageData } from '@/types/frame';

interface LandingHeroProps {
  onImageSelected: (imageData: UserImageData) => void;
  onTryDemo: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onImageSelected, onTryDemo }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = async (file: File) => {
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const processed = await processImageFile(file);
      onImageSelected({
        file,
        dataUrl: processed.dataUrl,
        width: processed.width,
        height: processed.height,
        zoom: 1,
        panX: 0,
        panY: 0,
        rotation: 0,
      });
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        err.message || "That image format isn't supported yet. Try JPG, PNG or HEIC."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
      {/* Background Decorative Grids & Glows */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/20 via-teal-500/10 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="w-[400px] h-[400px] bg-gradient-to-bl from-emerald-500/15 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Top Event Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300 text-xs font-mono mb-6 shadow-lg shadow-cyan-900/20 backdrop-blur-md"
      >
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
        <span className="font-semibold tracking-wider">HH GOA 2026 OFFICIAL TOOL</span>
        <span className="text-cyan-500/60">|</span>
        <span className="text-emerald-400 font-bold">#FrameInGoa</span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl"
      >
        FRAME YOUR BUILD.{' '}
        <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent block mt-1">
          TAKE IT TO GOA.
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl font-sans font-normal leading-relaxed"
      >
        Turn your photo into your HH Goa 2026 builder identity in seconds.
        Generate branded profile frames and event-style builder ID cards.
      </motion.p>

      {/* No Login Subtext */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="mt-3 flex items-center justify-center gap-2 text-xs font-mono text-slate-400"
      >
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
        <span>No login. No signup. Just build.</span>
      </motion.div>

      {/* Upload Zone Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-10 w-full max-w-xl"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/heic,image/heif,image/webp"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) handleFileChange(e.target.files[0]);
          }}
        />

        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={handleBrowseClick}
          className={`relative cursor-pointer group p-8 sm:p-10 rounded-3xl border-2 border-dashed transition-all duration-300 backdrop-blur-2xl ${
            isDragging
              ? 'border-cyan-400 bg-cyan-950/40 shadow-2xl shadow-cyan-500/30 scale-[1.02]'
              : 'border-slate-700/80 bg-slate-900/60 hover:border-cyan-400/70 hover:bg-slate-900/90 shadow-xl'
          }`}
        >
          {/* Subtle Glow inside dropzone */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-cyan-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-6 space-y-4">
              <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-cyan-300 font-mono text-sm font-semibold animate-pulse">
                Processing your photo...
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* Icon Container */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-cyan-400/20 transition-all duration-300">
                <Upload className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition">
                  Drop your photo here
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  or <span className="text-cyan-400 font-semibold underline underline-offset-4">choose from your device</span>
                </p>
              </div>

              {/* Supported Formats */}
              <div className="pt-2 flex items-center justify-center gap-2">
                <span className="text-[11px] font-mono px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300">
                  JPG
                </span>
                <span className="text-[11px] font-mono px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300">
                  PNG
                </span>
                <span className="text-[11px] font-mono px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300">
                  HEIC
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Error message toast */}
        {errorMessage && (
          <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Action Buttons: Primary & Try Demo */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleBrowseClick}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 text-slate-950 font-extrabold text-base tracking-wide hover:shadow-xl hover:shadow-cyan-400/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
          >
            <span>Create My Frame</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
          </button>

          <button
            onClick={onTryDemo}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900/90 border border-slate-700 text-slate-200 font-bold text-base hover:bg-slate-800 hover:border-cyan-400/50 hover:text-white transition flex items-center justify-center gap-2 group shadow-lg"
          >
            <Play className="w-4 h-4 text-cyan-400 fill-cyan-400 group-hover:scale-110 transition" />
            <span>Try Demo</span>
          </button>
        </div>
      </motion.div>

      {/* Feature Pills */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl text-left"
      >
        <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm flex items-start gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 mt-0.5">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase font-mono">100% Client-side</h4>
            <p className="text-xs text-slate-400 mt-0.5">Instant 1-second generation right inside your browser.</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm flex items-start gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 mt-0.5">
            <ImageIcon className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase font-mono">Dual Formats</h4>
            <p className="text-xs text-slate-400 mt-0.5">Generate 1:1 PFP Frame or 4:5 Builder ID Card.</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm flex items-start gap-3">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase font-mono">X Social Ready</h4>
            <p className="text-xs text-slate-400 mt-0.5">Download PNG and share to X with #FrameInGoa.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
