export interface HealthResult {
  up: boolean;
  latencyMs?: number;
  error?: string;
}

export async function checkVendorHealth(
  baseUrl: string,
  timeoutMs: number
): Promise<HealthResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const start = Date.now();

  try {
    await fetch(baseUrl, {
      method: 'HEAD',
      signal: controller.signal,
      cache: 'no-store',
    });
    clearTimeout(timer);
    return { up: true, latencyMs: Date.now() - start };
  } catch (err) {
    clearTimeout(timer);
    return {
      up: false,
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}
