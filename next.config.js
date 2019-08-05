const dotEnvResult = require("dotenv").config();

if (dotEnvResult.error) {
  throw dotEnvResult.error;
}

module.exports = {
  env: {
    FUNCTIONS_HOST: process.env.FUNCTIONS_HOST,
    MONGO_DB_USER: process.env.MONGO_DB_USER,
    MONGO_DB_PASSWORD: process.env.MONGO_DB_PASSWORD,
  }
};

const withCSS = require("@zeit/next-css");
module.exports = withCSS({});
