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
      <div className="bg-indigo-900 shadow-lg text-white py-12">
        <div className="container mx-auto">
          <h1 className="text-center text-5xl">The Podcasts I Listens To</h1>
        </div>
      </div>
      <div className="bg-gray-200 py-16">
        <div className="flex flex-wrap container mx-auto items-stretch">
          {podcasts.map(podcast => {
            return (
              <div
                key={podcast.title}
                className="w-full h-full md:w-1/2 p-4"
              >
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
                      {podcast.title}
                    </a>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="bg-gray-800 text-white pt-16 pb-4">
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
            &copy; {new Date().getFullYear()} <a href="https://michaelbonner.dev/">Michael Bonner</a>
            <span className="px-4">&ndash;</span>
            <a className="pr-4" href="https://github.com/michaelbonner">GitHub</a>
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
