'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';

export default function PricingTrack({ source }: { source?: string }) {
  useEffect(() => {
    track('pricing_page_viewed', { source: source ?? 'direct' });
  }, [source]);

  return null;
}
