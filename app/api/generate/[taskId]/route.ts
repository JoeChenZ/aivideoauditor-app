// app/api/generate/[taskId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getTaskStatus as klingStatus } from '@/lib/kling-client';
import { getTaskStatus as runwayStatus } from '@/lib/runway-client';
import { getTaskStatus as seedanceStatus } from '@/lib/seedance-client';
import type { Provider } from '@/lib/providers';

export async function GET(
  request: NextRequest,
  { params }: { params: { taskId: string } }
) {
  const apiKey = request.headers.get('x-api-key');
  if (!apiKey) {
    return NextResponse.json({ error: 'x-api-key header required' }, { status: 401 });
  }

  const provider = (request.headers.get('x-provider') ?? 'kling') as Provider;

  try {
    let status;
    if (provider === 'runway') {
      status = await runwayStatus(apiKey, params.taskId);
    } else if (provider === 'seedance') {
      status = await seedanceStatus(apiKey, params.taskId);
    } else {
      status = await klingStatus(apiKey, params.taskId);
    }
    return NextResponse.json(status);
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Status check failed';
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
