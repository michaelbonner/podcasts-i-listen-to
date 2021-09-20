import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import MainLayout from "layouts/main";
import podcastsFileData from "data/podcasts";
import ContactForm from "components/ContactForm";

const Star = ({ filled }) => {
  return (
    <svg
      className={`block w-4 h-4 ${
        filled ? "text-yellow-500" : "text-gray-300"
      }`}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
    </svg>
  );
};

function Home({ podcasts }) {
  const [ratingFilter, setRatingFilter] = useState(0);
  const [tagFilter, setTagFilter] = useState("");
  const [sortedPodcasts, setSortedPodcasts] = useState(podcasts);
  const [filteredPodcasts, setFilteredPodcasts] = useState(podcasts);
  const [tags, setTags] = useState([]);
  const [toggleFilters, setToggleFilters] = useState(false);
  const [search, setSearch] = useState("");
  const [toggleSearch, setToggleSearch] = useState(false);
  const searchField = useRef(null);

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
  }, [podcasts]);

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

  useEffect(() => {
    if (!toggleSearch) {
      return;
    }
    searchField.current.focus();
  }, [toggleSearch]);

  useEffect(() => {
    let searchParams = new URL(document.location).searchParams;
    if (searchParams.get("search")) {
      setToggleSearch(true);
      setSearch(searchParams.get("search"));
    }
    if (searchParams.get("filter")) {
      setToggleFilters(true);
      setTags([searchParams.get("filter")]);
    }
  }, []);

  const onSearchKeyUp = (e) => {
    if (e.keyCode !== 27) {
      return;
    }
    if (search !== "") {
      setSearch("");
    } else {
      setToggleSearch(false);
    }
  };

  return (
    <MainLayout>
      <div className="main-content pt-8 pb-16">
        {/* Filters */}
        <div className="mx-auto xl:mx-12 2xl:mx-24 3xl:mx-36 4xl:mx-72 px-4 text-right flex flex-wrap justify-end">
          <div className="w-2/3 lg:w-auto pr-0 lg:pr-4">
            {toggleSearch ? (
              <div className="flex items-center">
                <div className="z-0 relative flex items-center bg-orange-100 px-2 py-2 shadow rounded-l">
                  <button
                    onClick={() => setToggleSearch(false)}
                    className="focus:outline-none active:bg-green-200 text-orange-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="512"
                      height="512"
                      viewBox="0 0 512 512"
                      className="stroke-current w-5 h-5"
                    >
                      <title>Close</title>
                      <path
                        d="M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z"
                        style={{
                          fill: "none",
                          strokeMiterlimit: 10,
                          strokeWidth: "32px",
                        }}
                      />
                      <line
                        x1="320"
                        y1="320"
                        x2="192"
                        y2="192"
                        style={{
                          fill: "none",
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: "32px",
                        }}
                      />
                      <line
                        x1="192"
                        y1="320"
                        x2="320"
                        y2="192"
                        style={{
                          fill: "none",
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: "32px",
                        }}
                      />
                    </svg>
                  </button>
                </div>
                <div className="relative z-10 flex items-center bg-white rounded py-2 px-3 shadow">
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
                    onKeyUp={(e) => onSearchKeyUp(e)}
                    ref={searchField}
                    type="text"
                    value={search}
                  />
                  {search.length ? (
                    <button
                      className={`absolute flex items-center right-0 mr-3 px-2`}
                      onClick={() => setSearch("")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="512"
                        height="512"
                        viewBox="0 0 512 512"
                        className="stroke-current text-gray-700 w-5 h-5"
                      >
                        <title>Close</title>
                        <path
                          d="M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z"
                          style={{
                            fill: "none",
                            strokeMiterlimit: 10,
                            strokeWidth: "32px",
                          }}
                        />
                        <line
                          x1="320"
                          y1="320"
                          x2="192"
                          y2="192"
                          style={{
                            fill: "none",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "32px",
                          }}
                        />
                        <line
                          x1="192"
                          y1="320"
                          x2="320"
                          y2="192"
                          style={{
                            fill: "none",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "32px",
                          }}
                        />
                      </svg>
                    </button>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className="w-full lg:w-auto text-right flex justify-end">
                <button
                  className="flex items-center bg-white rounded p-4 shadow focus:outline-none focus:bg-gray-300 font-semibold text-gray-700 text-sm"
                  onClick={() => {
                    setToggleSearch(!toggleSearch);
                  }}
                >
                  Search
                  <svg
                    className="w-5 h-5 ml-2 text-green-500 stroke-current"
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
                toggleFilters || ratingFilter || tagFilter
                  ? "bg-green-500 text-green-100"
                  : "bg-white text-gray-700"
              } rounded py-2 px-4 shadow focus:outline-none font-semibold text-sm`}
              onClick={() => setToggleFilters(!toggleFilters)}
            >
              Filters
              <svg
                className={`w-5 h-5 ml-2 ${
                  toggleFilters || ratingFilter || tagFilter
                    ? "text-green-200"
                    : "text-green-500"
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
          <div className="flex flex-wrap mx-auto justify-between mt-3">
            <div className="w-full lg:w-1/2">
              <h3 className="font-semibold text-lg text-green-800 mt-6 lg:mt-0 mx-4">
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
              <h3 className="font-semibold text-lg text-green-800 mt-6 lg:mt-0 mx-4">
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

        <div className="lg:mx-auto xl:mx-12 2xl:mx-24 3xl:mx-36 4xl:mx-72 px-4 grid gap-4 xl:gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mt-4">
          {filteredPodcasts.length ? (
            filteredPodcasts.map((podcast) => {
              return (
                <div
                  key={podcast.itunesId}
                  className="flex bg-white items-center rounded-lg shadow-lg w-full"
                >
                  <a
                    className="w-2/5 lg:w-1/4 flex items-center"
                    href={podcast.itunesData?.collectionViewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`${podcast.itunesData?.collectionName} Poster`}
                  >
                    <Image
                      className="rounded-lg rounded-r-none w-full h-full"
                      alt={`${podcast.itunesData?.collectionName} Poster`}
                      height={200}
                      src={podcast.itunesData?.artworkUrl600}
                      width={200}
                    />
                  </a>
                  <div className="w-3/5 lg:w-3/4 px-6 flex flex-col justify-between">
                    <div>
                      <p className="text-xl font-bold truncate pt-3">
                        <a
                          href={podcast.itunesData?.collectionViewUrl}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <span
                            dangerouslySetInnerHTML={{
                              __html: podcast.itunesData?.collectionName,
                            }}
                          />
                        </a>
                      </p>
                    </div>
                    <div className="lg:flex lg:flex-row-reverse justify-between">
                      <p className="flex lg:justify-end my-2">
                        <Star filled={podcast.rating > 0} />
                        <Star filled={podcast.rating > 1} />
                        <Star filled={podcast.rating > 2} />
                        <Star filled={podcast.rating > 3} />
                        <Star filled={podcast.rating > 4} />
                      </p>
                      <div className="flex flex-wrap justify-start space-x-2 mt-4 lg:my-2">
                        {podcast.tags.map((tag) => (
                          <button
                            className={`inline-block ${
                              tagFilter === tag
                                ? "bg-green-200 text-green-700"
                                : "bg-gray-200 text-gray-700"
                            } rounded px-2 py-1 text-xs font-semibold focus:outline-none`}
                            key={tag}
                            onClick={() =>
                              tagFilter === tag
                                ? setTagFilter("")
                                : setTagFilter(tag)
                            }
                            type="button"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
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
        <div className="flex justify-between max-w-3xl mx-4 lg:mx-auto mt-16 mb-4 bg-gray-400 rounded-md shadow-lg">
          <div className="lg:w-16 callout-bar rounded-l-lg"></div>
          <div className="bg-white px-6 lg:px-12 py-4 rounded-md lg:rounded-l-none">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="items-center text-2xl lg:text-3xl font-bold text-green-700 my-3 pr-8 tracking-wide">
                  Got a podcast I should check out?
                </h3>
                <p className="text-gray-700 pr-8">
                  Let me know what you&apos;re listening to. I&apos;m always
                  looking for new podcasts.
                </p>
              </div>
              <svg
                className="text-orange-200 stroke-current w-16 h-16 mt-2"
                xmlns="http://www.w3.org/2000/svg"
                width="512"
                height="512"
                viewBox="0 0 512 512"
              >
                <path
                  d="M335.72,330.76C381.73,299.5,416,251.34,416,192a160,160,0,0,0-320,0V398.57C96,442.83,131.74,480,176,480h0c44.26,0,66.83-25.94,77.29-40C268.06,420.19,295,358.44,335.72,330.76Z"
                  style={{
                    fill: "none",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "32px",
                  }}
                />
                <path
                  d="M160,304V184c0-48.4,43.2-88,96-88h0c52.8,0,96,39.6,96,88"
                  style={{
                    fill: "none",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "32px",
                  }}
                />
                <path
                  d="M160,239c25-18,79.82-15,79.82-15,26,0,41.17,29.42,26,50.6,0,0-36.86,42.4-41.86,61.4"
                  style={{
                    fill: "none",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "32px",
                  }}
                />
              </svg>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export async function getStaticProps() {
  const itunesIds = podcastsFileData
    .map((podcast) => podcast.itunesId)
    .join(",");
  const url = `https://itunes.apple.com/lookup?id=${itunesIds}`;
  const itunesRequest = await fetch(url);
  const itunesData = await itunesRequest.json();

  const merged = podcastsFileData.map((podcastData) => {
    const itunesPodcast = itunesData.results.find((itunesDatum) => {
      return +itunesDatum.collectionId === +podcastData.itunesId;
    });
    if (itunesPodcast) {
      podcastData.itunesData = itunesPodcast;
    }
    return podcastData;
  });

  return {
    props: {
      podcasts: podcastsFileData.map((podcastData) => {
        const itunesPodcast = itunesData.results.find((itunesDatum) => {
          return +itunesDatum.collectionId === +podcastData.itunesId;
        });
        if (itunesPodcast) {
          podcastData.itunesData = itunesPodcast;
        } else {
          console.log(`no itunes data for ${podcastData.sortTitle}`);
        }
        return podcastData;
      }),
    },
  };
}

export default Home;
