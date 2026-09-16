import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AIVideoAuditor — Free Chrome Extension',
  description: 'Free Chrome extension that scores your AI-video prompt before you click Generate.',
  robots: { index: false, follow: false },
};

export default function EarlyAccessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
