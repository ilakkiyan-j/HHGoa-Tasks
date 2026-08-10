export const OFFICIAL_HASHTAG = '#FrameInGoa';
export const EVENT_HASHTAG = '#HHGoa2026';

export const DEFAULT_CAPTION = `Built different. Framed in Goa. 🌴⚡

I'm ready for HH Goa 2026.

${OFFICIAL_HASHTAG} ${EVENT_HASHTAG}`;

/**
 * Generate X (Twitter) Tweet Intent URL with pre-filled text
 */
export function getTwitterShareUrl(caption: string = DEFAULT_CAPTION): string {
  const encodedText = encodeURIComponent(caption);
  return `https://twitter.com/intent/tweet?text=${encodedText}`;
}

/**
 * Helper to download canvas data URL as PNG file
 */
export function downloadImage(dataUrl: string, filename: string): void {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Clean username string for file name creation
 */
export function sanitizeFilename(name: string): string {
  const clean = name.trim().replace(/[^a-zA-Z0-9_-]/g, '_');
  return clean || 'Builder';
}
