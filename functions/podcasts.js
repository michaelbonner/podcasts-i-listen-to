const mongoose = require("mongoose");
const fs = require("fs");

const path = __dirname + "/../.env";
if (fs.existsSync(path)) {
  const dotEnvResult = require("dotenv").config({ path: path });

  if (dotEnvResult.error) {
    throw dotEnvResult.error;
  }

  process.env.FUNCTIONS_HOST = dotEnvResult.parsed.FUNCTIONS_HOST;
  process.env.MONGO_DB_USER = dotEnvResult.parsed.MONGO_DB_USER;
  process.env.MONGO_DB_PASSWORD = dotEnvResult.parsed.MONGO_DB_PASSWORD;
}

const password = encodeURIComponent(process.env.MONGO_DB_PASSWORD);
const uri = `mongodb+srv://${
  process.env.MONGO_DB_USER
}:${password}@cluster0-urfp2.mongodb.net/podcastsilistento?retryWrites=true&w=majority`;

const db = mongoose.connect(uri, {
  useNewUrlParser: true
});

const Podcast = require("./podcastModel");

exports.handler = async (event, context) => {
  const podcasts = await Podcast.find({}).sort("title");

  return {
    statusCode: 200,
    body: JSON.stringify(podcasts)
  };
};
