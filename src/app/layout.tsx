import type { Metadata } from 'next';
import { Outfit, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'HH Goa 2026 — Frame In Goa | Builder Frame & ID Card Generator',
  description:
    'Turn your photo into your official HH Goa 2026 builder identity. Generate custom profile picture frames and event-style builder ID cards.',
  keywords: [
    'HH Goa 2026',
    'Frame In Goa',
    'Builder ID Card Generator',
    'PFP Frame Generator',
    'Goa Hackathon',
    'Web3 Builder Badge',
  ],
  authors: [{ name: 'HH Goa Team' }],
  openGraph: {
    title: 'HH Goa 2026 — Frame In Goa',
    description: 'Frame your build. Take it to Goa. Create your HH Goa 2026 builder identity.',
    url: 'https://hh-goa-tasks.vercel.app',
    siteName: 'HH Goa 2026',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HH Goa 2026 — Frame In Goa',
    description: 'Frame your build. Take it to Goa. Generate your builder identity card in seconds.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-[#f8fafc] bg-cyber-grid text-slate-900 flex flex-col antialiased selection:bg-cyan-500 selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
