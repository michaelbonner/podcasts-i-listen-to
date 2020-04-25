const { IncomingWebhook } = require("@slack/webhook");
const bodyParser = require("body-parser");

const postToSlack = async (text) => {
  try {
    const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);

    // Send the notification
    (async () => {
      await webhook.send({
        text,
      });
    })();
    return true;
  } catch (error) {
    return false;
  }
};

export default async (req, res) => {
  res.setHeader("Content-Type", "application/json");

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

  if (
    postToSlack(
      `${req.body.your_name} thinks you should check out <${req.body.podcast_url}|${req.body.podcast_name}>`
    )
  ) {
    res.statusCode = 200;
    res.end(JSON.stringify({ success: true, data: "Sent notification" }));
  } else {
    res.statusCode = 400;
    res.end(
      JSON.stringify({ success: false, data: "Could not send notification" })
    );
  }
  return;
};
