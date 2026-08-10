import { UserImageData, BuilderDetails, ThemeVariant, ThemeConfig } from '@/types/frame';
import { loadImageElement } from '../image/imageProcessor';

export const THEMES: Record<ThemeVariant, ThemeConfig> = {
  'neon-goa': {
    id: 'neon-goa',
    name: 'Neon Goa',
    primaryColor: '#00F0FF',
    secondaryColor: '#00FF87',
    accentColor: '#FFD700',
    bgGradient: '#07090E',
    badgeBg: 'rgba(0, 240, 255, 0.15)',
    borderColor: '#00F0FF',
  },
  'sunset-cyber': {
    id: 'sunset-cyber',
    name: 'Sunset Cyber',
    primaryColor: '#FF007A',
    secondaryColor: '#FF6B00',
    accentColor: '#00F0FF',
    bgGradient: '#0F0A1C',
    badgeBg: 'rgba(255, 0, 122, 0.15)',
    borderColor: '#FF007A',
  },
  'obsidian-gold': {
    id: 'obsidian-gold',
    name: 'Obsidian Gold',
    primaryColor: '#F3C649',
    secondaryColor: '#FFFFFF',
    accentColor: '#9F7317',
    bgGradient: '#050505',
    badgeBg: 'rgba(243, 198, 73, 0.15)',
    borderColor: '#F3C649',
  },
  'electric-mint': {
    id: 'electric-mint',
    name: 'Electric Mint',
    primaryColor: '#39FF14',
    secondaryColor: '#00F5D4',
    accentColor: '#9D4EDD',
    bgGradient: '#06121E',
    badgeBg: 'rgba(57, 255, 20, 0.15)',
    borderColor: '#39FF14',
  },
};

/**
 * Draw background cyber grid, palm accents, and tech grid
 */
function drawBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  theme: ThemeConfig
) {
  // Main dark gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, theme.bgGradient);
  bgGrad.addColorStop(0.5, '#0B0F19');
  bgGrad.addColorStop(1, '#030407');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle glow radial in top right & bottom left
  const glow1 = ctx.createRadialGradient(width * 0.8, height * 0.15, 50, width * 0.8, height * 0.15, 600);
  glow1.addColorStop(0, hexToRgba(theme.primaryColor, 0.25));
  glow1.addColorStop(1, 'transparent');
  ctx.fillStyle = glow1;
  ctx.fillRect(0, 0, width, height);

  const glow2 = ctx.createRadialGradient(width * 0.15, height * 0.85, 50, width * 0.15, height * 0.85, 600);
  glow2.addColorStop(0, hexToRgba(theme.secondaryColor, 0.2));
  glow2.addColorStop(1, 'transparent');
  ctx.fillStyle = glow2;
  ctx.fillRect(0, 0, width, height);

  // Tech grid pattern
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.lineWidth = 1;
  const gridSize = 40;
  for (let x = 0; x < width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  ctx.restore();
}

/**
 * Helper to draw user photo with zoom, pan, aspect-ratio cover fit
 */
function drawUserPhoto(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cropArea: { x: number; y: number; w: number; h: number },
  userImage: UserImageData
) {
  ctx.save();

  // Clip to crop area
  ctx.beginPath();
  ctx.rect(cropArea.x, cropArea.y, cropArea.w, cropArea.h);
  ctx.clip();

  // Background behind photo in crop area
  ctx.fillStyle = '#080C14';
  ctx.fillRect(cropArea.x, cropArea.y, cropArea.w, cropArea.h);

  const imgW = img.naturalWidth || img.width;
  const imgH = img.naturalHeight || img.height;

  // Calculate cover dimensions
  const scaleRatio = Math.max(cropArea.w / imgW, cropArea.h / imgH);
  const baseW = imgW * scaleRatio;
  const baseH = imgH * scaleRatio;

  // Apply user zoom scale
  const zoomScale = userImage.zoom || 1;
  const finalW = baseW * zoomScale;
  const finalH = baseH * zoomScale;

  // Pan offsets in pixels
  const offsetX = (userImage.panX / 100) * cropArea.w;
  const offsetY = (userImage.panY / 100) * cropArea.h;

  // Center coordinates
  const centerX = cropArea.x + cropArea.w / 2 + offsetX;
  const centerY = cropArea.y + cropArea.h / 2 + offsetY;

  // Draw with potential rotation around center
  ctx.translate(centerX, centerY);
  if (userImage.rotation) {
    ctx.rotate((userImage.rotation * Math.PI) / 180);
  }

  ctx.drawImage(img, -finalW / 2, -finalH / 2, finalW, finalH);

  ctx.restore();
}

/**
 * Draw tech corner brackets [ ]
 */
function drawCornerBrackets(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  length: number,
  color: string
) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;

  // Top Left
  ctx.beginPath();
  ctx.moveTo(x, y + length);
  ctx.lineTo(x, y);
  ctx.lineTo(x + length, y);
  ctx.stroke();

  // Top Right
  ctx.beginPath();
  ctx.moveTo(x + w - length, y);
  ctx.lineTo(x + w, y);
  ctx.lineTo(x + w, y + length);
  ctx.stroke();

  // Bottom Left
  ctx.beginPath();
  ctx.moveTo(x, y + h - length);
  ctx.lineTo(x, y + h);
  ctx.lineTo(x + length, y + h);
  ctx.stroke();

  // Bottom Right
  ctx.beginPath();
  ctx.moveTo(x + w - length, y + h);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x + w, y + h - length);
  ctx.stroke();

  ctx.restore();
}

