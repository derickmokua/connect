import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-*/**",
      },
    ],
  },
  // Redirects removed to restore normal routing
};

export default nextConfig;
