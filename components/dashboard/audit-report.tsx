// components/dashboard/audit-report.tsx
import { aggregatorCostsFor } from '@/lib/aggregator-prices';
import type { GenerationSettings } from '@/lib/cost';

export function AuditReport({
  settings,
  actualCost,
}: {
  settings: GenerationSettings;
  actualCost: number;
}) {
  if (actualCost === 0) return null;

  const competitors = aggregatorCostsFor(settings.duration);

  function savingsPct(competitor: number): number | null {
    if (competitor <= 0) return null;
    return Math.round((1 - actualCost / competitor) * 100);
  }

  return (
    <div className="bg-surface border border-border rounded-xl p-4 animate-fade-in">
      <p className="text-xs font-bold tracking-widest text-ink-muted uppercase mb-3">Cost Audit</p>
      <div className="flex gap-3 items-stretch">

        {/* Left: You paid */}
        <div className="flex flex-col items-center justify-center bg-neon-green/5 border border-neon-green/20 rounded-lg px-5 py-3 min-w-[100px]">
          <span className="text-xs text-ink-muted mb-1">You paid</span>
          <span className="text-2xl font-bold text-neon-green">${actualCost.toFixed(2)}</span>
        </div>

        {/* Right: Competitor rows */}
        <div className="flex flex-col gap-2 flex-1 justify-center">
          {competitors.map(c => (
            <div
              key={c.key}
              className="flex items-center justify-between bg-elevated rounded-lg px-3 py-2"
            >
              <span className="text-xs text-ink-muted">{c.label}</span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-ink-muted line-through">${c.cost.toFixed(2)}</span>
                {(() => {
                  const pct = savingsPct(c.cost);
                  if (pct === null) return null;
                  if (pct === 0) return <span className="text-xs text-ink-muted">same cost</span>;
                  return pct > 0
                    ? <span className="text-xs font-semibold text-neon-green">−{pct}%</span>
                    : <span className="text-xs font-semibold text-neon-red">+{Math.abs(pct)}% over</span>;
                })()}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
