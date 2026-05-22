import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'AIVideoAuditor — See what AI video platforms actually deliver before you subscribe';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OG() {
  // Load Fraunces (editorial serif) + Inter (sans body) from Google Fonts.
  // The actual woff/ttf URLs are resolved from the CSS API at build/request time
  // to avoid hardcoding URLs that get versioned.
  async function fetchFont(family: string, weight = 400, italic = false): Promise<ArrayBuffer> {
    const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:${italic ? 'ital,' : ''}wght@${italic ? '1,' : ''}${weight}&display=swap`;
    const css = await fetch(cssUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }).then((r) => r.text());
    const urlMatch = css.match(/url\((https:[^)]+)\)/);
    if (!urlMatch) throw new Error(`Font URL not found in CSS for ${family}`);
    return fetch(urlMatch[1]).then((r) => r.arrayBuffer());
  }

  const [fraunces, inter] = await Promise.all([
    fetchFont('Fraunces', 600).catch(() => null),
    fetchFont('Inter', 400).catch(() => null),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#050507',
          padding: 72,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontFamily: 'Inter, sans-serif',
          color: '#f1f5f9',
          position: 'relative',
        }}
      >
        {/* Background grain */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 800px 400px at 80% 20%, rgba(251,191,36,0.06), transparent 60%), radial-gradient(ellipse 600px 600px at 0% 100%, rgba(167,139,250,0.05), transparent 70%)',
          }}
        />

        {/* Top: masthead */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, zIndex: 1 }}>
          <span
            style={{
              fontFamily: 'Inter',
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#fbbf24',
            }}
          >
            ● AIVideoAuditor
          </span>
          <span style={{ color: '#252533' }}>/</span>
          <span
            style={{
              fontFamily: 'Inter',
              fontSize: 14,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#94a3b8',
            }}
          >
            v0.2 · vendor research desk
          </span>
        </div>

        {/* Middle: headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, zIndex: 1, maxWidth: 1050 }}>
          <h1
            style={{
              fontFamily: 'Fraunces',
              fontSize: 84,
              lineHeight: 1.02,
              letterSpacing: '-0.02em',
              fontWeight: 600,
              margin: 0,
              color: '#f1f5f9',
            }}
          >
            See what AI video platforms <span style={{ color: '#fbbf24', fontStyle: 'italic' }}>actually deliver</span> before you subscribe.
          </h1>

          <p
            style={{
              fontFamily: 'Inter',
              fontSize: 24,
              lineHeight: 1.4,
              color: '#94a3b8',
              margin: 0,
              maxWidth: 900,
            }}
          >
            132-review Trustpilot corpus across 8 vendors · 105 documented failure modes · live pre-purchase prompt scoring · free Chrome extension.
          </p>
        </div>

        {/* Bottom: footer rule + url */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1,
            borderTop: '1px solid #252533',
            paddingTop: 20,
          }}
        >
          <div style={{ display: 'flex', gap: 32, fontFamily: 'Inter', fontSize: 14, color: '#475569', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            <span>132 reviews</span>
            <span>8 vendors</span>
            <span>105 failure modes</span>
            <span>$0 to install</span>
          </div>
          <span
            style={{
              fontFamily: 'Inter',
              fontSize: 18,
              fontWeight: 600,
              color: '#f1f5f9',
              letterSpacing: '-0.01em',
            }}
          >
            aivideoauditor.com
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        ...(fraunces ? [{ name: 'Fraunces', data: fraunces, style: 'normal' as const, weight: 600 as const }] : []),
        ...(inter ? [{ name: 'Inter', data: inter, style: 'normal' as const, weight: 400 as const }] : []),
      ],
    },
  );
}
