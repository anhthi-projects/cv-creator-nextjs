const path = require("path");

const withBundleStats = require("next-plugin-bundle-stats");

const nextConfig = {
  reactStrictMode: true,
  useFileSystemPublicRoutes: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
    prependData: `
      @import "/src/styles/_variables.scss";
      @import "/src/styles/_mixins.scss";
    `,
  },
};

module.exports = withBundleStats()(nextConfig);
