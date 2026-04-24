'use client';

export type GenState = 'idle' | 'submitting' | 'processing' | 'done' | 'error';

export function VideoResult({
  state,
  videoUrl,
  error,
}: {
  state:     GenState;
  videoUrl?: string;
  error?:    string;
}) {
  if (state === 'idle') return null;

  if (state === 'submitting' || state === 'processing') {
    return (
      <div className="bg-surface border border-border rounded-xl p-8 text-center">
        <div className="inline-flex items-center gap-3 text-ink-secondary text-sm">
          <span className="h-4 w-4 border-2 border-neon-purple border-t-transparent rounded-full animate-spin inline-block" />
          {state === 'submitting' ? 'Submitting to Kling AI...' : 'Generating your video...'}
        </div>
        <p className="text-xs text-ink-muted mt-2">This typically takes 1–3 minutes</p>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className="bg-surface border border-neon-red/30 rounded-xl p-6 text-center">
        <p className="text-neon-red text-sm font-medium">Generation failed</p>
        <p className="text-xs text-ink-muted mt-1">{error}</p>
      </div>
    );
  }

  if (state === 'done' && videoUrl) {
    return (
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <video src={videoUrl} controls autoPlay loop muted className="w-full" />
        <div className="px-4 py-3 flex items-center justify-between border-t border-border">
          <span className="text-xs text-ink-secondary">Generation complete</span>
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-neon-purple hover:underline"
          >
            Open full size →
          </a>
        </div>
      </div>
    );
  }

  return null;
}
