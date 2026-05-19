'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';

export default function ProSuccessTrack() {
  useEffect(() => {
    track('pro_subscription_started', {
      source: 'pro_success_page',
    });
  }, []);

  return null;
}
