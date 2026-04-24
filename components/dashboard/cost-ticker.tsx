'use client';
import { calculateCost } from '@/lib/cost';
import type { GenerationSettings } from '@/lib/cost';

export function CostTicker({ settings }: { settings: GenerationSettings }) {
  const cost = calculateCost(settings);
  return (
    <div className="flex items-center gap-3 bg-neon-purple/5 border border-neon-purple/20 rounded-lg px-4 py-2.5">
      <span className="text-xs text-ink-muted">Estimated cost</span>
      <span className="ml-auto font-mono font-bold text-neon-green text-sm">
        ${cost.toFixed(2)}
      </span>
      <span className="text-xs text-ink-muted">/ generation</span>
    </div>
  );
}
