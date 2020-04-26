require("dotenv").config();

const withCSS = require("@zeit/next-css");
module.exports = withCSS({
  env: {
    SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL,
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }

    return config;
  },
});
