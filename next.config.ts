// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add this eslint block
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors. It is recommended to fix the errors
    // for a cleaner codebase, but this will get your project deployed.
    ignoreDuringBuilds: true,
  },
  
  /* other config options might go here */
};

export default nextConfig;