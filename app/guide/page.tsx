import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Page retired',
  robots: { index: false, follow: false },
};

export default function GuideRetired() {
  redirect('/');
}
