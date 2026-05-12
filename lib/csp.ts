// lib/csp.ts

export function buildCSP(): string {
  const directives: Record<string, string[]> = {
    'default-src':               ["'self'"],
    'script-src':                ["'self'", "'unsafe-inline'"],
    'style-src':                 ["'self'", "'unsafe-inline'"],
    'img-src':                   ["'self'", 'data:', 'https://www.google.com', 'https://api.qrserver.com'],
    'font-src':                  ["'self'", 'https://fonts.gstatic.com'],
    'connect-src':               [
      "'self'",
      'https://*.supabase.co',
      'https://api.dev.runwayml.com',
      'https://ark.cn-beijing.volces.com',
      'https://aivideoauditor-extension.vercel.app',
      'https://api.aivideoauditor.com',
    ],
    'media-src':                 ["'self'", 'https://*.klingai.com'],
    'frame-src':                 ['https://checkout.stripe.com', 'https://js.stripe.com'],
    'script-src-elem':           ["'self'", "'unsafe-inline'", 'https://js.stripe.com'],
    'object-src':                ["'none'"],
    'base-uri':                  ["'self'"],
    'form-action':               ["'self'"],
    'upgrade-insecure-requests': [],
  };

  return Object.entries(directives)
    .map(([key, vals]) => (vals.length ? `${key} ${vals.join(' ')}` : key))
    .join('; ');
}
