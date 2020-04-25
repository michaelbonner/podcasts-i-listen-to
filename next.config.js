const fs = require("fs");
const path = __dirname + "/.env";
if (fs.existsSync(path)) {
  const dotEnvResult = require("dotenv").config();

  if (dotEnvResult.error) {
    throw dotEnvResult.error;
  }

  process.env.SLACK_WEBHOOK_URL = dotEnvResult.parsed.SLACK_WEBHOOK_URL;

  module.exports = {
    env: {
      SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL,
    },
  };
}

const withCSS = require("@zeit/next-css");
module.exports = withCSS({});
