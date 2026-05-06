import { useEffect, useMemo, useRef, useState } from "react";
import { PodcastCard } from "./PodcastCard";
import { Star } from "./Star";
import type { Podcast } from "../types/Podcast";
import type { Tag } from "../types/Tag";

type Props = {
  podcasts: Podcast[];
};

const PodcastList = ({ podcasts }: Props) => {
  const [ratingFilter, setRatingFilter] = useState(0);
  const [tagFilter, setTagFilter] = useState<Tag | null>(null);
  const [tags, setTags] = useState<Tag[]>(() =>
    Array.from(
      new Set(
        podcasts
          .map((podcast) => podcast.tags)
          .flat()
          .sort()
      )
    )
  );
  const [toggleFilters, setToggleFilters] = useState(false);
  const [search, setSearch] = useState("");
  const [toggleSearch, setToggleSearch] = useState(false);
  const searchField = useRef<HTMLInputElement>(null);

  const sortedPodcasts = useMemo(
    () =>
      [...podcasts].sort((a, b) => {
        const titleA = a.sortTitle.toUpperCase();
        const titleB = b.sortTitle.toUpperCase();

        if (titleA > titleB) return 1;
        if (titleA < titleB) return -1;
        return 0;
      }),
    [podcasts]
  );

  const filteredPodcasts = useMemo(
    () =>
      sortedPodcasts
        .filter(
          (podcast) =>
            !search ||
            podcast.sortTitle.toLowerCase().includes(search.toLowerCase())
        )
        .filter((podcast) => podcast.rating >= ratingFilter)
        .filter((podcast) => !tagFilter || podcast.tags.includes(tagFilter)),
    [ratingFilter, search, sortedPodcasts, tagFilter]
  );

  useEffect(() => {
    if (!toggleSearch) return;
    searchField.current?.focus();
  }, [toggleSearch]);

  useEffect(() => {
    const searchParams = new URL(document.location.toString()).searchParams;
    if (searchParams.get("search")) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setToggleSearch(true);
      setSearch(searchParams.get("search") ?? "");
    }
    if (searchParams.get("filter")) {
      setToggleFilters(true);
      setTags([searchParams.get("filter") as Tag]);
    }
  }, []);

  const onSearchKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode !== 27) return;
    if (search !== "") {
      setSearch("");
    } else {
      setToggleSearch(false);
    }
  };

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 justify-end px-4 mx-auto text-right xl:mx-12 2xl:mx-24 3xl:mx-36 4xl:mx-72">
        <div>
          {toggleSearch ? (
            <div className="flex items-center">
              <div className="flex relative z-0 items-center py-2 px-2 bg-orange-100 rounded-l shadow-sm">
                <button
                  onClick={() => {
                    setToggleSearch(false);
                    setSearch("");
                  }}
                  className="text-orange-500 focus:outline-hidden active:bg-sky-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="512"
                    height="512"
                    viewBox="0 0 512 512"
                    className="w-5 h-5 stroke-current"
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
              <div className="flex relative z-10 items-center py-2 px-3 bg-white rounded-sm shadow-sm">
                <label
                  className="block px-3 mr-4 text-xs font-bold tracking-wide uppercase text-sky-700"
                  htmlFor="search"
                >
                  Search
                </label>
                <input
                  className="block py-2 px-4 w-full leading-tight bg-gray-100 rounded-sm border border-gray-200 appearance-none lg:w-64 focus:bg-white focus:border-gray-300 focus:outline-hidden text-sky-800"
                  name="search"
                  id="search"
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyUp={onSearchKeyUp}
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
                      className="w-5 h-5 text-gray-700 stroke-current"
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
            <div className="flex justify-end w-full text-right lg:w-auto">
              <button
                className="flex gap-2 items-center p-4 text-sm font-semibold text-gray-700 bg-white rounded-sm shadow-sm transition-all hover:bg-gray-100 focus:bg-gray-300 focus:outline-hidden"
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
        <div className="flex justify-end text-right">
          <button
            className={`flex items-center gap-2 transition-all ${
              toggleFilters || ratingFilter || tagFilter
                ? "bg-gray-100 text-sky-700 hover:bg-gray-200"
                : "bg-white text-gray-700 hover:bg-gray-100"
            } rounded py-2 px-4 shadow focus:outline-hidden font-semibold text-sm`}
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
        <div className="flex flex-wrap gap-4 px-4 mx-auto mt-2 mb-8 text-right lg:gap-12 lg:justify-end xl:mx-12 2xl:mx-24 3xl:mx-36 4xl:mx-72">
          <div>
            <h3 className="mx-4 mt-6 text-lg font-semibold text-left lg:mt-0 text-sky-800">
              Rating
            </h3>
            <div className="flex flex-wrap justify-start items-center px-2 text-sm text-yellow-500">
              <button
                type="button"
                onClick={() => setRatingFilter(0)}
                className={`flex flex-wrap items-center mt-4 mx-2 py-2 px-4 rounded shadow-md focus:outline-hidden font-bold ${
                  ratingFilter === 0 ? "bg-yellow-200" : "bg-white"
                } `}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setRatingFilter(4)}
                className={`flex flex-wrap items-center mt-4 mx-2 py-2 px-4 rounded shadow-md focus:outline-hidden ${
                  ratingFilter === 4 ? "bg-yellow-200" : "bg-white"
                } `}
              >
                <Star filled={true} />
                <Star filled={true} />
                <Star filled={true} />
                <Star filled={true} />
                <span className="pl-1 font-black">+</span>
              </button>
              <button
                type="button"
                onClick={() => setRatingFilter(5)}
                className={`flex flex-wrap items-center mt-4 mx-2 py-2 px-4 rounded shadow-md focus:outline-hidden ${
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
            <h3 className="mx-4 mt-6 text-lg font-semibold text-left lg:mt-0 text-sky-800">
              Tags
            </h3>
            <div className="flex flex-wrap items-center px-2 text-sm text-yellow-500 lg:justify-start lg:mt-0">
              <button
                type="button"
                onClick={() => setTagFilter(null)}
                className={`flex flex-wrap items-center mt-4 mx-2 py-2 px-4 rounded shadow-md focus:outline-hidden font-bold ${
                  tagFilter === null ? "bg-yellow-200" : "bg-white"
                } `}
              >
                All
              </button>
              {tags.map((tag) => (
                <button
                  className={`flex flex-wrap items-center mt-4 mx-2 py-2 px-4 rounded shadow-md focus:outline-hidden font-bold ${
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
      <div className="grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-2 lg:grid-cols-3 lg:mx-auto xl:gap-6 xl:mx-12 2xl:grid-cols-4 2xl:mx-24 3xl:mx-36 4xl:mx-72">
        {filteredPodcasts.length > 0 &&
          filteredPodcasts.map((podcast) => (
            <PodcastCard
              key={podcast.itunesId}
              podcast={podcast}
              setTagFilter={setTagFilter}
              tagFilter={tagFilter}
            />
          ))}
      </div>
      {filteredPodcasts.length === 0 && (
        <div className="p-4 mx-auto w-full max-w-lg">
          <div className="grid gap-2 items-center py-6 px-8 w-full bg-white rounded-lg">
            <h2 className="text-xl font-semibold">
              No podcasts match that filter 🥺
            </h2>
            <p>
              Maybe suggest that podcast to me? I&apos;m always looking for new
              ones. Use the form below.
            </p>
          </div>
        </div>
      )}
      {/* End podcast grid */}
    </>
  );
};

export default PodcastList;
