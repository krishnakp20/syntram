import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Job applications include a résumé (max 3 MB); leave room for form overhead.
      bodySizeLimit: "4mb",
    },
  },
};

export default nextConfig;
