import { NextRequest, NextResponse } from 'next/server';
import { submitGeneration } from '@/lib/kling-client';
import type { GenerationRequest } from '@/lib/kling-client';

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { apiKey, prompt, model, mode, duration } = body as Record<string, unknown>;

  if (typeof apiKey !== 'string' || !apiKey) {
    return NextResponse.json({ error: 'apiKey is required' }, { status: 400 });
  }
  if (typeof prompt !== 'string' || !prompt.trim()) {
    return NextResponse.json({ error: 'prompt is required' }, { status: 400 });
  }

  const req: GenerationRequest = {
    prompt: (prompt as string).trim(),
    model: (model as GenerationRequest['model']) ?? 'kling-v1',
    mode: (mode as GenerationRequest['mode']) ?? 'std',
    duration: (duration as GenerationRequest['duration']) ?? 5,
  };

  try {
    const taskId = await submitGeneration(apiKey as string, req);
    return NextResponse.json({ taskId });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Generation submission failed';
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
