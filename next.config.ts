import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/embed',
        destination: '/embed.html',
      },
    ];
  },
};

export default nextConfig;
