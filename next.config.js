require("dotenv").config();

module.exports = {
  env: {
    SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL,
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