/**
 * Draw decorative cyber barcode
 */
function drawBarcode(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string
) {
  ctx.save();
  ctx.fillStyle = color;
  const bars = [3, 1, 4, 2, 1, 5, 2, 1, 3, 2, 4, 1, 2, 5, 1, 3];
  let currX = x;
  const totalWeight = bars.reduce((a, b) => a + b, 0);
  const unitW = w / (totalWeight + bars.length);

  for (let i = 0; i < bars.length; i++) {
    const barW = bars[i] * unitW;
    ctx.fillRect(currX, y, barW, h);
    currX += barW + unitW;
  }
  ctx.restore();
}

/**
 * Format A: PFP FRAME Generator (1080 x 1080)
 */
export async function generatePfpFrame(
  userImage: UserImageData,
  themeVariant: ThemeVariant = 'neon-goa'
): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error('Could not get canvas context');

  const theme = THEMES[themeVariant];
  const w = 1080;
  const h = 1080;

  // 1. Draw Background
  drawBackground(ctx, w, h, theme);

  // 2. User Photo in central area
  if (userImage.dataUrl) {
    try {
      const img = await loadImageElement(userImage.dataUrl);
      const margin = 50;
      drawUserPhoto(
        ctx,
        img,
        { x: margin, y: margin, w: w - margin * 2, h: h - margin * 2 },
        userImage
      );
    } catch (e) {
      console.error('Failed to draw photo on canvas', e);
    }
  }

  // 3. Cyber Overlay Frame
  // Outer frame stroke
  ctx.save();
  ctx.strokeStyle = theme.primaryColor;
  ctx.lineWidth = 6;
  ctx.shadowColor = theme.primaryColor;
  ctx.shadowBlur = 15;
  ctx.strokeRect(40, 40, w - 80, h - 80);
  ctx.restore();

  // Inner border
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(52, 52, w - 104, h - 104);
  ctx.restore();

  // Tech Corner Brackets
  drawCornerBrackets(ctx, 30, 30, w - 60, h - 60, 40, theme.secondaryColor);

  // Top Banner Bar
  const topBarGrad = ctx.createLinearGradient(0, 40, 0, 150);
  topBarGrad.addColorStop(0, 'rgba(7, 9, 14, 0.92)');
  topBarGrad.addColorStop(1, 'rgba(7, 9, 14, 0.0)');
  ctx.fillStyle = topBarGrad;
  ctx.fillRect(40, 40, w - 80, 160);

  // Top Header Text
  ctx.save();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 36px sans-serif';
  ctx.letterSpacing = '3px';
  ctx.fillText('HH GOA 2026', 70, 95);

  ctx.fillStyle = theme.primaryColor;
  ctx.font = '700 18px monospace';
  ctx.fillText('15.2993° N, 74.1240° E • GOA', 70, 125);
  ctx.restore();

  // Top Right Status Badge
  ctx.save();
  ctx.fillStyle = theme.badgeBg;
  ctx.strokeStyle = theme.primaryColor;
  ctx.lineWidth = 1.5;
  roundRect(ctx, w - 270, 65, 200, 42, 8);
  ctx.fill();
  ctx.stroke();

  // Pulsing Dot
  ctx.fillStyle = theme.secondaryColor;
  ctx.beginPath();
  ctx.arc(w - 245, 86, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 16px sans-serif';
  ctx.fillText('BUILDER PFP', w - 225, 91);
  ctx.restore();

  // Bottom Banner Bar
  const botBarGrad = ctx.createLinearGradient(0, h - 220, 0, h - 40);
  botBarGrad.addColorStop(0, 'rgba(7, 9, 14, 0.0)');
  botBarGrad.addColorStop(1, 'rgba(7, 9, 14, 0.95)');
  ctx.fillStyle = botBarGrad;
  ctx.fillRect(40, h - 220, w - 80, 180);

  // Bottom Branding Tag
  ctx.save();
  // Pill background
  ctx.fillStyle = theme.primaryColor;
  roundRect(ctx, 70, h - 140, 290, 56, 12);
  ctx.fill();

  ctx.fillStyle = '#07090E';
  ctx.font = '900 24px sans-serif';
  ctx.fillText('#FrameInGoa', 95, h - 104);

  // Subtext
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 28px sans-serif';
  ctx.fillText('BUILD • SHIP • SHARE', 390, h - 104);

  // Bottom right barcode
  drawBarcode(ctx, w - 240, h - 120, 170, 36, theme.secondaryColor);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.font = '600 12px monospace';
  ctx.fillText('HH-GOA-2026-VERIFIED', w - 240, h - 74);

  ctx.restore();

  // Decorative palm accent vector in corner
  drawPalmAccent(ctx, w - 120, 130, 45, theme.accentColor);

  return canvas.toDataURL('image/png');
}

