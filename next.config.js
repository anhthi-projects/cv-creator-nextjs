const path = require("path");

const nextConfig = {
  // reactStrictMode: true,
  useFileSystemPublicRoutes: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
  },
};

module.exports = nextConfig;
