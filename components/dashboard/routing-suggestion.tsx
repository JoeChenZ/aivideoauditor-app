'use client';
import { useMemo } from 'react';
import { getECtSRecommendation } from '@/lib/routing';
import type { KlingModel, KlingMode, KlingDuration } from '@/lib/cost';

interface Props {
  prompt: string;
  onApply: (model: KlingModel, mode: KlingMode, duration: KlingDuration) => void;
}

export function RoutingSuggestion({ prompt, onApply }: Props) {
  const rec = useMemo(() => {
    if (!prompt.trim()) return null;
    return getECtSRecommendation(prompt);
  }, [prompt]);

  if (!rec) return null;

  return (
    <div className="flex items-start gap-3 bg-neon-blue/5 border border-neon-blue/20 rounded-lg px-4 py-3">
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-neon-blue mb-0.5">Smart Routing Suggestion</p>
        <p className="text-xs text-ink-secondary leading-relaxed">{rec.reason}</p>
      </div>
      <button
        onClick={() => onApply(rec.model, rec.mode, rec.duration)}
        className="flex-shrink-0 text-xs font-semibold text-neon-blue bg-neon-blue/10 hover:bg-neon-blue/20 border border-neon-blue/30 px-3 py-1.5 rounded-lg transition-all"
      >
        Apply →
      </button>
    </div>
  );
}
