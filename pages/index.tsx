import { PodcastCard } from "components/PodcastCard";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef, useState } from "react";
import { Podcast } from "types/Podcast";
import { Tag } from "types/Tag";
import podcasts from "../data/podcasts";
import MainLayout from "../layouts/main";
import { Star } from "components/Star";

const ContactForm = dynamic(() => import("../components/ContactForm"), {
  suspense: true,
});

function Home({ podcasts }: { podcasts: Podcast[] }) {
  const [ratingFilter, setRatingFilter] = useState(0);
  const [tagFilter, setTagFilter] = useState<Tag | null>(null);
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
    let searchParams = new URL(document.location.toString()).searchParams;
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
        <div className="mx-auto xl:mx-12 2xl:mx-24 3xl:mx-36 4xl:mx-72 px-4 text-right flex flex-wrap gap-3 justify-end">
          <div>
            {toggleSearch ? (
              <div className="flex items-center">
                <div className="z-0 relative flex items-center bg-orange-100 px-2 py-2 shadow rounded-l">
                  <button
                    onClick={() => {
                      setToggleSearch(false);
                      setSearch("");
                    }}
                    className="focus:outline-none active:bg-sky-200 text-orange-500"
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
                    className="block uppercase tracking-wide text-sky-700 text-xs font-bold mr-4 px-3"
                    htmlFor="search"
                  >
                    Search
                  </label>
                  <input
                    className="appearance-none block w-full lg:w-64 bg-gray-100 text-sky-800 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-300"
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
                  className="flex items-center gap-2 bg-white rounded p-4 shadow focus:outline-none hover:bg-gray-100 focus:bg-gray-300 font-semibold text-gray-700 text-sm transition-all"
                  onClick={() => {
                    setToggleSearch(!toggleSearch);
                  }}
                >
                  <span>Search</span>
                  <svg
                    className={`w-5 h-5 transition-all ${
                      toggleSearch ? `text-sky-500` : `text-gray-300`
                    } stroke-current`}
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
          <div className="text-right flex justify-end">
            <button
              className={`flex items-center gap-2 transition-all ${
                toggleFilters || ratingFilter || tagFilter
                  ? "bg-gray-100 text-sky-700 hover:bg-gray-200"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              } rounded py-2 px-4 shadow focus:outline-none font-semibold text-sm`}
              onClick={() => setToggleFilters(!toggleFilters)}
            >
              <span>Filters</span>
              <svg
                className={`w-5 h-5 ${
                  toggleFilters || ratingFilter || tagFilter
                    ? "text-sky-400"
                    : "text-gray-300"
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
          <div className="mx-auto xl:mx-12 2xl:mx-24 3xl:mx-36 4xl:mx-72 px-4 text-right flex flex-wrap lg:justify-end mt-2 mb-8 gap-4 lg:gap-12">
            <div>
              <h3 className="font-semibold text-lg text-sky-800 mt-6 lg:mt-0 mx-4 text-left">
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
            <div>
              <h3 className="font-semibold text-lg text-sky-800 mt-6 lg:mt-0 mx-4 text-left">
                Tags
              </h3>
              <div className="flex flex-wrap items-center lg:justify-start lg:mt-0 px-2 text-yellow-500 text-sm">
                <button
                  type="button"
                  onClick={() => setTagFilter(null)}
                  className={`flex flex-wrap items-center mt-4 mx-2 py-2 px-4 rounded shadow-md focus:outline-none font-bold ${
                    tagFilter === null ? "bg-yellow-200" : "bg-white"
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

        {/* Podcast grid */}
        <div className="lg:mx-auto xl:mx-12 2xl:mx-24 3xl:mx-36 4xl:mx-72 px-4 grid gap-4 xl:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mt-8">
          {filteredPodcasts.length > 0 &&
            filteredPodcasts.map((podcast) => {
              return (
                <PodcastCard
                  key={podcast.itunesId}
                  podcast={podcast}
                  setTagFilter={setTagFilter}
                  tagFilter={tagFilter}
                />
              );
            })}
        </div>
        {filteredPodcasts.length === 0 && (
          <div className="w-full max-w-lg p-4 mx-auto">
            <div className="grid gap-2 bg-white items-center rounded-lg w-full px-8 py-6">
              <h2 className="text-xl font-semibold">
                No podcasts match that filter 🥺
              </h2>
              <p>
                Maybe suggest that podcast to me? I&apos;m always looking for
                new ones. Use the form below.
              </p>
            </div>
          </div>
        )}
        {/* End podcast grid */}

        {/* Form */}
        <div className="flex justify-between max-w-3xl mx-4 lg:mx-auto mt-16 mb-4 bg-gray-400 rounded-md shadow-lg">
          <div className="lg:w-16 callout-bar rounded-l-lg"></div>
          <div className="bg-white px-6 lg:px-12 py-4 rounded-md lg:rounded-l-none">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="items-center text-2xl lg:text-3xl font-bold text-sky-700 my-3 pr-8 tracking-wide">
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
            <Suspense fallback={`Loading...`}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
        {/* End form */}
      </div>
    </MainLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const itunesIds = podcasts.map((podcast) => podcast.itunesId).join(",");
  const url = `https://itunes.apple.com/lookup?id=${itunesIds}`;
  const itunesRequest = await fetch(url);
  const itunesData = await itunesRequest.json();

  return {
    props: {
      podcasts: podcasts.map((podcastData) => {
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
};

export default Home;
