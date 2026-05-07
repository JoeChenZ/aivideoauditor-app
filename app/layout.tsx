import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
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

export const metadata: Metadata = {
  title: 'AIVideoAuditor — Stop Losing Runway Credits to Failed AI Videos',
  description: 'Free Chrome extension for Runway Gen-4. Flags bad prompts before you generate, diagnoses failures with AI, and drafts your refund email in one click.',
  keywords: 'runway gen-4, ai video generation, runway credits refund, ai video failure, runway ml refund, ai video auditor',
  openGraph: {
    title: 'AIVideoAuditor — Stop Losing Runway Credits',
    description: 'Free AI failure diagnosis + one-click refund email for Runway Gen-4. Protect your credits before and after generation.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} bg-void text-ink-primary antialiased`}>
        <Nav />
        <div className="pt-14">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
