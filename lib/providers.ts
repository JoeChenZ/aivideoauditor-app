export type Provider = 'kling' | 'runway' | 'seedance';

export type VideoModel =
  | 'kling-v1'
  | 'kling-v1-5'
  | 'runway-gen4'
  | 'seedance-1-lite'
  | 'seedance-1-pro';

export interface TaskStatus {
  taskId: string;
  status: 'submitted' | 'processing' | 'succeed' | 'failed';
  videoUrl?: string;
}

export function providerFor(model: VideoModel): Provider {
  if (model === 'runway-gen4') return 'runway';
  if (model === 'seedance-1-lite' || model === 'seedance-1-pro') return 'seedance';
  return 'kling';
}

export function modelUsesMode(model: VideoModel): boolean {
  return model === 'kling-v1' || model === 'kling-v1-5';
}
