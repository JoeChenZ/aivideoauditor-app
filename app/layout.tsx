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
    default: 'AI Video Auditor — Product Videos From $59',
    template: '%s | AI Video Auditor',
  },
  description:
    'Send one product photo. Get a QC-checked 9:16 Reel for IG, TikTok & 小紅書 in 2–3 days, from $59. We audited 105 AI failure modes so yours ships right.',
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
    title: 'AI Video Auditor — Product Videos From $59',
    description:
      'Send one product photo. Get a QC-checked 9:16 Reel for IG, TikTok & 小紅書 in 2–3 days, from $59. We audited 105 AI failure modes so yours ships right.',
    url: BASE_URL,
    siteName: 'AI Video Auditor',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'AI Video Auditor — Done-For-You AI Product Videos' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Video Auditor — Product Videos From $59',
    description:
      'Send one product photo. Get a QC-checked 9:16 Reel for IG, TikTok & 小紅書 in 2–3 days, from $59. We audited 105 AI failure modes so yours ships right.',
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
        <link rel="alternate" type="text/plain" href="/llms.txt" title="AI Video Auditor — LLM reference" />
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'AI Video Auditor',
            url: 'https://www.aivideoauditor.com',
            description: 'Done-for-you AI product video studio for DTC brands. We audited 105 AI video failure modes across 8 platforms — every clip QC-gated before delivery. From $59.',
            logo: 'https://www.aivideoauditor.com/icon-192.png',
            image: 'https://www.aivideoauditor.com/og-image.jpg',
            telephone: '',
            email: 'contact@aivideoauditor.com',
            areaServed: 'Worldwide',
            serviceType: 'AI Product Video Production',
            priceRange: '$59 – $229',
            sameAs: ['https://x.com/AIVideoAuditor'],
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'AI Product Video Packages',
              itemListElement: [
                { '@type': 'Offer', name: '1 Product Video', price: '59', priceCurrency: 'USD', description: '9:16 vertical format, 2-3 day turnaround, 1 free revision' },
                { '@type': 'Offer', name: '3-Video Project', price: '149', priceCurrency: 'USD', description: 'Three clips, one brand set, 9:16 vertical, 1 free revision per clip' },
                { '@type': 'Offer', name: '5-Video Project', price: '229', priceCurrency: 'USD', description: 'Full product launch kit, 9:16 vertical, 1 free revision per clip' },
              ],
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
