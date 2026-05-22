import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'AIVideoAuditor — See what AI video platforms actually deliver before you subscribe';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OG() {
  // Load Fraunces for the headline (editorial serif).
  // Inter for the subhead.
  const fraunces = await fetch(
    'https://fonts.gstatic.com/s/fraunces/v32/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib1603gg7S2nfgRYIctxX64yZeMt0g0Q.woff'
  ).then((r) => r.arrayBuffer());

  const inter = await fetch(
    'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZhrib2Bg-4.woff'
  ).then((r) => r.arrayBuffer());

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
        { name: 'Fraunces', data: fraunces, style: 'normal', weight: 600 },
        { name: 'Inter', data: inter, style: 'normal', weight: 400 },
      ],
    },
  );
}
