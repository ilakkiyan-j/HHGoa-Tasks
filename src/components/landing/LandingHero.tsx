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
    <section className="relative overflow-hidden pt-6 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
      {/* Background Decorative Ambient Orbs */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-gradient-to-tr from-cyan-400/25 via-teal-300/20 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="w-[400px] h-[400px] bg-gradient-to-bl from-emerald-400/20 via-sky-300/15 to-transparent rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Top Event Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-cyan-300/70 text-cyan-900 text-xs font-mono mb-6 shadow-md shadow-cyan-500/10 backdrop-blur-md"
      >
        <Sparkles className="w-3.5 h-3.5 text-cyan-600 animate-spin-slow" />
        <span className="font-bold tracking-wider">HH GOA 2026 OFFICIAL TOOL</span>
        <span className="text-cyan-400">|</span>
        <span className="text-emerald-700 font-extrabold">#FrameInGoa</span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] max-w-4xl font-display"
      >
        FRAME YOUR BUILD.{' '}
        <span className="bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent block mt-1">
          TAKE IT TO GOA.
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-6 text-base sm:text-xl text-slate-700 max-w-2xl font-sans font-medium leading-relaxed"
      >
        Turn your photo into your official HH Goa 2026 builder identity in seconds.
        Generate branded profile frames and event-style builder ID cards.
      </motion.p>

      {/* No Login Subtext */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="mt-3 flex items-center justify-center gap-2 text-xs sm:text-sm font-mono text-slate-600 font-semibold"
      >
        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
        <span>No login. No signup. 100% Client-side.</span>
      </motion.div>

      {/* Upload Zone Card (Light Glassmorphism) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-8 sm:mt-10 w-full max-w-xl"
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
          className={`relative cursor-pointer group p-6 sm:p-10 rounded-3xl border-2 border-dashed transition-all duration-300 backdrop-blur-xl ${
            isDragging
              ? 'border-cyan-500 bg-cyan-50/90 shadow-2xl shadow-cyan-500/20 scale-[1.02]'
              : 'border-cyan-300/80 bg-white/90 hover:border-cyan-500 hover:bg-cyan-50/40 shadow-xl shadow-slate-200/60'
          }`}
        >
          {/* Ambient inner glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-cyan-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-6 space-y-4">
              <div className="w-12 h-12 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-cyan-800 font-mono text-sm font-bold animate-pulse">
                Processing your photo...
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* Icon Container */}
              <div className="w-16 h-16 rounded-2xl bg-cyan-100 border border-cyan-300 flex items-center justify-center text-cyan-700 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                <Upload className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-cyan-700 transition font-display">
                  Drop your photo here
                </h3>
                <p className="text-sm text-slate-600 mt-1 font-medium">
                  or <span className="text-cyan-700 font-bold underline underline-offset-4">choose from your device</span>
                </p>
              </div>

              {/* Supported Formats */}
              <div className="pt-2 flex items-center justify-center gap-2">
                {['JPG', 'PNG', 'HEIC', 'WEBP'].map((fmt) => (
                  <span
                    key={fmt}
                    className="text-[11px] font-mono font-bold px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700"
                  >
                    {fmt}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Error message toast */}
        {errorMessage && (
          <div className="mt-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono font-semibold flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={handleBrowseClick}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-white font-extrabold text-base tracking-wide shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
          >
            <span>Create My Frame</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
          </button>

          <button
            onClick={onTryDemo}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white border border-slate-300 text-slate-800 font-bold text-base hover:bg-slate-50 hover:border-cyan-400 transition flex items-center justify-center gap-2 group shadow-sm"
          >
            <Play className="w-4 h-4 text-cyan-600 fill-cyan-600 group-hover:scale-110 transition" />
            <span>Try Demo Photo</span>
          </button>
        </div>
      </motion.div>

      {/* Feature Pills */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl text-left"
      >
        <div className="p-4 rounded-2xl bg-white/80 border border-slate-200 shadow-sm backdrop-blur-sm flex items-start gap-3">
          <div className="p-2 rounded-xl bg-cyan-100 text-cyan-700 mt-0.5">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase font-mono">100% Local Privacy</h4>
            <p className="text-xs text-slate-600 mt-0.5 font-medium">Instant generation right inside your browser.</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/80 border border-slate-200 shadow-sm backdrop-blur-sm flex items-start gap-3">
          <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700 mt-0.5">
            <ImageIcon className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase font-mono">Dual Formats</h4>
            <p className="text-xs text-slate-600 mt-0.5 font-medium">Generate 1:1 PFP Frame or 4:5 Builder ID Card.</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/80 border border-slate-200 shadow-sm backdrop-blur-sm flex items-start gap-3">
          <div className="p-2 rounded-xl bg-purple-100 text-purple-700 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase font-mono">X Social Export</h4>
            <p className="text-xs text-slate-600 mt-0.5 font-medium">Download PNG and share to X with #FrameInGoa.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
