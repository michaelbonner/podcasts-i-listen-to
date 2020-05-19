require("dotenv").config();

module.exports = {
  env: {
    SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL,
    FAUNA_DB_SECRET: process.env.FAUNA_DB_SECRET,
    FAUNA_DB_ENDPOINT: "https://graphql.fauna.com/graphql",
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
};
