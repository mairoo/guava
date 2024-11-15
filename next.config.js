/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: false,
  compiler: {
    removeConsole: true,
  },
};

module.exports = withBundleAnalyzer(nextConfig);
