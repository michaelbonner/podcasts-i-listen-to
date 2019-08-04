const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_DEV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const mongoose = require("mongoose");

const password = encodeURIComponent("QzU>jw3dq?yLmvqrUrKik*Ny");
const uri = `mongodb+srv://michael:${password}@cluster0-urfp2.mongodb.net/podcastsilistento?retryWrites=true&w=majority`;

const db = mongoose.connect(uri, {
  useNewUrlParser: true
});

nextApp.prepare().then(() => {
  // express code here
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api/podcasts", require("./routes/index"));
  app.get("*", (req, res) => {
    return handle(req, res); // for all the react stuff
  });
  app.listen(PORT, err => {
    if (err) throw err;
    console.log(`ready at http://localhost:${PORT}`);
  });
});
