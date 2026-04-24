'use client';
import type { KlingModel, KlingMode, KlingDuration } from '@/lib/cost';

export type { KlingModel, KlingMode, KlingDuration };

const KLING_MODELS: { id: KlingModel; label: string; badge: string }[] = [
  { id: 'kling-v1',   label: 'Kling v1',   badge: 'Standard' },
  { id: 'kling-v1-5', label: 'Kling v1.5', badge: 'Enhanced' },
];

const COMING_SOON = ['Runway Gen-4', 'Seedance'];

export function ModelSelector({
  model, onModelChange,
  mode,  onModeChange,
  duration, onDurationChange,
}: {
  model:    KlingModel;    onModelChange:    (m: KlingModel)    => void;
  mode:     KlingMode;     onModeChange:     (m: KlingMode)     => void;
  duration: KlingDuration; onDurationChange: (d: KlingDuration) => void;
}) {
  const activeBtn = 'bg-neon-purple/20 border-neon-purple/40 text-neon-purple';
  const idleBtn   = 'bg-elevated border-border text-ink-secondary hover:border-neon-purple/30';

  return (
    <div className="space-y-3">
      <div>
        <p className="text-xs font-medium text-ink-muted mb-1.5">Model</p>
        <div className="flex gap-2 flex-wrap">
          {KLING_MODELS.map(m => (
            <button
              key={m.id}
              onClick={() => onModelChange(m.id)}
              className={`py-1.5 px-3 rounded-lg text-xs font-medium border transition-all ${model === m.id ? activeBtn : idleBtn}`}
            >
              {m.label} <span className="opacity-50">{m.badge}</span>
            </button>
          ))}
          {COMING_SOON.map(label => (
            <button key={label} disabled className="py-1.5 px-3 rounded-lg text-xs border border-border text-ink-muted opacity-30 cursor-not-allowed">
              {label} <span className="opacity-70">Phase 3</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <p className="text-xs font-medium text-ink-muted mb-1.5">Quality</p>
          <div className="flex gap-2">
            {(['std', 'pro'] as KlingMode[]).map(m => (
              <button
                key={m}
                onClick={() => onModeChange(m)}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium border transition-all ${mode === m ? activeBtn : idleBtn}`}
              >
                {m === 'std' ? 'Standard' : 'Pro'}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <p className="text-xs font-medium text-ink-muted mb-1.5">Duration</p>
          <div className="flex gap-2">
            {([5, 10] as KlingDuration[]).map(d => (
              <button
                key={d}
                onClick={() => onDurationChange(d)}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium border transition-all ${duration === d ? activeBtn : idleBtn}`}
              >
                {d}s
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
