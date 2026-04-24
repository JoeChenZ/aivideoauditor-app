'use client';
import type { Provider } from '@/lib/vault';

const LABELS: Record<Provider, string> = {
  runway:   'Runway',
  kling:    'Kling AI',
  seedance: 'Seedance',
  luma:     'Luma',
};

export function KeyBadge({
  provider,
  onRemove,
}: {
  provider: Provider;
  onRemove: (p: Provider) => void;
}) {
  return (
    <div className="flex items-center gap-3 bg-elevated border border-border rounded-lg px-3 py-2.5">
      <span className="flex h-2 w-2 rounded-full bg-neon-green flex-shrink-0" />
      <span className="text-sm text-ink-primary font-medium">{LABELS[provider]}</span>
      <span className="text-xs text-ink-muted font-mono tracking-widest">••••••••••••</span>
      <button
        onClick={() => onRemove(provider)}
        className="ml-auto text-xs text-ink-muted hover:text-neon-red transition-colors"
      >
        Remove
      </button>
    </div>
  );
}
