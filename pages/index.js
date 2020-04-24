import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import MainLayout from "../layouts/main";
import podcasts from "../data/podcasts";

const Star = ({ filled }) => {
  return (
    <svg
      className={`block w-5 h-5 ${
        filled ? "text-yellow-400" : "text-gray-300"
      }`}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
    </svg>
  );
};

function Home() {
  const [ratingFilter, setRatingFilter] = useState(0);
  const [tagFilter, setTagFilter] = useState("");
  const [sortedPodcasts, setSortedPodcasts] = useState([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setSortedPodcasts(
      podcasts.sort((a, b) => {
        const titleA = a.sortTitle.toUpperCase();
        const titleB = b.sortTitle.toUpperCase();

        if (titleA > titleB) {
          return 1;
        } else if (titleA < titleB) {
          return -1;
        }
        return 0;
      })
    );
    setTags(
      Array.from(
        new Set(
          podcasts
            .map((podcast) => podcast.tags)
            .flat()
            .sort()
        )
      )
    );
  }, []);

  useEffect(() => {
    const filteredOnes = sortedPodcasts
      .filter((podcast) => podcast.rating >= ratingFilter)
      .filter((podcast) => !tagFilter || podcast.tags.includes(tagFilter));
    setFilteredPodcasts(filteredOnes);
  }, [ratingFilter, sortedPodcasts, tagFilter]);

  return (
    <MainLayout>
      <div className="bg-indigo-100 pt-8 pb-16">
        <div className="flex flex-wrap container mx-auto items-center justify-end px-2 text-yellow-500 text-sm">
          <button
            type="button"
            onClick={() => setRatingFilter(0)}
            className={`flex flex-wrap items-center mt-4 mx-2 py-2 px-4 rounded shadow-md focus:outline-none font-bold ${
              ratingFilter === 0 ? "bg-yellow-200" : "bg-white"
            } `}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setRatingFilter(3)}
            className={`flex flex-wrap items-center mt-4 mx-2 py-2 px-4 rounded shadow-md focus:outline-none ${
              ratingFilter === 3 ? "bg-yellow-200" : "bg-white"
            } `}
          >
            <Star filled={true} />
            <Star filled={true} />
            <Star filled={true} />
            <span className="font-black pl-1">+</span>
          </button>
          <button
            type="button"
            onClick={() => setRatingFilter(4)}
            className={`flex flex-wrap items-center mt-4 mx-2 py-2 px-4 rounded shadow-md focus:outline-none ${
              ratingFilter === 4 ? "bg-yellow-200" : "bg-white"
            } `}
          >
            <Star filled={true} />
            <Star filled={true} />
            <Star filled={true} />
            <Star filled={true} />
            <span className="font-black pl-1">+</span>
          </button>
          <button
            type="button"
            onClick={() => setRatingFilter(5)}
            className={`flex flex-wrap items-center mt-4 mx-2 py-2 px-4 rounded shadow-md focus:outline-none ${
              ratingFilter === 5 ? "bg-yellow-200" : "bg-white"
            } `}
          >
            <Star filled={true} />
            <Star filled={true} />
            <Star filled={true} />
            <Star filled={true} />
            <Star filled={true} />
          </button>
        </div>
        <div className="flex flex-wrap container mx-auto items-center justify-end px-2 text-yellow-500 text-sm">
          <button
            type="button"
            onClick={() => setTagFilter("")}
            className={`flex flex-wrap items-center mt-4 mx-2 py-2 px-4 rounded shadow-md focus:outline-none font-bold ${
              tagFilter === "" ? "bg-yellow-200" : "bg-white"
            } `}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              className={`flex flex-wrap items-center mt-4 mx-2 py-2 px-4 rounded shadow-md focus:outline-none font-bold ${
                tagFilter === tag ? "bg-yellow-200" : "bg-white"
              } `}
              key={tag}
              onClick={() => setTagFilter(tag)}
              type="button"
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap container mx-auto mt-4 items-stretch">
          {filteredPodcasts.length ? (
            filteredPodcasts.map((podcast) => {
              return (
                <div key={podcast.title} className="w-full h-full md:w-1/2 p-4">
                  <div className="flex bg-white items-center rounded-lg shadow-lg w-full">
                    <a href={podcast.url} target="_blank" className="w-1/4">
                      <LazyLoadImage
                        className="rounded-lg rounded-r-none w-full"
                        alt={`${podcast.title} Poster`}
                        height={400}
                        src={podcast.image}
                        width={400}
                      />
                    </a>
                    <div className="w-3/4 px-6 flex flex-col justify-between">
                      <div>
                        <p className="text-xl font-semibold">
                          <a href={podcast.url} target="_blank">
                            <span
                              dangerouslySetInnerHTML={{
                                __html: podcast.title,
                              }}
                            />
                          </a>
                        </p>
                        <div className="my-2">
                          {podcast.tags.map((tag) => (
                            <button
                              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 focus:outline-none focus:bg-gray-300"
                              key={tag}
                              onClick={() => setTagFilter(tag)}
                              type="button"
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>
                      <p className="w-1/2 flex my-2">
                        <Star filled={podcast.rating > 0} />
                        <Star filled={podcast.rating > 1} />
                        <Star filled={podcast.rating > 2} />
                        <Star filled={podcast.rating > 3} />
                        <Star filled={podcast.rating > 4} />
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="w-full h-full md:w-1/2 p-4 mx-auto">
              <div className="flex justify-center bg-white items-center rounded-lg shadow-lg w-full h-32 px-4 py-3">
                <p className="text-xl font-semibold">
                  No podcasts match that filter
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default Home;
