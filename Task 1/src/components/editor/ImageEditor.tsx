'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ZoomIn,
  Move,
  RotateCw,
  RefreshCw,
  Sparkles,
  CreditCard,
  UserCheck,
  Palette,
  ArrowRight,
  Upload,
  Layers,
  Wand2,
} from 'lucide-react';
import { FrameFormat, UserImageData, BuilderDetails, ThemeVariant } from '@/types/frame';
import { generateBuilderTitle } from '@/lib/titles/builderTitles';
import { generatePfpFrame, generateBuilderCard, THEMES } from '@/lib/canvas/canvasEngine';
import { processImageFile } from '@/lib/image/imageProcessor';

interface ImageEditorProps {
  imageData: UserImageData;
  onUpdateImage: (newImageData: UserImageData) => void;
  onGenerateComplete: (resultDataUrl: string, format: FrameFormat, details: BuilderDetails) => void;
  onUploadNew: () => void;
}

export const ImageEditor: React.FC<ImageEditorProps> = ({
  imageData,
  onUpdateImage,
  onGenerateComplete,
  onUploadNew,
}) => {
  const [format, setFormat] = useState<FrameFormat>('pfp');
  const [themeVariant, setThemeVariant] = useState<ThemeVariant>('neon-goa');

  // Builder Card details state
  const [details, setDetails] = useState<BuilderDetails>({
    name: 'Ilakkiyan',
    roleStack: 'Full-Stack AI Engineer',
    builderTitle: 'THE AI BUILDER',
  });

  const [titleSeed, setTitleSeed] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [livePreviewUrl, setLivePreviewUrl] = useState<string>('');

  const changeFileInputRef = useRef<HTMLInputElement>(null);

  // Auto-generate title whenever role/stack or titleSeed changes
  useEffect(() => {
    const generated = generateBuilderTitle(details.roleStack, titleSeed);
    setDetails((prev) => ({ ...prev, builderTitle: generated }));
  }, [details.roleStack, titleSeed]);

  // Update live preview canvas whenever image, format, details or theme change
  useEffect(() => {
    let isCancelled = false;

    const renderPreview = async () => {
      try {
        let url = '';
        if (format === 'pfp') {
          url = await generatePfpFrame(imageData, themeVariant);
        } else {
          url = await generateBuilderCard(imageData, details, themeVariant);
        }

        if (!isCancelled) {
          setLivePreviewUrl(url);
        }
      } catch (err) {
        console.error('Failed to render live preview:', err);
      }
    };

    renderPreview();

    return () => {
      isCancelled = true;
    };
  }, [imageData, format, details, themeVariant]);

  const handleShuffleTitle = () => {
    setTitleSeed((prev) => prev + 1);
  };

  const handleRotate = () => {
    const nextRotation = (imageData.rotation + 90) % 360;
    onUpdateImage({ ...imageData, rotation: nextRotation });
  };

  const handleFileReplace = async (file: File) => {
    try {
      const processed = await processImageFile(file);
      onUpdateImage({
        ...imageData,
        file,
        dataUrl: processed.dataUrl,
        width: processed.width,
        height: processed.height,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleFinalGenerate = async () => {
    setIsGenerating(true);
    try {
      let finalUrl = '';
      if (format === 'pfp') {
        finalUrl = await generatePfpFrame(imageData, themeVariant);
      } else {
        finalUrl = await generateBuilderCard(imageData, details, themeVariant);
      }
      onGenerateComplete(finalUrl, format, details);
    } catch (err) {
      console.error('Generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <input
        ref={changeFileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/heic,image/heif,image/webp"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) handleFileReplace(e.target.files[0]);
        }}
      />

      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>CUSTOMIZE YOUR BUILDER IDENTITY</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-mono">
            Adjust position, select your format, and enter your builder stack details.
          </p>
        </div>

        <button
          onClick={() => changeFileInputRef.current?.click()}
          className="self-start md:self-auto px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-mono font-semibold hover:border-cyan-400 hover:text-white transition flex items-center gap-2"
        >
          <Upload className="w-3.5 h-3.5 text-cyan-400" />
          <span>Change Photo</span>
        </button>
      </div>

      {/* Format Selection Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {/* Format A: PFP Frame */}
        <button
          onClick={() => setFormat('pfp')}
          className={`relative p-5 rounded-2xl border text-left transition-all duration-300 flex items-start gap-4 ${
            format === 'pfp'
              ? 'bg-slate-900/90 border-cyan-400 shadow-xl shadow-cyan-500/10 ring-1 ring-cyan-400/50'
              : 'bg-slate-950/60 border-slate-800/80 opacity-70 hover:opacity-100 hover:border-slate-700'
          }`}
        >
          <div
            className={`p-3 rounded-xl ${
              format === 'pfp' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'
            }`}
          >
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base text-white">FORMAT A — PFP FRAME</span>
              {format === 'pfp' && (
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 uppercase">
                  Selected
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Square 1:1 branded profile-picture frame for Twitter/X, Discord, and LinkedIn.
            </p>
          </div>
        </button>

        {/* Format B: Builder ID Card */}
        <button
          onClick={() => setFormat('idcard')}
          className={`relative p-5 rounded-2xl border text-left transition-all duration-300 flex items-start gap-4 ${
            format === 'idcard'
              ? 'bg-slate-900/90 border-emerald-400 shadow-xl shadow-emerald-500/10 ring-1 ring-emerald-400/50'
              : 'bg-slate-950/60 border-slate-800/80 opacity-70 hover:opacity-100 hover:border-slate-700'
          }`}
        >
          <div
            className={`p-3 rounded-xl ${
              format === 'idcard' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
            }`}
          >
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base text-white">FORMAT B — BUILDER ID CARD</span>
              {format === 'idcard' && (
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 uppercase">
                  Selected
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              4:5 social media event pass featuring your stack & auto-generated Builder Title.
            </p>
          </div>
        </button>
      </div>

      {/* Main Grid: Controls Left, Live Preview Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Theme Variant Picker */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl">
            <h3 className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider flex items-center gap-2 mb-3">
              <Palette className="w-4 h-4 text-cyan-400" />
              <span>Theme Style Variant</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {(Object.keys(THEMES) as ThemeVariant[]).map((key) => {
                const t = THEMES[key];
                return (
                  <button
                    key={key}
                    onClick={() => setThemeVariant(key)}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition ${
                      themeVariant === key
                        ? 'border-cyan-400 bg-slate-800 text-white shadow-md'
                        : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: t.primaryColor }}
                    />
                    <span className="truncate">{t.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Image Adjustments (Zoom, Pan, Rotate) */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider flex items-center gap-2">
                <ZoomIn className="w-4 h-4 text-cyan-400" />
                <span>Photo Framing Controls</span>
              </h3>
              <button
                onClick={handleRotate}
                className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-300 font-mono flex items-center gap-1.5 hover:text-white transition"
              >
                <RotateCw className="w-3 h-3 text-cyan-400" />
                <span>Rotate 90°</span>
              </button>
            </div>

            {/* Zoom Slider */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 font-mono mb-1.5">
                <span>Zoom Scale</span>
                <span className="text-cyan-400">{Math.round(imageData.zoom * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.05"
                value={imageData.zoom}
                onChange={(e) => onUpdateImage({ ...imageData, zoom: parseFloat(e.target.value) })}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Pan X Slider */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 font-mono mb-1.5">
                <span className="flex items-center gap-1">
                  <Move className="w-3 h-3 text-cyan-400" /> Position X (Left / Right)
                </span>
                <span className="text-cyan-400">{imageData.panX}%</span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                step="1"
                value={imageData.panX}
                onChange={(e) => onUpdateImage({ ...imageData, panX: parseInt(e.target.value, 10) })}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Pan Y Slider */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 font-mono mb-1.5">
                <span className="flex items-center gap-1">
                  <Move className="w-3 h-3 text-cyan-400 rotate-90" /> Position Y (Up / Down)
                </span>
                <span className="text-cyan-400">{imageData.panY}%</span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                step="1"
                value={imageData.panY}
                onChange={(e) => onUpdateImage({ ...imageData, panY: parseInt(e.target.value, 10) })}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
          </div>

          {/* Builder Details Input Form (Always visible for ID Card, or customizable) */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Builder Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 font-mono mb-1">Your Name</label>
                <input
                  type="text"
                  value={details.name}
                  onChange={(e) => setDetails({ ...details, name: e.target.value })}
                  placeholder="e.g. Ilakkiyan"
                  maxLength={24}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-cyan-400 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 font-mono mb-1">Role / Stack</label>
                <input
                  type="text"
                  value={details.roleStack}
                  onChange={(e) => setDetails({ ...details, roleStack: e.target.value })}
                  placeholder="e.g. Full-Stack AI Engineer"
                  maxLength={32}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-cyan-400 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Generated Builder Title Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs text-slate-400 font-mono flex items-center gap-1">
                  <Wand2 className="w-3 h-3 text-cyan-400" /> Auto-Generated Builder Title
                </label>
                <button
                  type="button"
                  onClick={handleShuffleTitle}
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 font-mono font-semibold flex items-center gap-1 transition"
                >
                  <RefreshCw className="w-3 h-3" /> Regenerate
                </button>
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={details.builderTitle}
                  onChange={(e) => setDetails({ ...details, builderTitle: e.target.value })}
                  placeholder="THE SYSTEM ARCHITECT"
                  maxLength={36}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cyan-950/30 border border-cyan-500/40 text-cyan-300 font-extrabold font-mono text-sm tracking-wider uppercase focus:border-cyan-400 focus:outline-none transition"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1 font-mono">
                Automatically keyed from your stack. Click Regenerate or edit manually.
              </p>
            </div>
          </div>

          {/* Primary Action CTA */}
          <button
            onClick={handleFinalGenerate}
            disabled={isGenerating}
            className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 text-slate-950 font-extrabold text-lg tracking-wide hover:shadow-2xl hover:shadow-cyan-400/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {isGenerating ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-3 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Generating High-Res Graphic...</span>
              </div>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generate {format === 'pfp' ? 'PFP Frame' : 'Builder ID Card'}</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

        {/* Live Preview Column */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="p-4 sm:p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-2xl text-center space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>LIVE CANVAS PREVIEW</span>
              </span>
              <span className="text-slate-500">{format === 'pfp' ? '1080 × 1080' : '1080 × 1350'}</span>
            </div>

            {/* Preview Image Render Box */}
            <div className="relative mx-auto rounded-2xl overflow-hidden border border-cyan-500/30 bg-slate-950 shadow-inner group">
              {livePreviewUrl ? (
                /* eslint-disable-next-html-element-suppress */
                <img
                  src={livePreviewUrl}
                  alt="Live Generated Frame Preview"
                  className="w-full h-auto object-contain max-h-[520px] rounded-2xl transition duration-300"
                />
              ) : (
                <div className="w-full aspect-square flex flex-col items-center justify-center text-slate-500 font-mono text-xs space-y-2">
                  <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                  <span>Rendering canvas preview...</span>
                </div>
              )}
            </div>

            <p className="text-[11px] text-slate-500 font-mono">
              Live composite preview updates instantly as you adjust controls.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
