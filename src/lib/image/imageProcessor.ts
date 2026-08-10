/**
 * Helper to process incoming image file (supporting JPG, PNG, HEIC, WEBP).
 * Converts HEIC to PNG using client-side `heic2any` library.
 */

export async function processImageFile(file: File): Promise<{ dataUrl: string; width: number; height: number }> {
  let blobToProcess: Blob = file;

  // Check if file is HEIC/HEIF
  const isHeic =
    file.type === 'image/heic' ||
    file.type === 'image/heif' ||
    file.name.toLowerCase().endsWith('.heic') ||
    file.name.toLowerCase().endsWith('.heif');

  if (isHeic) {
    try {
      const heic2any = (await import('heic2any')).default;
      const convertedResult = await heic2any({
        blob: file,
        toType: 'image/png',
        quality: 0.9,
      });

      blobToProcess = Array.isArray(convertedResult) ? convertedResult[0] : convertedResult;
    } catch (err) {
      console.error('HEIC conversion warning:', err);
      // Fallback: proceed with original blob in case browser supports it natively
    }
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        resolve({
          dataUrl,
          width: img.naturalWidth || img.width,
          height: img.naturalHeight || img.height,
        });
      };
      img.onerror = () => {
        reject(new Error('Failed to load image file. Please try another image format.'));
      };
      img.src = dataUrl;
    };
    reader.onerror = () => reject(new Error('Failed to read file from disk.'));
    reader.readAsDataURL(blobToProcess);
  });
}

/**
 * Load HTMLImageElement asynchronously from dataUrl
 */
export function loadImageElement(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}
