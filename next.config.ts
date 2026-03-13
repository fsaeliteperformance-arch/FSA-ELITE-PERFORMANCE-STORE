import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow images served from our own domain and common CDN origins.
    // Restricting to known origins prevents open-redirect abuse.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.fsaeliteperformance.com",
      },
      // Placeholder images used in development only
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
    // Pre-defined sizes lets the browser pick the smallest adequate image,
    // reducing bandwidth for mobile visitors.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/avif", "image/webp"],
  },

  // Compress responses with gzip/brotli at the edge; reduces payload by ~70 %.
  compress: true,

  // Experimental features
  experimental: {
    // Automatically re-use previously generated pages when the data has not
    // changed (Partial Pre-Rendering preview).
    ppr: false,
  },
};

export default nextConfig;
