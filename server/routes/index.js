const express = require("express");
const router = express.Router();
const Podcast = require("../models/podcastModel");
const podcastData = require("../../data/podcasts");

router.get("/", (req, res) => {
  Podcast.find({}, (err, podcasts) => {
    res.json(podcasts);
  });
});
router.use("/seed", (req, res, next) => {
  podcastData.podcasts.map(function(podcast, index) {
    Podcast.countDocuments({ title: podcast.title }, function(err, count) {
      if (err) {
        console.log(err);
      }
      if (!count) {
        const newPodcast = new Podcast({ ...podcast });
        newPodcast.save(function(err) {
          if (err) return handleError(err);
          // saved!
        });
      }
    });
  });

  Podcast.find({}, (err, podcasts) => {
    res.json(podcasts);
  });
});
router.use("/:id", (req, res, next) => {
  console.log(req.params.id);
  Podcast.findById(req.params.id, (err, podcast) => {
    if (err) res.status(500).send(err);
    else req.podcast = podcast;
    next();
  });
});
router
  .get("/:id", (req, res) => {
    return res.json(req.podcast);
  })
  .put("/:id", (req, res) => {
    Object.keys(req.body).map(key => {
      req.podcast[key] = req.body[key];
    });
    req.podcast.save();
    res.json(req.podcast);
  });
module.exports = router;
