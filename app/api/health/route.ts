// app/api/health/route.ts
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
  const [klingResult, runwayResult, seedanceResult] = await Promise.all([
    checkVendorHealth('https://api.klingai.com', 5000),
    checkVendorHealth('https://api.dev.runwayml.com', 5000),
    checkVendorHealth('https://ark.cn-beijing.volces.com', 5000),
  ]);

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
      up: runwayResult.up,
      latencyMs: runwayResult.latencyMs,
      available: true,
    },
    {
      vendor: 'seedance',
      label: 'Seedance',
      up: seedanceResult.up,
      latencyMs: seedanceResult.latencyMs,
      available: true,
    },
  ];

  return NextResponse.json(statuses);
}
