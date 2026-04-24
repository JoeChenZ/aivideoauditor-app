import { generateKlingJWT, parseApiKey } from './kling-auth';

const KLING_BASE = 'https://api.klingai.com';

export interface GenerationRequest {
  prompt: string;
  model: 'kling-v1' | 'kling-v1-5';
  mode: 'std' | 'pro';
  duration: 5 | 10;
}

export interface TaskStatus {
  taskId: string;
  status: 'submitted' | 'processing' | 'succeed' | 'failed';
  videoUrl?: string;
}

export async function submitGeneration(
  apiKey: string,
  request: GenerationRequest
): Promise<string> {
  const { accessKeyId, accessKeySecret } = parseApiKey(apiKey);
  const jwt = generateKlingJWT(accessKeyId, accessKeySecret);

  const response = await fetch(`${KLING_BASE}/v1/videos/text2video`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: request.model,
      prompt: request.prompt,
      duration: request.duration,
      aspect_ratio: '16:9',
      mode: request.mode,
    }),
  });

  if (!response.ok) {
    throw new Error(`Kling API error: ${response.status}`);
  }

  const data = await response.json();
  if (data.code !== 0) throw new Error(data.message || 'Generation submission failed');
  return data.data.task_id as string;
}

export async function getTaskStatus(
  apiKey: string,
  taskId: string
): Promise<TaskStatus> {
  const { accessKeyId, accessKeySecret } = parseApiKey(apiKey);
  const jwt = generateKlingJWT(accessKeyId, accessKeySecret);

  const response = await fetch(`${KLING_BASE}/v1/videos/text2video/${taskId}`, {
    headers: { 'Authorization': `Bearer ${jwt}` },
  });

  if (!response.ok) {
    throw new Error(`Kling API error: ${response.status}`);
  }

  const data = await response.json();
  const task = data.data;

  return {
    taskId: task.task_id as string,
    status: task.task_status as TaskStatus['status'],
    videoUrl: task.task_result?.videos?.[0]?.url as string | undefined,
  };
}
