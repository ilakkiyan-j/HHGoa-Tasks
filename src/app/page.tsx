'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { LandingHero } from '@/components/landing/LandingHero';
import { ImageEditor } from '@/components/editor/ImageEditor';
import { PreviewResult } from '@/components/preview/PreviewResult';
import { UserImageData, FrameFormat, BuilderDetails } from '@/types/frame';

type AppStep = 'landing' | 'editor' | 'preview';

export default function Home() {
  const [step, setStep] = useState<AppStep>('landing');
  const [userImage, setUserImage] = useState<UserImageData | null>(null);

  // Result state after canvas export
  const [generatedDataUrl, setGeneratedDataUrl] = useState<string>('');
  const [activeFormat, setActiveFormat] = useState<FrameFormat>('pfp');
  const [builderDetails, setBuilderDetails] = useState<BuilderDetails>({
    name: 'Ilakkiyan',
    roleStack: 'Full-Stack AI Engineer',
    builderTitle: 'THE AI BUILDER',
  });

  const handleImageSelected = (imageData: UserImageData) => {
    setUserImage(imageData);
    setStep('editor');
  };

  const handleTryDemo = () => {
    // Load bundled sample photo from public directory
    setUserImage({
      file: null,
      dataUrl: '/demo-avatar.png',
      width: 1080,
      height: 1080,
      zoom: 1,
      panX: 0,
      panY: 0,
      rotation: 0,
    });
    setStep('editor');
  };

  const handleGenerateComplete = (
    resultDataUrl: string,
    format: FrameFormat,
    details: BuilderDetails
  ) => {
    setGeneratedDataUrl(resultDataUrl);
    setActiveFormat(format);
    setBuilderDetails(details);
    setStep('preview');
  };

  const handleReset = () => {
    setStep('landing');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header onReset={handleReset} />

      <main className="flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {step === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <LandingHero onImageSelected={handleImageSelected} onTryDemo={handleTryDemo} />
            </motion.div>
          )}

          {step === 'editor' && userImage && (
            <motion.div
              key="editor"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <ImageEditor
                imageData={userImage}
                onUpdateImage={setUserImage}
                onGenerateComplete={handleGenerateComplete}
                onUploadNew={handleReset}
              />
            </motion.div>
          )}

          {step === 'preview' && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <PreviewResult
                resultDataUrl={generatedDataUrl}
                format={activeFormat}
                details={builderDetails}
                onReset={handleReset}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
