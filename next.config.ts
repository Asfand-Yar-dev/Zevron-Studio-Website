import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Development only: let phones and tunnels load the dev server's scripts.
  // Without this, Next.js blocks them, so the page renders but nothing interactive works.
  // Has no effect on the production build.
  allowedDevOrigins: [
    "*.ngrok-free.app", // ngrok free tunnels (subdomain changes every run)
    "*.ngrok-free.dev",
    "*.ngrok.app",
    "192.168.*.*", // devices on the same Wi-Fi, e.g. http://192.168.100.32:3000
  ],
  // Next.js 16 only allows quality 75 by default; team portraits use 90 so faces stay sharp.
  images: {
    qualities: [75, 90],
  },
};

export default nextConfig;
