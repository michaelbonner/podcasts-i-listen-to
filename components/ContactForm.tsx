import { Turnstile } from "@marsidev/react-turnstile";
import { useState } from "react";

const ContactForm = () => {
  const [submitState, setSubmitState] = useState("initial");
  const [errorMessage, setErrorMessage] = useState("");

  const [yourName, setYourName] = useState("");
  const [podcastName, setPodcastName] = useState("");
  const [podcastUrl, setPodcastUrl] = useState("");
  const [token, setToken] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    setSubmitState("submitting");

    try {
      const submit = await fetch(e.target.action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          your_name: yourName,
          podcast_name: podcastName,
          podcast_url: podcastUrl,
          token,
        }),
      });
      const response = await submit.json();
      if (response.success) {
        setSubmitState("submitted");
      } else {
        setErrorMessage(response.data);
        setSubmitState("error");
      }
    } catch (error) {
      setErrorMessage(
        "There was a problem connecting to the API. Please let me know so I can get it fixed."
      );
      setSubmitState("error");
    }
  };

  if (submitState === "submitted") {
    return (
      <div className="my-4 pt-6 border-t">
        <h3 className="text-sky-700 font-bold text-xl">
          Thank you for your recommendation!
        </h3>
      </div>
    );
  }

  return (
    <form
      action="/api/podcast-suggestion"
      className={`transition-opacity ${
        submitState === "submitting" && "opacity-50"
      }`}
      method="POST"
      onSubmit={onSubmit}
    >
      {submitState === "error" && (
        <div className="mt-4 bg-orange-100 border border-orange-500 text-orange-700 rounded py-2 px-4">
          <p>{errorMessage}</p>
        </div>
      )}
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3 mt-6">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="your-name"
          >
            Your Name
          </label>
          <input
            autoComplete="name"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="your-name"
            name="your_name"
            onChange={(e) => setYourName(e.target.value)}
            placeholder=""
            required
            type="text"
            value={yourName}
          />
        </div>
        <div className="w-full px-3 mt-6">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="podcast-name"
          >
            Podcast Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="podcast-name"
            name="podcast_name"
            onChange={(e) => setPodcastName(e.target.value)}
            placeholder=""
            required
            type="text"
            value={podcastName}
          />
        </div>
        <div className="w-full px-3 mt-6">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="podcast-url"
          >
            Podcast URL
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="podcast-url"
            name="podcast_url"
            onChange={(e) => setPodcastUrl(e.target.value)}
            placeholder="https://"
            required
            type="url"
            value={podcastUrl}
          />
        </div>
        <div className="w-full flex flex-wrap justify-end items-end px-3 mt-8 gap-8">
          <div>
            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
              onSuccess={(token) => setToken(token)}
              options={{
                theme: "light",
              }}
            />
          </div>
          <div>
            <button
              disabled={submitState === "submitting" || !token}
              className={`shadow bg-sky-600 hover:bg-sky-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded transition-all ${
                (submitState === "submitting" || !token) && `opacity-70`
              }`}
              type="submit"
            >
              Send it
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default ContactForm;
