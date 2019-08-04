const mongoose = require("mongoose");

const password = encodeURIComponent("QzU>jw3dq?yLmvqrUrKik*Ny");
const uri = `mongodb+srv://michael:${password}@cluster0-urfp2.mongodb.net/podcastsilistento?retryWrites=true&w=majority`;

const db = mongoose.connect(uri, {
  useNewUrlParser: true
});

const Podcast = require("../server/models/podcastModel");

exports.handler = async (event, context) => {
  const podcasts = await Podcast.find({});

  console.log(podcasts);

  return {
    statusCode: 200,
    body: JSON.stringify(podcasts)
  };
};
