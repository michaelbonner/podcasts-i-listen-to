require("dotenv").config();

module.exports = {
  env: {
    SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL,
    FAUNA_DB_SECRET: process.env.FAUNA_DB_SECRET,
    FAUNA_DB_ENDPOINT: "https://graphql.fauna.com/graphql",
  },
  images: {
    domains: [
      "is1-ssl.mzstatic.com",
      "is2-ssl.mzstatic.com",
      "is3-ssl.mzstatic.com",
      "is4-ssl.mzstatic.com",
      "is5-ssl.mzstatic.com",
      "is6-ssl.mzstatic.com",
      "is7-ssl.mzstatic.com",
      "is8-ssl.mzstatic.com",
      "is9-ssl.mzstatic.com",
    ],
  },
};
