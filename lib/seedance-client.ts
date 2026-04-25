// lib/seedance-client.ts
import type { TaskStatus } from './providers';

const SEEDANCE_BASE = 'https://ark.cn-beijing.volces.com/api/v3';

function headers(apiKey: string): Record<string, string> {
  return {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };
}

export async function submitGeneration(
  apiKey: string,
  request: { prompt: string; model: string; duration: 5 | 10 }
): Promise<string> {
  const res = await fetch(`${SEEDANCE_BASE}/contents/generations/tasks`, {
    method: 'POST',
    headers: headers(apiKey),
    body: JSON.stringify({
      model: request.model,
      content: [{ type: 'text', text: request.prompt }],
      parameters: { duration: request.duration },
    }),
  });

  if (!res.ok) throw new Error(`Seedance API error: ${res.status}`);
  const data = await res.json();
  return data.id as string;
}

export async function getTaskStatus(
  apiKey: string,
  taskId: string
): Promise<TaskStatus> {
  const res = await fetch(
    `${SEEDANCE_BASE}/contents/generations/tasks/${taskId}`,
    { headers: headers(apiKey) }
  );

  if (!res.ok) throw new Error(`Seedance API error: ${res.status}`);
  const data = await res.json();

  const statusMap: Record<string, TaskStatus['status']> = {
    running: 'processing',
    succeeded: 'succeed',
    failed: 'failed',
  };

  return {
    taskId: data.id as string,
    status: statusMap[data.status as string] ?? 'processing',
    videoUrl: (data.content as Array<{ video_url?: string }> | undefined)?.[0]?.video_url,
  };
}
