const fs = require("fs");
const path = __dirname + "/.env";
if (fs.existsSync(path)) {
  const dotEnvResult = require("dotenv").config();

  if (dotEnvResult.error) {
    throw dotEnvResult.error;
  }

  process.env.FUNCTIONS_HOST = dotEnvResult.parsed.FUNCTIONS_HOST;
  process.env.MONGO_DB_USER = dotEnvResult.parsed.MONGO_DB_USER;
  process.env.MONGO_DB_PASSWORD = dotEnvResult.parsed.MONGO_DB_PASSWORD;

  module.exports = {
    env: {
      FUNCTIONS_HOST: process.env.FUNCTIONS_HOST,
      MONGO_DB_USER: process.env.MONGO_DB_USER,
      MONGO_DB_PASSWORD: process.env.MONGO_DB_PASSWORD
    }
  };
}

const withCSS = require("@zeit/next-css");
module.exports = withCSS({});
