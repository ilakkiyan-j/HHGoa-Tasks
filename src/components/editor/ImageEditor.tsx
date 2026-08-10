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
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2 font-display">
            <span>CUSTOMIZE YOUR IDENTITY</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-mono font-medium">
            Adjust position, select your format, and enter your builder stack details.
          </p>
        </div>

        <button
          onClick={() => changeFileInputRef.current?.click()}
          className="self-start md:self-auto px-4 py-2 rounded-xl bg-white border border-cyan-300 text-cyan-900 text-xs font-mono font-bold hover:bg-cyan-50 shadow-sm transition flex items-center gap-2"
        >
          <Upload className="w-3.5 h-3.5 text-cyan-600" />
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
              ? 'bg-white border-cyan-500 shadow-xl shadow-cyan-500/15 ring-2 ring-cyan-500/20'
              : 'bg-white/70 border-slate-200 opacity-80 hover:opacity-100 hover:border-slate-300'
          }`}
        >
          <div
            className={`p-3 rounded-xl ${
              format === 'pfp' ? 'bg-cyan-100 text-cyan-700' : 'bg-slate-100 text-slate-500'
            }`}
          >
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-base text-slate-900 font-display">FORMAT A — PFP FRAME</span>
              {format === 'pfp' && (
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-100 border border-cyan-300 text-cyan-800 uppercase">
                  Selected
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
              Square 1:1 branded profile-picture frame for Twitter/X, Discord, and LinkedIn.
            </p>
          </div>
        </button>

        {/* Format B: Builder ID Card */}
        <button
          onClick={() => setFormat('idcard')}
          className={`relative p-5 rounded-2xl border text-left transition-all duration-300 flex items-start gap-4 ${
            format === 'idcard'
              ? 'bg-white border-emerald-500 shadow-xl shadow-emerald-500/15 ring-2 ring-emerald-500/20'
              : 'bg-white/70 border-slate-200 opacity-80 hover:opacity-100 hover:border-slate-300'
          }`}
        >
          <div
            className={`p-3 rounded-xl ${
              format === 'idcard' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
            }`}
          >
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-base text-slate-900 font-display">FORMAT B — BUILDER ID CARD</span>
              {format === 'idcard' && (
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 uppercase">
                  Selected
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
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
          <div className="p-5 rounded-2xl bg-white/90 border border-cyan-200/60 shadow-lg shadow-slate-200/50 backdrop-blur-xl">
            <h3 className="text-xs font-mono font-bold uppercase text-slate-600 tracking-wider flex items-center gap-2 mb-3">
              <Palette className="w-4 h-4 text-cyan-600" />
              <span>Theme Style Variant</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {(Object.keys(THEMES) as ThemeVariant[]).map((key) => {
                const t = THEMES[key];
                return (
                  <button
                    key={key}
                    onClick={() => setThemeVariant(key)}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition ${
                      themeVariant === key
                        ? 'border-cyan-500 bg-cyan-50/80 text-cyan-900 shadow-sm'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full flex-shrink-0 border border-slate-300"
                      style={{ backgroundColor: t.primaryColor }}
                    />
                    <span className="truncate">{t.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Image Adjustments (Zoom, Pan, Rotate) */}
          <div className="p-5 rounded-2xl bg-white/90 border border-cyan-200/60 shadow-lg shadow-slate-200/50 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold uppercase text-slate-600 tracking-wider flex items-center gap-2">
                <ZoomIn className="w-4 h-4 text-cyan-600" />
                <span>Photo Framing Controls</span>
              </h3>
              <button
                onClick={handleRotate}
                className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-300 text-xs text-slate-800 font-mono font-bold flex items-center gap-1.5 hover:bg-slate-200 transition shadow-sm"
              >
                <RotateCw className="w-3.5 h-3.5 text-cyan-600" />
                <span>Rotate 90°</span>
              </button>
            </div>

            {/* Zoom Slider */}
            <div>
              <div className="flex justify-between text-xs text-slate-700 font-mono font-semibold mb-1.5">
                <span>Zoom Scale</span>
                <span className="text-cyan-700 font-bold">{Math.round(imageData.zoom * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.05"
                value={imageData.zoom}
                onChange={(e) => onUpdateImage({ ...imageData, zoom: parseFloat(e.target.value) })}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
              />
            </div>

            {/* Pan X Slider */}
            <div>
              <div className="flex justify-between text-xs text-slate-700 font-mono font-semibold mb-1.5">
                <span className="flex items-center gap-1">
                  <Move className="w-3.5 h-3.5 text-cyan-600" /> Position X (Left / Right)
                </span>
                <span className="text-cyan-700 font-bold">{imageData.panX}%</span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                step="1"
                value={imageData.panX}
                onChange={(e) => onUpdateImage({ ...imageData, panX: parseInt(e.target.value, 10) })}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
              />
            </div>

            {/* Pan Y Slider */}
            <div>
              <div className="flex justify-between text-xs text-slate-700 font-mono font-semibold mb-1.5">
                <span className="flex items-center gap-1">
                  <Move className="w-3.5 h-3.5 text-cyan-600 rotate-90" /> Position Y (Up / Down)
                </span>
                <span className="text-cyan-700 font-bold">{imageData.panY}%</span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                step="1"
                value={imageData.panY}
                onChange={(e) => onUpdateImage({ ...imageData, panY: parseInt(e.target.value, 10) })}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
              />
            </div>
          </div>

          {/* Builder Details Input Form */}
          <div className="p-5 rounded-2xl bg-white/90 border border-cyan-200/60 shadow-lg shadow-slate-200/50 backdrop-blur-xl space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase text-slate-600 tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>Builder Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-600 font-mono font-semibold mb-1">Your Name</label>
                <input
                  type="text"
                  value={details.name}
                  onChange={(e) => setDetails({ ...details, name: e.target.value })}
                  placeholder="e.g. Ilakkiyan"
                  maxLength={24}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-semibold focus:border-cyan-500 focus:bg-white focus:outline-none transition shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-600 font-mono font-semibold mb-1">Role / Stack</label>
                <input
                  type="text"
                  value={details.roleStack}
                  onChange={(e) => setDetails({ ...details, roleStack: e.target.value })}
                  placeholder="e.g. Full-Stack AI Engineer"
                  maxLength={32}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-semibold focus:border-cyan-500 focus:bg-white focus:outline-none transition shadow-sm"
                />
              </div>
            </div>

            {/* Generated Builder Title Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs text-slate-600 font-mono font-semibold flex items-center gap-1">
                  <Wand2 className="w-3.5 h-3.5 text-cyan-600" /> Auto-Generated Builder Title
                </label>
                <button
                  type="button"
                  onClick={handleShuffleTitle}
                  className="text-[11px] text-cyan-700 hover:text-cyan-900 font-mono font-bold flex items-center gap-1 transition"
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cyan-50 border border-cyan-300 text-cyan-900 font-black font-mono text-sm tracking-wider uppercase focus:border-cyan-500 focus:outline-none transition shadow-sm"
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
            className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-white font-extrabold text-lg tracking-wide shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {isGenerating ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                <span>Generating High-Res Graphic...</span>
              </div>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-white" />
                <span>Generate {format === 'pfp' ? 'PFP Frame' : 'Builder ID Card'}</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

        {/* Live Preview Column */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 mt-6 lg:mt-0">
          <div className="p-4 sm:p-6 rounded-3xl bg-white/95 border border-cyan-200/70 shadow-2xl shadow-slate-200/80 backdrop-blur-2xl text-center space-y-4">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-emerald-700">LIVE CANVAS PREVIEW</span>
              </span>
              <span className="text-slate-500">{format === 'pfp' ? '1080 × 1080' : '1080 × 1350'}</span>
            </div>

            {/* Preview Image Render Box */}
            <div className="relative mx-auto rounded-2xl overflow-hidden border border-cyan-200 bg-slate-900 shadow-inner group">
              {livePreviewUrl ? (
                /* eslint-disable-next-html-element-suppress */
                <img
                  src={livePreviewUrl}
                  alt="Live Generated Frame Preview"
                  className="w-full h-auto object-contain max-h-[480px] sm:max-h-[520px] mx-auto rounded-2xl transition duration-300"
                />
              ) : (
                <div className="w-full aspect-square flex flex-col items-center justify-center text-slate-400 font-mono text-xs space-y-2">
                  <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                  <span>Rendering canvas preview...</span>
                </div>
              )}
            </div>

            <p className="text-[11px] text-slate-500 font-mono font-medium">
              Live composite preview updates instantly as you adjust controls.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
