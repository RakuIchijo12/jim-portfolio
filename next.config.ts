import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    const immutableAssetHeaders = [
      {
        key: "Cache-Control",
        value: "public, max-age=31536000, immutable",
      },
    ];

    return [
      {
        source: "/jim-cafe-portrait-optimized.webp",
        headers: immutableAssetHeaders,
      },
      {
        source: "/portfolio-hero-optimized.webp",
        headers: immutableAssetHeaders,
      },
      {
        source: "/stack-icons/:path*",
        headers: immutableAssetHeaders,
      },
      {
        source: "/ai-icons/:path*",
        headers: immutableAssetHeaders,
      },
      {
        source: "/projects/:path*",
        headers: immutableAssetHeaders,
      },
      {
        source: "/:path*.mp3",
        headers: immutableAssetHeaders,
      },
      {
        source: "/Rodado-Resume-2026.pdf",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
