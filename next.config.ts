import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com", "i.natgeofe.com"],
  },

  experimental: {
    turbo: {
      resolveAlias: {
        "@": require.resolve("."),
      },
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);
