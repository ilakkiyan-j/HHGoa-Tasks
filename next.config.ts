import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/task-1',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
