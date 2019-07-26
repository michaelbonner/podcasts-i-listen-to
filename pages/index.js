import { Helmet } from "react-helmet";
import podcasts from "../data/podcasts";
import "../styles/index.css";

function Home({ podcasts }) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Podcasts I Listen To</title>
        <link rel="canonical" href="https://podcasts.michaelbonner.dev" />
        <link rel="icon" href="/static/favicon.ico" />
        <meta name="viewport" content="width=device-width" />
      </Helmet>
      <div className="bg-indigo-900 text-indigo-100 py-12">
        <div className="container mx-auto flex flex-wrap items-center justify-center">
          <h1 className="text-center text-5xl">The Podcasts I Listen To</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="icon-microphone w-12 h-12 ml-4"
          >
            <path
              className="secondary text-indigo-400 fill-current"
              d="M12 1a4 4 0 0 1 4 4v6a4 4 0 1 1-8 0V5a4 4 0 0 1 4-4z"
            />
            <path
              className="primary text-indigo-600 fill-current"
              d="M13 18.94V21h3a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2h3v-2.06A8 8 0 0 1 4 11a1 1 0 0 1 2 0 6 6 0 1 0 12 0 1 1 0 0 1 2 0 8 8 0 0 1-7 7.94z"
            />
          </svg>
        </div>
      </div>
      <div className="bg-gray-200 py-16">
        <div className="flex flex-wrap container mx-auto items-stretch">
          {podcasts.map(podcast => {
            return (
              <div key={podcast.title} className="w-full h-full md:w-1/2 p-4">
                <div className="flex bg-white items-center rounded-lg shadow-lg w-full">
                  <a href={podcast.url} target="_blank" className="w-1/3">
                    <img
                      className="rounded-lg rounded-r-none"
                      alt={`${podcast.title} Poster`}
                      src={podcast.image}
                    />
                  </a>
                  <p className="w-2/3 pl-4 text-xl font-semibold">
                    <a href={podcast.url} target="_blank">
                      <span
                        dangerouslySetInnerHTML={{ __html: podcast.title }}
                      />
                    </a>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="bg-gray-800 text-gray-100 pt-16 pb-4">
        <div className="text-center container mx-auto">
          <h2 className="text-2xl font-semibold">
            Check out Overcast, it's free
          </h2>
          <a href="https://overcast.fm/">
            <img
              className="mx-auto w-2/3 lg:w-1/3 lg:w-1/5"
              src="https://overcast.fm/img/logo.svg?3"
              alt="overcast"
            />
          </a>
          <h2 className="text-2xl font-semibold pt-4">
            Overcast<sup>®</sup>
          </h2>
          <p className="text-gray-500 pb-4">
            A powerful yet simple podcast player for iPhone, iPad, and Apple
            Watch.
          </p>

          <a href="https://itunes.apple.com/us/app/overcast-podcast-player/id888422857?ls=1&amp;mt=8">
            <img
              className="mx-auto py-4"
              src="https://overcast.fm/img/appstore.svg"
              alt="Download"
            />
          </a>

          <p className="pt-16 text-gray-300">
            &copy; {new Date().getFullYear()}{" "}
            <a href="https://michaelbonner.dev/">Michael Bonner</a>
            <span className="px-4">&ndash;</span>
            <a className="pr-4" href="https://github.com/michaelbonner">
              GitHub
            </a>
            <a href="https://www.instagram.com/mbonner4/">Instagram</a>
          </p>
        </div>
      </div>
    </>
  );
}

Home.getInitialProps = async () => {
  return { podcasts };
};

export default Home;
