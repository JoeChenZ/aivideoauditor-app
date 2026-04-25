// components/dashboard/model-selector.tsx
'use client';
import type { VideoModel, Provider } from '@/lib/providers';
import { modelUsesMode } from '@/lib/providers';
import type { KlingMode } from '@/lib/cost';

export type { VideoModel };

interface ModelEntry {
  id: VideoModel;
  label: string;
  badge: string;
  provider: Provider;
}

const ALL_MODELS: ModelEntry[] = [
  { id: 'kling-v1',        label: 'Kling v1',   badge: 'Standard', provider: 'kling'    },
  { id: 'kling-v1-5',      label: 'Kling v1.5', badge: 'Enhanced', provider: 'kling'    },
  { id: 'runway-gen4',     label: 'Runway Gen-4', badge: 'Turbo',    provider: 'runway'   },
  { id: 'seedance-1-lite', label: 'Seedance',    badge: 'Lite',     provider: 'seedance' },
  { id: 'seedance-1-pro',  label: 'Seedance',    badge: 'Pro',      provider: 'seedance' },
];

export function ModelSelector({
  model, onModelChange,
  mode,  onModeChange,
  duration, onDurationChange,
}: {
  model: VideoModel;        onModelChange:    (m: VideoModel)       => void;
  mode: KlingMode | null;   onModeChange:     (m: KlingMode | null) => void;
  duration: 5 | 10;         onDurationChange: (d: 5 | 10)          => void;
}) {
  const activeBtn = 'bg-neon-purple/20 border-neon-purple/40 text-neon-purple';
  const idleBtn   = 'bg-elevated border-border text-ink-secondary hover:border-neon-purple/30';
  const showMode  = modelUsesMode(model);

  function handleModelChange(m: VideoModel) {
    onModelChange(m);
    if (!modelUsesMode(m)) onModeChange(null);
    else if (mode === null) onModeChange('std');
  }

  return (
    <div className="space-y-3">
      <div>
        <p className="text-xs font-medium text-ink-muted mb-1.5">Model</p>
        <div className="flex gap-2 flex-wrap">
          {ALL_MODELS.map(m => (
            <button
              key={m.id}
              onClick={() => handleModelChange(m.id)}
              className={`py-1.5 px-3 rounded-lg text-xs font-medium border transition-all ${model === m.id ? activeBtn : idleBtn}`}
            >
              {m.label} <span className="opacity-50">{m.badge}</span>
            </button>
          ))}
        </div>
      </div>

      {showMode && (
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
              {([5, 10] as const).map(d => (
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
      )}

      {!showMode && (
        <div>
          <p className="text-xs font-medium text-ink-muted mb-1.5">Duration</p>
          <div className="flex gap-2 max-w-[160px]">
            {([5, 10] as const).map(d => (
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
      )}
    </div>
  );
}
