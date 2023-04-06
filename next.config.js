const path = require("path");

const withBundleStats = require("next-plugin-bundle-stats");

const nextConfig = {
  reactStrictMode: true,
  useFileSystemPublicRoutes: false,
};

module.exports = withBundleStats()(nextConfig);
