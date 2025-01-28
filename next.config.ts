import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    console.log('hola');
    return [
      {
        source: '/((?!invitations).*)',
        destination: '/invitations',
        permanent: false
      }
    ];
  }
};

export default nextConfig;
