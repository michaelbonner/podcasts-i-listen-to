require("dotenv").config();

module.exports = {
  swcMinify: true,
  env: {
    SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL,
    FAUNA_DB_SECRET: process.env.FAUNA_DB_SECRET,
    FAUNA_DB_ENDPOINT: "https://graphql.fauna.com/graphql",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.mzstatic.com",
      },
    ],
  },
};
