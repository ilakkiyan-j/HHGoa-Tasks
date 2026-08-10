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
 * Convert Base64/DataURL to a File object
 */
export async function dataUrlToFile(dataUrl: string, filename: string): Promise<File> {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return new File([blob], filename, { type: 'image/png' });
}

/**
 * Copy image PNG blob directly to clipboard so user can press Ctrl+V / Cmd+V
 */
export async function copyImageToClipboard(dataUrl: string): Promise<boolean> {
  try {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    if (typeof window !== 'undefined' && navigator.clipboard && navigator.clipboard.write) {
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type || 'image/png']: blob,
        }),
      ]);
      return true;
    }
  } catch (err) {
    console.warn('Clipboard image copy not supported or permitted', err);
  }
  return false;
}

/**
 * Clean username string for file name creation
 */
export function sanitizeFilename(name: string): string {
  const clean = name.trim().replace(/[^a-zA-Z0-9_-]/g, '_');
  return clean || 'Builder';
}
