/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.klingai.com' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/failures/runway-limb-distortion',
        destination: '/failures/runway-limb-artifact',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/icon.png',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/favicon.ico',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/icon-192.png',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;
