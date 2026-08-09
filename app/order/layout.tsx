import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Order a Video — AI Product Video Studio',
  description: 'Turn your product photo into a scroll-stopping 9:16 reel for TikTok, Instagram, or 小紅書. From $59 · 2-3 day turnaround · 1 free revision.',
  alternates: { canonical: 'https://www.aivideoauditor.com/order' },
};
export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
