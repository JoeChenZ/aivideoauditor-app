import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AVA Pro Early Access — Founders\' Pricing',
  description: 'Lock in 6 months of AVA Pro at $50. Founders\' round, limited slots.',
  robots: { index: false, follow: false },
};

export default function EarlyAccessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
