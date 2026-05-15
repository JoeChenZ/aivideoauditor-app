import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import Nav from '@/components/nav';
import Footer from '@/components/footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
});

const BASE_URL = 'https://www.aivideoauditor.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'AIVideoAuditor — Get Credits Back From Every AI Video Tool',
    template: '%s | AIVideoAuditor',
  },
  description:
    'Free Chrome extension. Same prompt, four AI tools, four different failures — Runway, Luma, Veo, Kling, Seedance, Vidu all charge for broken output. AVA documents the failure with engineering-grade terminology and builds the audit report support teams approve.',
  keywords: [
    'ai video refund',
    'runway ml refund',
    'runway credits refund',
    'luma ai credits refund',
    'google veo failed generation refund',
    'kling ai refund',
    'seedance refund',
    'vidu refund',
    'ai video generation failure',
    'failed ai generation credits',
    'runway gen4 refund',
    'runway limb artifact',
    'runway physics collapse',
    'ai video tool refund',
    'how to get runway refund',
    'luma dream machine refund',
    'ai video auditor',
    'failed video credits refund',
  ],
  authors: [{ name: 'AIVideoAuditor' }],
  creator: 'AIVideoAuditor',
  publisher: 'AIVideoAuditor',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: 'AIVideoAuditor — Same Prompt, Four AI Tools, Four Different Failures',
    description:
      'Free Chrome extension. Every AI video tool fails — Runway, Luma, Veo, Kling, Seedance, Vidu all charge for broken output. AVA documents the failure and builds the refund-ready audit report.',
    url: BASE_URL,
    siteName: 'AIVideoAuditor',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AIVideoAuditor — Stop Losing Credits to Failed AI Video Generations',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIVideoAuditor — Stop Losing AI Video Credits',
    description:
      'Free Chrome extension. Mark broken frames, generate a PDF audit report, and reclaim credits from Runway, Luma, Veo, Kling, Seedance, or Vidu.',
    images: ['/og-image.png'],
    creator: '@aivideoauditor',
  },
  icons: {
    icon: '/favicon-32.png',
    apple: '/icon-192.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Preconnect to Google Fonts already handled by next/font */}
        <link rel="canonical" href={BASE_URL} />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} bg-void text-ink-primary antialiased`}>
        <Nav />
        <div className="pt-14">{children}</div>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
