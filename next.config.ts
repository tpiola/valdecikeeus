import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    unoptimized: false,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },
};

export default {
  ...nextConfig,
  async redirects() {
    return [
      { source: "/carrinho", destination: "/checkout", permanent: false },
      { source: "/cart", destination: "/checkout", permanent: false },
    ];
  },
};