/**
 * Format B: BUILDER ID CARD Generator (1080 x 1350)
 */
export async function generateBuilderCard(
  userImage: UserImageData,
  details: BuilderDetails,
  themeVariant: ThemeVariant = 'neon-goa'
): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error('Could not get canvas context');

  const theme = THEMES[themeVariant];
  const w = 1080;
  const h = 1350;

  // 1. Draw Background
  drawBackground(ctx, w, h, theme);

  // 2. Outer Card Border Frame
  const padding = 50;
  ctx.save();
  ctx.fillStyle = 'rgba(12, 17, 29, 0.85)';
  ctx.strokeStyle = theme.primaryColor;
  ctx.lineWidth = 4;
  ctx.shadowColor = theme.primaryColor;
  ctx.shadowBlur = 20;
  roundRect(ctx, padding, padding, w - padding * 2, h - padding * 2, 24);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  // Tech Corner Brackets on outer card
  drawCornerBrackets(
    ctx,
    padding + 10,
    padding + 10,
    w - (padding + 10) * 2,
    h - (padding + 10) * 2,
    30,
    theme.secondaryColor
  );

  // 3. Card Header Bar
  ctx.save();
  // Header background strip
  const headGrad = ctx.createLinearGradient(padding, padding, w - padding, padding);
  headGrad.addColorStop(0, theme.primaryColor);
  headGrad.addColorStop(1, theme.secondaryColor);
  ctx.fillStyle = headGrad;
  roundRect(ctx, padding, padding, w - padding * 2, 100, 24, true, false); // top rounded only
  ctx.fill();

  // Header Title
  ctx.fillStyle = '#07090E';
  ctx.font = '900 40px sans-serif';
  ctx.fillText('HH GOA 2026', padding + 40, padding + 64);

  // Header Right Pill
  ctx.fillStyle = 'rgba(7, 9, 14, 0.25)';
  roundRect(ctx, w - padding - 240, padding + 24, 200, 48, 24);
  ctx.fill();

  ctx.fillStyle = '#07090E';
  ctx.font = '900 16px monospace';
  ctx.fillText('BUILDER PASSPORT', w - padding - 225, padding + 54);
  ctx.restore();

  // 4. Photo Container Area (Centered)
  const photoW = 880;
  const photoH = 580;
  const photoX = (w - photoW) / 2;
  const photoY = 180;

  // Photo Frame Border
  ctx.save();
  ctx.strokeStyle = theme.borderColor;
  ctx.lineWidth = 3;
  ctx.fillStyle = '#05070C';
  roundRect(ctx, photoX, photoY, photoW, photoH, 16);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  // Draw User Photo
  if (userImage.dataUrl) {
    try {
      const img = await loadImageElement(userImage.dataUrl);
      drawUserPhoto(
        ctx,
        img,
        { x: photoX + 6, y: photoY + 6, w: photoW - 12, h: photoH - 12 },
        userImage
      );
    } catch (e) {
      console.error('Failed to draw builder photo', e);
    }
  }

  // Photo Overlay Reticle / Badge
  ctx.save();
  ctx.fillStyle = 'rgba(7, 9, 14, 0.75)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 1;
  roundRect(ctx, photoX + 20, photoY + photoH - 60, 220, 40, 8);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = theme.secondaryColor;
  ctx.font = '700 14px monospace';
  ctx.fillText('CONFIRMED ATTENDEE', photoX + 34, photoY + photoH - 35);
  ctx.restore();

  // 5. Details Section Below Photo
  let detailsY = photoY + photoH + 40;

  // GENERATED BUILDER TITLE BANNER
  ctx.save();
  const titleText = (details.builderTitle || 'THE SYSTEM ARCHITECT').toUpperCase();

  ctx.fillStyle = theme.badgeBg;
  ctx.strokeStyle = theme.primaryColor;
  ctx.lineWidth = 2;
  ctx.shadowColor = theme.primaryColor;
  ctx.shadowBlur = 10;
  roundRect(ctx, photoX, detailsY, photoW, 64, 12);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = theme.primaryColor;
  ctx.font = '900 24px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`⚡  ${titleText}  ⚡`, w / 2, detailsY + 41);
  ctx.restore();

  detailsY += 90;

  // NAME & ROLE/STACK
  ctx.save();
  ctx.textAlign = 'left';

  // NAME Label & Value
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.font = '800 14px monospace';
  ctx.fillText('BUILDER NAME', photoX, detailsY);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 44px sans-serif';
  const nameText = (details.name || 'ILAKKIYAN').toUpperCase();
  ctx.fillText(nameText, photoX, detailsY + 48);

  // STACK / ROLE Label & Value (Right Column)
  const col2X = photoX + 460;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.font = '800 14px monospace';
  ctx.fillText('STACK / ROLE', col2X, detailsY);

  ctx.fillStyle = theme.secondaryColor;
  ctx.font = '800 28px sans-serif';
  const stackText = (details.roleStack || 'FULL-STACK AI ENGINEER').toUpperCase();
  ctx.fillText(stackText, col2X, detailsY + 48);

  ctx.restore();

  detailsY += 120;

  // 6. Card Footer Section
  ctx.save();
  // Separator Line
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(photoX, detailsY);
  ctx.lineTo(photoX + photoW, detailsY);
  ctx.stroke();

  detailsY += 35;

  // Official hashtag pill
  ctx.fillStyle = theme.primaryColor;
  roundRect(ctx, photoX, detailsY, 230, 48, 10);
  ctx.fill();

  ctx.fillStyle = '#07090E';
  ctx.font = '900 20px sans-serif';
  ctx.fillText('#FrameInGoa', photoX + 25, detailsY + 31);

  // Location & Date
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 18px monospace';
  ctx.fillText('GOA, INDIA • OCT 2026', photoX + 260, detailsY + 31);

  // Barcode right
  drawBarcode(ctx, photoX + photoW - 220, detailsY + 4, 220, 36, theme.secondaryColor);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.font = '600 11px monospace';
  ctx.fillText('HH2026-ID-PASS', photoX + photoW - 220, detailsY + 54);

  ctx.restore();

  return canvas.toDataURL('image/png');
}

