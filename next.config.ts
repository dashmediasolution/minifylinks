import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.1.35"],
  images: {
    
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', // Allow all paths from Cloudinary
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '3mb', // Bumps the 1MB restriction up to 10MB safely
    },
  },
};

export default nextConfig;
