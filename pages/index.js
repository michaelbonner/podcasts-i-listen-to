import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import MainLayout from "../layouts/main";
import podcasts from "../data/podcasts";
import ContactForm from "../components/ContactForm";

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
  const [toggleFilters, setToggleFilters] = useState(false);
  const [search, setSearch] = useState("");
  const [toggleSearch, setToggleSearch] = useState(false);

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
      .filter(
        (podcast) =>
          !search ||
          podcast.sortTitle.toLowerCase().includes(search.toLowerCase())
      )
      .filter((podcast) => podcast.rating >= ratingFilter)
      .filter((podcast) => !tagFilter || podcast.tags.includes(tagFilter));
    setFilteredPodcasts(filteredOnes);
  }, [ratingFilter, search, sortedPodcasts, tagFilter]);

  return (
    <MainLayout>
      <div className="bg-indigo-100 pt-8 pb-16">
        {/* Filters */}
        <div className="container mx-auto px-4 text-right flex flex-wrap justify-end">
          <div className="w-2/3 lg:w-auto pr-0 lg:pr-4">
            {toggleSearch ? (
              <div className="relative flex items-center bg-white rounded py-2 px-3 shadow">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mr-4 px-3"
                  htmlFor="search"
                >
                  Search
                </label>
                <input
                  className="appearance-none block w-full lg:w-64 bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="search"
                  id="search"
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  value={search}
                />
                {search.length ? (
                  <button
                    className={`absolute right-0 mr-3 px-2`}
                    onClick={() => setSearch("")}
                  >
                    X
                  </button>
                ) : null}
              </div>
            ) : (
              <div className="w-full lg:w-auto text-right flex justify-end">
                <button
                  className="flex items-center bg-white rounded p-4 shadow focus:outline-none focus:bg-gray-300 font-semibold text-gray-600 text-sm"
                  onClick={() => setToggleSearch(!toggleSearch)}
                >
                  Search
                  <svg
                    className="w-5 h-5 ml-2 text-indigo-600 stroke-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="512"
                    height="512"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M221.09,64A157.09,157.09,0,1,0,378.18,221.09,157.1,157.1,0,0,0,221.09,64Z"
                      style={{
                        fill: "none",
                        strokeMiterlimit: 10,
                        strokeWidth: "32px",
                      }}
                    />
                    <line
                      x1="338.29"
                      y1="338.29"
                      x2="448"
                      y2="448"
                      style={{
                        fill: "none",
                        strokeLinecap: "round",
                        strokeMiterlimit: 10,
                        strokeWidth: "32px",
                      }}
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
          <div className="w-1/3 lg:w-auto text-right flex justify-end">
            <button
              className={`flex items-center ${
                toggleFilters
                  ? "bg-indigo-600 text-indigo-100"
                  : "bg-white text-gray-600"
              } rounded py-2 px-4 shadow focus:outline-none font-semibold text-sm`}
              onClick={() => setToggleFilters(!toggleFilters)}
            >
              Filters
              <svg
                className={`w-5 h-5 ml-2 ${
                  toggleFilters ? "text-indigo-200" : "text-indigo-600"
                } fill-current`}
                xmlns="http://www.w3.org/2000/svg"
                width="512"
                height="512"
                viewBox="0 0 512 512"
              >
                <path d="M472,168H40a24,24,0,0,1,0-48H472a24,24,0,0,1,0,48Z" />
                <path d="M392,280H120a24,24,0,0,1,0-48H392a24,24,0,0,1,0,48Z" />
                <path d="M296,392H216a24,24,0,0,1,0-48h80a24,24,0,0,1,0,48Z" />
              </svg>
            </button>
          </div>
        </div>
        {toggleFilters && (
          <div className="flex flex-wrap container mx-auto justify-between mt-3">
            <div className="w-full lg:w-1/2">
              <h3 className="font-semibold text-lg text-indigo-800 mt-6 lg:mt-0 mx-4">
                Rating
              </h3>
              <div className="flex flex-wrap justify-start items-center px-2 text-yellow-500 text-sm">
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
            </div>
            <div className="w-full lg:w-1/2">
              <h3 className="font-semibold text-lg text-indigo-800 mt-6 lg:mt-0 mx-4">
                Tags
              </h3>
              <div className="flex flex-wrap items-center lg:justify-start lg:mt-0 px-2 text-yellow-500 text-sm">
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
            </div>
          </div>
        )}
        {/* End filters */}

        <div className="flex flex-wrap container mx-auto mt-4 items-stretch">
          {filteredPodcasts.length ? (
            filteredPodcasts.map((podcast) => {
              return (
                <div
                  key={podcast.title}
                  className="w-full h-full md:w-1/2 p-4 overflow-x-hidden"
                >
                  <div className="flex bg-white items-center rounded-lg shadow-lg w-full">
                    <a
                      href={podcast.url}
                      target="_blank"
                      className="w-2/5 lg:w-1/4"
                    >
                      <LazyLoadImage
                        className="rounded-lg rounded-r-none w-full"
                        alt={`${podcast.title} Poster`}
                        height={400}
                        src={podcast.image}
                        width={400}
                      />
                    </a>
                    <div className="w-3/5 lg:w-3/4 px-6 flex flex-col justify-between">
                      <div>
                        <p className="text-xl font-semibold truncate">
                          <a href={podcast.url} target="_blank">
                            <span
                              dangerouslySetInnerHTML={{
                                __html: podcast.title,
                              }}
                            />
                          </a>
                        </p>
                        <div className="my-1">
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
        <div className="max-w-2xl mx-auto mt-12 bg-white rounded-lg px-6 lg:px-12 py-4">
          <h3 className="text-2xl font-bold text-indigo-800 mt-3">
            Got a podcast I should check out?
          </h3>
          <ContactForm />
        </div>
      </div>
    </MainLayout>
  );
}

export default Home;
