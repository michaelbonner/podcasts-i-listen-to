const mongoose = require("mongoose");

const dotEnvResult = require("dotenv").config({ path: __dirname + '/../.env' });

if (dotEnvResult.error) {
  throw dotEnvResult.error;
}

const password = encodeURIComponent(process.env.MONGO_DB_PASSWORD);
const uri = `mongodb+srv://${process.env.MONGO_DB_USER}:${password}@cluster0-urfp2.mongodb.net/podcastsilistento?retryWrites=true&w=majority`;

const db = mongoose.connect(uri, {
  useNewUrlParser: true
});

const Podcast = require("./podcastModel");

exports.handler = async (event, context) => {
  const podcasts = await Podcast.find({}).sort('title');

  return {
    statusCode: 200,
    body: JSON.stringify(podcasts)
  };
};
