import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'AIVideoAuditor — See what AI video platforms actually deliver before you subscribe';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OG() {
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
          color: '#f1f5f9',
          position: 'relative',
        }}
      >
        {/* Background warmth — Satori only supports linear-gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            background: 'linear-gradient(135deg, rgba(251,191,36,0.04) 0%, transparent 40%, rgba(167,139,250,0.04) 100%)',
          }}
        />

        {/* Top: masthead */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, zIndex: 1 }}>
          <span
            style={{
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#fbbf24',
            }}
          >
            AIVideoAuditor
          </span>
          <span style={{ color: '#252533' }}>/</span>
          <span
            style={{
              fontSize: 14,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#94a3b8',
            }}
          >
            v0.2 / vendor research desk
          </span>
        </div>

        {/* Middle: headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, zIndex: 1, maxWidth: 1050 }}>
          <div
            style={{
              fontSize: 88,
              lineHeight: 1.02,
              letterSpacing: '-0.02em',
              fontWeight: 700,
              color: '#f1f5f9',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>See what AI video platforms</span>
            <span>
              <span style={{ color: '#fbbf24' }}>actually deliver</span>
              <span> before you subscribe.</span>
            </span>
          </div>

          <div
            style={{
              fontSize: 26,
              lineHeight: 1.4,
              color: '#94a3b8',
              maxWidth: 920,
              display: 'flex',
            }}
          >
            132-review Trustpilot corpus across 8 vendors / 105 documented failure modes / live pre-purchase prompt scoring / free Chrome extension.
          </div>
        </div>

        {/* Bottom: evidence bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1,
            borderTop: '1px solid #252533',
            paddingTop: 22,
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 32,
              fontSize: 15,
              color: '#64748b',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            <span>132 reviews</span>
            <span>8 vendors</span>
            <span>105 failure modes</span>
            <span>$0 to install</span>
          </div>
          <span
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: '#f1f5f9',
              letterSpacing: '-0.01em',
            }}
          >
            aivideoauditor.com
          </span>
        </div>
      </div>
    ),
    size,
  );
}
