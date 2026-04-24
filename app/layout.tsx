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
  title: 'AI Video Auditor — BYOK Infrastructure Manager',
  description: 'Bring your own API keys. Route smarter. Pay less.',
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
