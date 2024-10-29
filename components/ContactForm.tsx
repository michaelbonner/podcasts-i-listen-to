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
        <div className="py-2 px-4 mt-4 text-orange-700 bg-orange-100 rounded border border-orange-500">
          <p>{errorMessage}</p>
        </div>
      )}
      <div className="flex flex-wrap px-2 -mx-3 mt-2 mb-6 lg:pr-4 lg:pl-8">
        <div className="grid gap-2 w-full lg:grid-cols-2">
          <div className="px-3 mt-6 w-full">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
              htmlFor="your-name"
            >
              Your Name
            </label>
            <input
              autoComplete="name"
              className="block py-3 px-4 w-full leading-tight text-gray-700 bg-gray-200 rounded border border-gray-200 appearance-none focus:bg-white focus:border-gray-500 focus:outline-none"
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
          <div className="px-3 mt-6 w-full">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
              htmlFor="podcast-name"
            >
              Podcast Name
            </label>
            <input
              className="block py-3 px-4 w-full leading-tight text-gray-700 bg-gray-200 rounded border border-gray-200 appearance-none focus:bg-white focus:border-gray-500 focus:outline-none"
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
        <div className="px-3 mt-6 w-full">
          <label
            className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
            htmlFor="podcast-url"
          >
            Podcast URL
          </label>
          <input
            className="block py-3 px-4 w-full leading-tight text-gray-700 bg-gray-200 rounded border border-gray-200 appearance-none focus:bg-white focus:border-gray-500 focus:outline-none"
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
          <div className="px-4 pt-6 my-4 w-full border-t">
            <h3 className="text-xl font-bold text-sky-700">
              Thank you for your recommendation!
            </h3>
          </div>
        )}
        <div className="flex flex-wrap gap-8 justify-between items-end px-3 mt-8 w-full">
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
