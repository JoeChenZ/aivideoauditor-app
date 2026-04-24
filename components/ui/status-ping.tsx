type PingStatus = 'online' | 'degraded' | 'offline';

const colorMap: Record<PingStatus, string> = {
  online:   'bg-neon-green',
  degraded: 'bg-neon-amber',
  offline:  'bg-neon-red',
};

export function StatusPing({ status }: { status: PingStatus }) {
  return (
    <span className="relative flex h-2 w-2">
      <span
        className={`animate-ping absolute inline-flex h-full w-full rounded-full ${colorMap[status]} opacity-75`}
      />
      <span className={`relative inline-flex rounded-full h-2 w-2 ${colorMap[status]}`} />
    </span>
  );
}
