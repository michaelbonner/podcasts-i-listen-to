import type { APIRoute } from "astro";

export const prerender = false;

type TurnstileResponse = {
  success: boolean;
};

const verifyTurnstileToken = async (
  token: string
): Promise<TurnstileResponse> => {
  const body = `secret=${encodeURIComponent(
    import.meta.env.TURNSTILE_SECRET
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

  return (await res.json()) as TurnstileResponse;
};

const postToTelegram = async (text: string) => {
  try {
    const res = await fetch(
      `https://api.telegram.org/bot${import.meta.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          chat_id: import.meta.env.TELEGRAM_CHAT_ID,
          text,
          parse_mode: "HTML",
        }),
      }
    );
    return res.ok;
  } catch (error) {
    console.error("error", error);
    return false;
  }
};

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });

export const POST: APIRoute = async ({ request }) => {
  if (
    !import.meta.env.TELEGRAM_BOT_TOKEN ||
    !import.meta.env.TELEGRAM_CHAT_ID
  ) {
    return json(
      {
        success: false,
        data: "The server is not configured correctly to accept this request. Please let me know.",
      },
      400
    );
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return json({ success: false, data: "Missing form details" }, 400);
  }
  if (!body.podcast_name) {
    return json({ success: false, data: "Missing podcast name" }, 400);
  }
  if (!body.podcast_url) {
    return json({ success: false, data: "Missing podcast url" }, 400);
  }
  if (!body.your_name) {
    return json({ success: false, data: "Missing your name" }, 400);
  }

  const captcha = await verifyTurnstileToken(body.token);
  if (captcha.success !== true) {
    return json({ success: false, data: "Could not send notification" }, 400);
  }

  const sent = await postToTelegram(
    `${body.your_name} thinks you should check out <a href="${body.podcast_url}">${body.podcast_name}</a>`
  );

  if (sent) {
    return json({ success: true, data: "Saved and sent notification" });
  }
  return json({ success: false, data: "Could not send notification" }, 400);
};
