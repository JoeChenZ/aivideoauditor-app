import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Tool retired',
  robots: { index: false, follow: false },
};

export default function RefundLetterGeneratorRetired() {
  redirect('/');
}
