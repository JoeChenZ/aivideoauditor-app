import { NextResponse } from 'next/server';
import { checkVendorHealth } from '@/lib/vendor-health';

export const revalidate = 30;

export interface VendorStatus {
  vendor: string;
  label: string;
  up: boolean;
  latencyMs?: number;
  available: boolean;
}

export async function GET() {
  const klingResult = await checkVendorHealth('https://api.klingai.com', 5000);

  const statuses: VendorStatus[] = [
    {
      vendor: 'kling',
      label: 'Kling AI',
      up: klingResult.up,
      latencyMs: klingResult.latencyMs,
      available: true,
    },
    {
      vendor: 'runway',
      label: 'Runway Gen-4',
      up: false,
      available: false,
    },
    {
      vendor: 'seedance',
      label: 'Seedance',
      up: false,
      available: false,
    },
  ];

  return NextResponse.json(statuses);
}
