import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't advertise the framework/version via the X-Powered-By response header.
  poweredByHeader: false,
  // Explicit even though it's the Next.js default — surfaces double-invoked
  // effects/renders in dev so bugs show up before production.
  reactStrictMode: true,
};

export default nextConfig;
