import { Turnstile } from "@marsidev/react-turnstile";
import { useState } from "react";

const ContactForm = () => {
  const [submitState, setSubmitState] = useState("initial");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    your_name: "",
    podcast_name: "",
    podcast_url: "",
  });

  const [token, setToken] = useState("");

  const onSubmit = async (e: any) => {
    e.preventDefault();

    setSubmitState("submitting");

    try {
      const submit = await fetch(e.target.action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          token,
        }),
      });
      const response = await submit.json();
      if (response.success) {
        setFormData({
          your_name: "",
          podcast_name: "",
          podcast_url: "",
        });
        setSubmitState("submitted");
      } else {
        setErrorMessage(response.data);
        setSubmitState("error");
      }
    } catch (error) {
      console.error("submit error", error);
      setErrorMessage(
        "There was a problem connecting to the API. Please let me know so I can get it fixed."
      );
      setSubmitState("error");
    }
  };

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
      <div className="flex flex-wrap -mx-3 mb-6 mt-2 px-2 lg:pl-8 lg:pr-4">
        <div className="w-full grid lg:grid-cols-2 gap-2">
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
              onChange={(e) =>
                setFormData((previous) => ({
                  ...previous,
                  your_name: e.target.value,
                }))
              }
              placeholder=""
              required
              type="text"
              value={formData.your_name}
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
              onChange={(e) =>
                setFormData((previous) => ({
                  ...previous,
                  podcast_name: e.target.value,
                }))
              }
              placeholder=""
              required
              type="text"
              value={formData.podcast_name}
            />
          </div>
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
            onChange={(e) =>
              setFormData((previous) => ({
                ...previous,
                podcast_url: e.target.value,
              }))
            }
            placeholder="https://"
            required
            type="url"
            value={formData.podcast_url}
          />
        </div>
        {submitState === "submitted" && (
          <div className="my-4 pt-6 border-t w-full px-4">
            <h3 className="text-sky-700 font-bold text-xl">
              Thank you for your recommendation!
            </h3>
          </div>
        )}
        <div className="w-full flex flex-wrap justify-between items-end px-3 mt-8 gap-8">
          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
            onSuccess={(token) => setToken(token)}
            options={{
              theme: "light",
            }}
          />
          <div className="pb-1.5">
            <button
              disabled={submitState === "submitting" || !token}
              className={`shadow bg-sky-600 hover:bg-sky-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded transition-all ${
                (submitState === "submitting" || !token) && `opacity-70`
              }`}
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default ContactForm;
