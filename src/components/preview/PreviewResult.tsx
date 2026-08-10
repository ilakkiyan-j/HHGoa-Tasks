'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Download, Share2, RefreshCw, CheckCircle, Sparkles, Copy, ExternalLink, Info, Image as ImageIcon } from 'lucide-react';
import { FrameFormat, BuilderDetails } from '@/types/frame';
import {
  downloadImage,
  getTwitterShareUrl,
  sanitizeFilename,
  DEFAULT_CAPTION,
  dataUrlToFile,
  copyImageToClipboard,
} from '@/lib/share/shareHelper';

interface PreviewResultProps {
  resultDataUrl: string;
  format: FrameFormat;
  details: BuilderDetails;
  onReset: () => void;
}

export const PreviewResult: React.FC<PreviewResultProps> = ({
  resultDataUrl,
  format,
  details,
  onReset,
}) => {
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [imageInClipboard, setImageInClipboard] = useState(false);

  // Trigger celebration confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00F0FF', '#00FF87', '#FFD700', '#FF007A'],
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const filename = `HH-Goa-2026-${sanitizeFilename(details.name)}-${
    format === 'pfp' ? 'Frame' : 'Builder'
  }.png`;

  const handleDownload = () => {
    downloadImage(resultDataUrl, filename);
  };

  const handleShareToX = async () => {
    try {
      const imageFile = await dataUrlToFile(resultDataUrl, filename);

      // 1. Try Native Web Share API (Works on Mobile Safari/Chrome & macOS with direct file attachment to X)
      if (
        typeof window !== 'undefined' &&
        navigator.canShare &&
        navigator.canShare({ files: [imageFile] })
      ) {
        try {
          await navigator.share({
            files: [imageFile],
            title: 'HH Goa 2026 Profile Badge',
            text: DEFAULT_CAPTION,
          });
          return; // Successfully shared via native modal!
        } catch (shareErr) {
          // If user closes native modal or throws abort error, fallback to web workflow
          console.warn('Native share cancelled or failed, using desktop fallback', shareErr);
        }
      }

      // 2. Desktop Fallback: Copy banner image to clipboard for instant Ctrl+V paste
      const copiedBlob = await copyImageToClipboard(resultDataUrl);
      setImageInClipboard(copiedBlob);

      // 3. Download image to local files
      downloadImage(resultDataUrl, filename);

      // 4. Copy caption text
      await navigator.clipboard.writeText(DEFAULT_CAPTION);
      setCopiedCaption(true);

      // 5. Open X tweet intent in new tab
      window.open(getTwitterShareUrl(DEFAULT_CAPTION), '_blank');

      // 6. Show guide modal
      setShowShareModal(true);
    } catch (err) {
      console.error('Error during X sharing flow:', err);
      // Safety fallback
      downloadImage(resultDataUrl, filename);
      window.open(getTwitterShareUrl(DEFAULT_CAPTION), '_blank');
      setShowShareModal(true);
    }
  };

  const handleCopyCaptionOnly = () => {
    navigator.clipboard.writeText(DEFAULT_CAPTION).then(() => {
      setCopiedCaption(true);
      setTimeout(() => setCopiedCaption(false), 3000);
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
      {/* Top Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-mono mb-4"
      >
        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
        <span>GENERATION COMPLETE</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
      >
        YOU&apos;RE FRAMED.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-2 text-slate-300 text-sm sm:text-base font-sans"
      >
        Your HH Goa 2026 identity is ready for social media.
      </motion.p>

      {/* Main Image Preview Display Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-8 relative max-w-lg mx-auto p-3 sm:p-4 rounded-3xl bg-slate-900/90 border border-cyan-500/40 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl group"
      >
        <div className="relative rounded-2xl overflow-hidden bg-slate-950 shadow-inner">
          {/* eslint-disable-next-html-element-suppress */}
          <img
            src={resultDataUrl}
            alt="HH Goa 2026 Generated Frame"
            className="w-full h-auto object-contain max-h-[580px] mx-auto rounded-2xl shadow-lg"
          />
        </div>
      </motion.div>

      {/* Primary Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto"
      >
        {/* Download PNG */}
        <button
          onClick={handleDownload}
          className="w-full sm:w-1/2 py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 text-slate-950 font-extrabold text-base tracking-wide hover:shadow-xl hover:shadow-cyan-400/30 hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          <span>Download PNG</span>
        </button>

        {/* Share to X */}
        <button
          onClick={handleShareToX}
          className="w-full sm:w-1/2 py-4 px-6 rounded-2xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-white font-extrabold text-base hover:bg-slate-800 transition flex items-center justify-center gap-2 group shadow-lg"
        >
          <Share2 className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition" />
          <span>Share to X</span>
        </button>
      </motion.div>

      {/* Create Another Option */}
      <div className="mt-6">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-400 transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Create Another Frame</span>
        </button>
      </div>

      {/* Helper Modal explaining image attachment */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-cyan-500/30 shadow-2xl text-left space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span>Sharing Generated Banner to X</span>
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-slate-400 hover:text-white font-mono text-xs"
              >
                ✕ Close
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200 leading-relaxed font-mono flex items-start gap-2.5">
              <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                {imageInClipboard ? (
                  <>
                    <strong className="text-emerald-300">✓ Banner Copied to Clipboard!</strong><br />
                    Press <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 font-mono font-bold">Ctrl + V</span> (or <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 font-mono font-bold">Cmd + V</span>) in the X tweet window to attach the banner image directly!
                  </>
                ) : (
                  <>
                    <strong className="text-cyan-300">✓ Banner Image Downloaded!</strong><br />
                    Your generated banner PNG has been saved to your downloads. Simply attach it using the media icon in X.
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
              {/* eslint-disable-next-html-element-suppress */}
              <img
                src={resultDataUrl}
                alt="Banner preview"
                className="w-16 h-16 object-cover rounded-lg border border-slate-700 flex-shrink-0"
              />
              <div>
                <span className="text-xs font-mono font-bold text-slate-200 block truncate">{filename}</span>
                <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1 mt-0.5">
                  <ImageIcon className="w-3 h-3" /> Image Banner Attached
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Pre-filled Tweet Caption</label>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono whitespace-pre-line relative">
                {DEFAULT_CAPTION}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleCopyCaptionOnly}
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono font-semibold flex items-center justify-center gap-2 hover:bg-slate-700 transition"
              >
                <Copy className="w-4 h-4 text-cyan-400" />
                <span>{copiedCaption ? 'Copied!' : 'Copy Caption'}</span>
              </button>

              <button
                onClick={() => window.open(getTwitterShareUrl(DEFAULT_CAPTION), '_blank')}
                className="flex-1 py-2.5 px-4 rounded-xl bg-cyan-400 text-slate-950 text-xs font-mono font-extrabold flex items-center justify-center gap-2 hover:bg-cyan-300 transition"
              >
                <span>Open X Compose</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
