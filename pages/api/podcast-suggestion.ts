import { IncomingWebhook } from "@slack/webhook";
import { Client, fql } from "fauna";
import type { NextApiRequest, NextApiResponse } from "next";

const client = new Client({
  secret: process.env.PODCASTS_FAUNA_DB_SECRET,
});

type TurnstileResponse = {
  success: boolean;
};
const verifyTurnstileToken = async (
  token: string
): Promise<TurnstileResponse> => {
  const body = `secret=${encodeURIComponent(
    process.env.TURNSTILE_SECRET
  )}&response=${encodeURIComponent(token)}`;

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    }
  );

  const data = (await res.json()) as TurnstileResponse;
  return data;
};

type ReturnData = {
  success: boolean;
  data: string;
};

const createRecommendationEntry = async (
  yourName: string,
  podcastName: string,
  podcastUrl: string
): Promise<any> => {
  try {
    const query = fql`
    Recommendation.create({
      your_name: ${yourName},
      podcast_name: ${podcastName},
      podcast_url: ${podcastUrl},
    })`;

    const response = await client.query(query);
    return response;
  } catch (error) {
    console.error("error", error);
    return false;
  }
};

const postToSlack = async (text: string) => {
  try {
    const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);
    return await webhook.send({
      text,
    });
  } catch (error) {
    console.error("error", error);
    return false;
  }
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ReturnData>
) => {
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

  // captcha
  const captchaVerification = await verifyTurnstileToken(req.body.token);

  // if the captcha fails, assume it's a bot and give them a fail
  if (captchaVerification.success !== true) {
    res.statusCode = 400;
    return res.end(
      JSON.stringify({ success: false, data: "Could not send notification" })
    );
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
export default handler;
