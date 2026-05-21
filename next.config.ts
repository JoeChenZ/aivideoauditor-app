import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
};

export default nextConfig;
