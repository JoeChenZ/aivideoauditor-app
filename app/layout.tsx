import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Fraunces } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import Nav from '@/components/nav';
import Footer from '@/components/footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz', 'SOFT', 'WONK'],
});

const BASE_URL = 'https://www.aivideoauditor.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'AIVideoAuditor — Score Your AI Video Prompt Before You Click Generate',
    template: '%s | AIVideoAuditor',
  },
  description:
    'Free Chrome extension. Pre-flight prompt scoring across 8 AI-video platforms (105 documented failure modes) + vendor reality check across 11 vendors (132-review Trustpilot corpus). Personal failure history + silent policy change alerts. Stop burning credits on prompts that fail.',
  keywords: [
    'ai video prompt scoring',
    'ai video failure prediction',
    'runway ml prompt analyzer',
    'luma ai prompt score',
    'sora 2 reality check',
    'veo prompt safety',
    'kling ai prompt risk',
    'seedance prompt analyzer',
    'vidu prompt scorer',
    'higgsfield reality check',
    'pika prompt analyzer',
    'ai video vendor reliability',
    'ai video unlimited tier reality',
    'ai video credit waste prevention',
    'pre-generation prompt analysis',
    'ai video failure modes',
    'ai video auditor',
    'ai video prompt rewrite',
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
    title: 'AIVideoAuditor — Score Your AI Video Prompt Before You Click Generate',
    description:
      'Free Chrome extension. Pre-flight prompt scoring across 8 AI-video platforms (105 failure modes) + vendor reality check across 11 vendors. Catch failure-prone prompts before you commit credits.',
    url: BASE_URL,
    siteName: 'AIVideoAuditor',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AIVideoAuditor — Pre-flight prompt scoring across 11 AI video platforms',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIVideoAuditor — Score Your AI Video Prompt Before Generate',
    description:
      'Free Chrome extension. Pre-flight prompt scoring across 11 AI video platforms. 105 failure modes catalogued. Stop burning credits on prompts that fail.',
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
        <meta name="trustpilot-one-time-domain-verification-id" content="fade36b3-6bf0-4e2c-bebc-4045f8537e40" />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${fraunces.variable} bg-void text-ink-primary antialiased`}>
        <Nav />
        <div className="pt-14">{children}</div>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
