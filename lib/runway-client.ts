// lib/runway-client.ts
import type { TaskStatus } from './providers';

const RUNWAY_BASE = 'https://api.dev.runwayml.com/v1';
const RUNWAY_VERSION = '2024-11-06';

function headers(apiKey: string): Record<string, string> {
  return {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    'X-Runway-Version': RUNWAY_VERSION,
  };
}

export async function submitGeneration(
  apiKey: string,
  request: { prompt: string; duration: 5 | 10 }
): Promise<string> {
  const res = await fetch(`${RUNWAY_BASE}/text_to_video`, {
    method: 'POST',
    headers: headers(apiKey),
    body: JSON.stringify({
      promptText: request.prompt,
      model: 'gen4_turbo',
      duration: request.duration,
      ratio: '1280:720',
    }),
  });

  if (!res.ok) throw new Error(`Runway API error: ${res.status}`);
  const data = await res.json();
  return data.id as string;
}

export async function getTaskStatus(
  apiKey: string,
  taskId: string
): Promise<TaskStatus> {
  const res = await fetch(`${RUNWAY_BASE}/tasks/${taskId}`, {
    headers: headers(apiKey),
  });

  if (!res.ok) throw new Error(`Runway API error: ${res.status}`);
  const data = await res.json();

  const statusMap: Record<string, TaskStatus['status']> = {
    PENDING: 'processing',
    RUNNING: 'processing',
    SUCCEEDED: 'succeed',
    FAILED: 'failed',
    CANCELLED: 'failed',
  };

  return {
    taskId: data.id as string,
    status: statusMap[data.status as string] ?? 'processing',
    videoUrl: (data.output as string[] | undefined)?.[0],
  };
}
