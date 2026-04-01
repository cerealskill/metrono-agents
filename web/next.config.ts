import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      },
    ],
  },
  // Ensure agents route is treated as dynamic
  experimental: {
    // Turbopack may not respect force-dynamic in some versions — disable for agents
  },
};

export default nextConfig;
