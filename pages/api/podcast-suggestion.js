const { IncomingWebhook } = require("@slack/webhook");
const fetch = require("node-fetch");

const createRecommendationEntry = async (yourName, podcastName, podcastUrl) => {
  const query = `mutation CreateRecommendation($yourName: String!, $podcastName: String!, $podcastUrl: String!) {
    createRecommendation(data: {
      your_name: $yourName,
      podcast_name: $podcastName,
      podcast_url: $podcastUrl,
    }) {
      _id
      _ts
      your_name
    }
  }`;

  const res = await fetch(process.env.FAUNA_DB_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.FAUNA_DB_SECRET}`,
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { yourName, podcastName, podcastUrl },
    }),
  });
  const data = await res.json();

  return data;
};

const postToSlack = async (text) => {
  try {
    const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);
    return await webhook.send({
      text,
    });
  } catch (error) {
    console.log("error", error);
    return false;
  }
};

const podcastSuggestion = async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (!process.env.SLACK_WEBHOOK_URL) {
    res.statusCode = 400;
    res.end(
      JSON.stringify({
        success: false,
        data: `The server is not configured correctly to accept this request. Please let me know.`,
      })
    );
    return;
  }

  if (req.method !== "POST") {
    res.statusCode = 400;
    res.end(
      JSON.stringify({
        success: false,
        data: `Must be post request. You sent ${req.method}`,
      })
    );
    return;
  }

  if (!req.body) {
    res.statusCode = 400;
    res.end(JSON.stringify({ success: false, data: "Missing form details" }));
    return;
  }

  if (!req.body.podcast_name) {
    res.statusCode = 400;
    res.end(JSON.stringify({ success: false, data: "Missing podcast name" }));
    return;
  }

  if (!req.body.podcast_url) {
    res.statusCode = 400;
    res.end(JSON.stringify({ success: false, data: "Missing podcast url" }));
    return;
  }

  if (!req.body.your_name) {
    res.statusCode = 400;
    res.end(JSON.stringify({ success: false, data: "Missing your name" }));
    return;
  }

  const saveIt = await createRecommendationEntry(
    req.body.your_name,
    req.body.podcast_name,
    req.body.podcast_url
  );

  const postIt = await postToSlack(
    `${req.body.your_name} thinks you should check out <${req.body.podcast_url}|${req.body.podcast_name}>`
  );

  if (postIt && !saveIt.errors) {
    res.statusCode = 200;
    res.end(
      JSON.stringify({ success: true, data: "Saved and sent notification" })
    );
  } else {
    console.log("saveIt", saveIt);
    console.log("postIt", postIt);
    res.statusCode = 400;
    res.end(
      JSON.stringify({ success: false, data: "Could not send notification" })
    );
  }
  return;
};

export default podcastSuggestion;
