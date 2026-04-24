'use client';
import { useState, useEffect } from 'react';
import type { VendorStatus } from '@/app/api/health/route';

function StatusDot({ up, available }: { up: boolean; available: boolean }) {
  if (!available) {
    return <span className="h-2 w-2 rounded-full bg-ink-muted opacity-40 inline-block" />;
  }
  return (
    <span
      className={`h-2 w-2 rounded-full inline-block ${
        up ? 'bg-neon-green animate-pulse' : 'bg-neon-red'
      }`}
    />
  );
}

export function HealthBoard() {
  const [statuses, setStatuses] = useState<VendorStatus[]>([]);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  async function fetchHealth() {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        setStatuses(await res.json());
        setLastChecked(new Date());
      }
    } catch {
      // silently fail — health board is non-critical
    }
  }

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 30_000);
    return () => clearInterval(interval);
  }, []);

  if (statuses.length === 0) return null;

  return (
    <div className="bg-surface border border-border rounded-xl px-4 py-3">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-semibold text-ink-secondary">Vendor Status</p>
        {lastChecked && (
          <p className="text-xs text-ink-muted">
            Checked {lastChecked.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
      </div>
      <div className="flex gap-4 flex-wrap">
        {statuses.map(s => (
          <div key={s.vendor} className="flex items-center gap-1.5">
            <StatusDot up={s.up} available={s.available} />
            <span className="text-xs text-ink-secondary">{s.label}</span>
            {s.available && s.up && s.latencyMs !== undefined && (
              <span className="text-xs text-ink-muted">{s.latencyMs}ms</span>
            )}
            {!s.available && (
              <span className="text-xs text-ink-muted opacity-50">Phase 4</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
