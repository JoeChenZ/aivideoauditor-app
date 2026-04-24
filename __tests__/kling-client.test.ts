const mockFetch = jest.fn();
global.fetch = mockFetch as typeof fetch;

import { submitGeneration, getTaskStatus } from '../lib/kling-client';
import type { GenerationRequest } from '../lib/kling-client';

const BASE_REQUEST: GenerationRequest = {
  prompt: 'A cat playing piano',
  model: 'kling-v1',
  mode: 'std',
  duration: 5,
};

beforeEach(() => { mockFetch.mockReset(); });

describe('submitGeneration', () => {
  it('returns taskId on success', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        code: 0,
        data: { task_id: 'task-abc-123', task_status: 'submitted' },
      }),
    });

    const taskId = await submitGeneration('myid:mysecret', BASE_REQUEST);
    expect(taskId).toBe('task-abc-123');
  });

  it('calls the correct Kling endpoint', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ code: 0, data: { task_id: 'x', task_status: 'submitted' } }),
    });

    await submitGeneration('id:secret', BASE_REQUEST);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.klingai.com/v1/videos/text2video',
      expect.objectContaining({ method: 'POST' })
    );
  });

  it('sends Authorization: Bearer header', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ code: 0, data: { task_id: 'x', task_status: 'submitted' } }),
    });

    await submitGeneration('id:secret', BASE_REQUEST);
    const [, options] = mockFetch.mock.calls[0];
    expect(options.headers['Authorization']).toMatch(/^Bearer /);
  });

  it('throws on HTTP error', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 401 });
    await expect(submitGeneration('id:secret', BASE_REQUEST)).rejects.toThrow('401');
  });

  it('throws when API code is non-zero', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ code: 1002, message: 'Invalid API key' }),
    });
    await expect(submitGeneration('id:secret', BASE_REQUEST)).rejects.toThrow('Invalid API key');
  });
});

describe('getTaskStatus', () => {
  it('returns succeed status with videoUrl', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        code: 0,
        data: {
          task_id: 'task-abc',
          task_status: 'succeed',
          task_result: {
            videos: [{ id: 'v1', url: 'https://cdn.klingai.com/video.mp4', duration: '5' }],
          },
        },
      }),
    });

    const status = await getTaskStatus('id:secret', 'task-abc');
    expect(status.status).toBe('succeed');
    expect(status.videoUrl).toBe('https://cdn.klingai.com/video.mp4');
    expect(status.taskId).toBe('task-abc');
  });

  it('returns processing status with no videoUrl', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        code: 0,
        data: { task_id: 'task-abc', task_status: 'processing' },
      }),
    });

    const status = await getTaskStatus('id:secret', 'task-abc');
    expect(status.status).toBe('processing');
    expect(status.videoUrl).toBeUndefined();
  });

  it('sends task_id in URL path', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ code: 0, data: { task_id: 'my-task', task_status: 'processing' } }),
    });

    await getTaskStatus('id:secret', 'my-task');
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.klingai.com/v1/videos/text2video/my-task',
      expect.anything()
    );
  });

  it('throws on HTTP error', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 404 });
    await expect(getTaskStatus('id:secret', 'bad-task')).rejects.toThrow('404');
  });
});
