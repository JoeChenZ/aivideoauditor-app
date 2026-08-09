import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import Nav from '@/components/nav';

const geist = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist',
  display: 'swap',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  display: 'swap',
});

const BASE_URL = 'https://www.aivideoauditor.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'AI Video Auditor - Done-For-You AI Product Videos',
    template: '%s | AI Video Auditor',
  },
  description:
    'We audited 105 ways AI video fails. Now we make product videos for DTC brands that ship right, every time. From $59.',
  keywords: [
    'ai product video',
    'done for you ai video',
    'ai video for ecommerce',
    'product video dtc',
    'ai video studio',
    'ai video auditor',
    'product video from photo',
    'ai video for shopify',
    'tiktok product video',
    'instagram reels product video',
  ],
  authors: [{ name: 'AI Video Auditor' }],
  creator: 'AI Video Auditor',
  publisher: 'AI Video Auditor',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: 'AI Video Auditor - Done-For-You AI Product Videos',
    description:
      'We audited 105 ways AI video fails. Now we make product videos for DTC brands that ship right, every time. From $59.',
    url: BASE_URL,
    siteName: 'AI Video Auditor',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'AI Video Auditor — Done-For-You AI Product Videos' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Video Auditor - Done-For-You AI Product Videos',
    description:
      'We audited 105 ways AI video fails. Product videos for DTC brands from $59.',
    creator: '@AIVideoAuditor',
    images: ['/og-image.jpg'],
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
        <link rel="canonical" href={BASE_URL} />
        <meta name="trustpilot-one-time-domain-verification-id" content="fade36b3-6bf0-4e2c-bebc-4045f8537e40" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'AI Video Auditor',
            url: 'https://www.aivideoauditor.com',
            logo: 'https://www.aivideoauditor.com/icon-192.png',
            sameAs: ['https://x.com/AIVideoAuditor'],
          }) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'AI Video Auditor',
            url: 'https://www.aivideoauditor.com',
            potentialAction: {
              '@type': 'SearchAction',
              target: { '@type': 'EntryPoint', urlTemplate: 'https://www.aivideoauditor.com/wall?q={search_term_string}' },
              'query-input': 'required name=search_term_string',
            },
          }) }}
        />
      </head>
      <body
        className={`${geist.variable} ${geistMono.variable} font-[family-name:var(--font-geist)] bg-zinc-950 text-white antialiased`}
      >
        <Nav />
        <div className="pt-16">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
