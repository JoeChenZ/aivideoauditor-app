// lib/csp.ts

export function buildCSP(): string {
  const directives: Record<string, string[]> = {
    'default-src':               ["'self'"],
    'script-src':                ["'self'"],
    'style-src':                 ["'self'", "'unsafe-inline'"],
    'img-src':                   ["'self'", 'data:'],
    'font-src':                  ["'self'", 'https://fonts.gstatic.com'],
    'connect-src':               [
      "'self'",
      'https://*.supabase.co',
      'https://api.dev.runwayml.com',
      'https://ark.cn-beijing.volces.com',
    ],
    'media-src':                 ["'self'", 'https://*.klingai.com'],
    'frame-src':                 ["'none'"],
    'object-src':                ["'none'"],
    'base-uri':                  ["'self'"],
    'form-action':               ["'self'"],
    'upgrade-insecure-requests': [],
  };

  return Object.entries(directives)
    .map(([key, vals]) => (vals.length ? `${key} ${vals.join(' ')}` : key))
    .join('; ');
}
