# 🌴 Hacker House Goa 2026 — Task 1: Profile Frame & Badge Generator

Official interactive web app built for **Hacker House Goa 2026** builders. Customize, frame, and export high-resolution social profile avatars (PFP Frame) and event-style builder ID cards directly in your browser.

🌐 **Live Application**: [https://hh-goa-tasks.vercel.app/](https://hh-goa-tasks.vercel.app/)  
📦 **GitHub Repository**: [https://github.com/ilakkiyan-j/HHGoa-Tasks](https://github.com/ilakkiyan-j/HHGoa-Tasks)

---

## ⚡ Key Features

- **Dual Output Formats**:
  - **1:1 Square PFP Frame** (`1080 x 1080 px`): Custom event branding ring overlay for X (Twitter), GitHub, Discord, and Telegram avatars.
  - **4:5 Portrait Builder ID Card** (`1080 x 1350 px`): Official builder badge featuring custom Name, Tech Stack, and customizable Title Badges (e.g. `THE AI BUILDER`, `SOLANA ARCHITECT`, `RUST DEVELOPER`).
- **Interactive HTML5 Canvas Editor**:
  - Drag-to-pan positioning with smooth canvas redrawing.
  - Real-time zoom adjustment (`0.5x` to `3.0x`).
  - 90° step image rotation.
  - Quick reset photo alignment.
- **100% In-Browser Privacy**:
  - All photo processing runs locally on client-side HTML5 Canvas.
  - **Zero server uploads** — your photos never leave your device.
  - In-browser **HEIC / HEIF conversion** support (iOS Camera native photos processed via `heic2any`).
  - Native support for JPG, PNG, WEBP formats, plus instant **Demo Photo Mode**.
- **Seamless Social Sharing & Export**:
  - Ultra-high resolution PNG download with custom sanitized file naming.
  - One-click copy image PNG directly to clipboard.
  - Pre-filled **X (Twitter) Tweet Intent** integration with `#FrameInGoa` and `#HHGoa2026` hashtags.
  - Dynamic **Confetti Celebration** upon export completion.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Graphics Engine**: Native HTML5 2D Canvas API
- **Utilities**: `canvas-confetti`, `heic2any`

---

## 🚀 Getting Started

Follow these steps to run the application locally:

### 1. Clone the repository
```bash
git clone https://github.com/ilakkiyan-j/HHGoa-Tasks.git
cd HHGoa-Tasks
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## 📂 Project Architecture

```
HHGoa-Tasks/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout with fonts & SEO Metadata
│   │   ├── page.tsx           # Main Task 1 Badge Generator Application
│   │   ├── task-1/page.tsx    # Task 1 Route
│   │   └── globals.css        # Global CSS & Tailwind utilities
│   ├── components/
│   │   ├── common/            # Header & Footer navigation components
│   │   ├── editor/            # HTML5 Canvas editor & position controls
│   │   ├── landing/           # Hero section & photo drag-and-drop uploader
│   │   └── preview/           # Result preview, PNG export & social share buttons
│   ├── lib/
│   │   ├── canvas/            # Canvas frame rendering engine & layout drawing logic
│   │   ├── image/             # Image file loading, scaling & HEIC converter
│   │   └── share/             # Clipboard, download, and X share intent helpers
│   └── types/                 # TypeScript interfaces (FrameFormat, BuilderDetails, etc.)
├── public/                    # Static assets & demo photo
└── README.md
```

---

## 🔄 Updating Remote Git Repository (Organization Transfer)

If you transfer or update the repository to a GitHub Organization, update your local remote URL using:

```bash
git remote set-url origin https://github.com/<YOUR_ORGANIZATION_NAME>/HHGoa-Tasks.git
```

Verify your remote URL is updated:
```bash
git remote -v
```

---

## 📄 License

Built with ⚡ for **Hacker House Goa 2026**.
