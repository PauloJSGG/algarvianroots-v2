import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  // consfigure hostname firebasestorage.googleapis.com
  images: {
    domains: ["firebasestorage.googleapis.com", "i.natgeofe.com"],
  },
  webpack(config) {
    // add SVG as asset
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      type: "asset/resource",
      resourceQuery: /url/, // *.svg?url
    });
    // handle svgs as icons
    config.module.rules.push({
      test: /public\/.*\.svg$/,
      issuer: /\.[jt]sx?$/,
      resourceQuery: { not: [/url/] },
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            typescript: true,
            replaceAttrValues: { "#000": "currentColor" },
            svgProps: {
              "aria-hidden": "true",
              role: "presentation",
              focusable: "false",
            },
            svgo: true,
            svgoConfig: {
              floatPrecision: 2,
              plugins: [
                {
                  name: "convertStyleToAttrs",
                },
                {
                  name: "convertPathData",
                  params: {
                    floatPrecision: 2,
                  },
                },
              ],
            },
          },
        },
      ],
    });
    return config;
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);
