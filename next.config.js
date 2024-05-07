require("dotenv").config();

module.exports = {
  swcMinify: true,
  env: {
    SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL,
    PODCASTS_FAUNA_DB_SECRET: process.env.PODCASTS_FAUNA_DB_SECRET,
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
