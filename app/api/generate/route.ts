// app/api/generate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { submitGeneration as klingSubmit } from '@/lib/kling-client';
import { submitGeneration as runwaySubmit } from '@/lib/runway-client';
import { submitGeneration as seedanceSubmit } from '@/lib/seedance-client';
import type { Provider, VideoModel } from '@/lib/providers';
import { providerFor } from '@/lib/providers';
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

  const videoModel = (model as VideoModel) ?? 'kling-v1';
  const provider: Provider = providerFor(videoModel);
  const dur = (duration as 5 | 10) ?? 5;
  const trimmedPrompt = (prompt as string).trim();

  try {
    let taskId: string;

    if (provider === 'runway') {
      taskId = await runwaySubmit(apiKey, { prompt: trimmedPrompt, duration: dur });
    } else if (provider === 'seedance') {
      taskId = await seedanceSubmit(apiKey, { prompt: trimmedPrompt, model: videoModel, duration: dur });
    } else {
      const req: GenerationRequest = {
        prompt: trimmedPrompt,
        model: videoModel as GenerationRequest['model'],
        mode: (mode as GenerationRequest['mode']) ?? 'std',
        duration: dur,
      };
      taskId = await klingSubmit(apiKey, req);
    }

    return NextResponse.json({ taskId, provider });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Generation submission failed';
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
