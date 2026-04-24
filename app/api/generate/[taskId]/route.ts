import { NextRequest, NextResponse } from 'next/server';
import { getTaskStatus } from '@/lib/kling-client';

export async function GET(
  request: NextRequest,
  { params }: { params: { taskId: string } }
) {
  const apiKey = request.headers.get('x-api-key');
  if (!apiKey) {
    return NextResponse.json({ error: 'x-api-key header required' }, { status: 401 });
  }

  try {
    const status = await getTaskStatus(apiKey, params.taskId);
    return NextResponse.json(status);
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Status check failed';
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