/**
 * Utility function to draw rounded rectangles on Canvas
 */
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  topOnly = false,
  bottomOnly = false
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - (bottomOnly ? 0 : r));
  if (bottomOnly) {
    ctx.lineTo(x + w, y + h);
    ctx.lineTo(x, y + h);
  } else {
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  }
  ctx.lineTo(x, y + (topOnly ? 0 : r));
  if (topOnly) {
    ctx.lineTo(x, y);
  } else {
    ctx.quadraticCurveTo(x, y, x + r, y);
  }
  ctx.closePath();
}

/**
 * Helper to convert HEX to RGBA string
 */
function hexToRgba(hex: string, alpha: number): string {
  const c = hex.replace('#', '');
  if (c.length === 6) {
    const r = parseInt(c.substring(0, 2), 16);
    const g = parseInt(c.substring(2, 4), 16);
    const b = parseInt(c.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return `rgba(0, 240, 255, ${alpha})`;
}

/**
 * Palm accent graphics
 */
function drawPalmAccent(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string
) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  // Simple stylized palm leaf lines
  for (let i = -3; i <= 3; i++) {
    const angle = (i * 20 * Math.PI) / 180;
    const endX = x + Math.sin(angle) * size;
    const endY = y - Math.cos(angle) * size;
    ctx.moveTo(x, y);
    ctx.quadraticCurveTo(x + (endX - x) / 2 + 10, y + (endY - y) / 2, endX, endY);
  }
  ctx.stroke();
  ctx.restore();
}
