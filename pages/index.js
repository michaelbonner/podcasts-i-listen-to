import { Helmet } from "react-helmet";
import podcasts from "../data/podcasts";
import "../styles/index.css";

function Home() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Podcasts I Listen To</title>
        <link rel="canonical" href="https://podcasts.michaelbonner.dev" />
        <link rel="icon" href="/static/favicon.ico" />
        <meta name="viewport" content="width=device-width" />
      </Helmet>
      <div className="bg-orange-400 text-white py-8 mb-8">
        <div className="container mx-auto">
          <h1 className="text-center text-4xl">Podcasts I Listen To</h1>
        </div>
      </div>
      <div className="flex flex-wrap container mx-auto items-start">
        {podcasts.map(podcast => {
          return (
            <a
              key={podcast.title}
              className="w-full lg:w-1/2 lg:w-1/6 p-4 text-center"
              href={podcast.url}
              target="_blank"
            >
              <img
                className="mx-auto my-4 rounded shadow"
                alt={`${podcast.title} Poster`}
                src={podcast.image}
              />
              <div dangerouslySetInnerHTML={{ __html: podcast.title }} />
            </a>
          );
        })}
      </div>
      <div className="bg-gray-200 py-6">
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
          <h2 className="text-xl">
            Overcast<sup>®</sup>
          </h2>
          <p>
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
        </div>
      </div>
    </>
  );
}

export default Home;
