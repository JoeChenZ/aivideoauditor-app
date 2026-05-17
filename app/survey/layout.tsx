import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AVA Research Survey',
  description: 'Help us decide what to build next. 4-min survey for AI video creators.',
  robots: { index: false, follow: false },
};

export default function SurveyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
