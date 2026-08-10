export type FrameFormat = 'pfp' | 'idcard';

export type ThemeVariant = 'neon-goa' | 'sunset-cyber' | 'obsidian-gold' | 'electric-mint';

export interface UserImageData {
  file: File | null;
  dataUrl: string;
  width: number;
  height: number;
  zoom: number;
  panX: number; // offset as percentage (-50 to 50)
  panY: number; // offset as percentage (-50 to 50)
  rotation: number; // 0, 90, 180, 270
}

export interface BuilderDetails {
  name: string;
  roleStack: string;
  builderTitle: string;
}

export interface ThemeConfig {
  id: ThemeVariant;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  bgGradient: string;
  badgeBg: string;
  borderColor: string;
}
