import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import MainLayout from "../layouts/main";
import podcasts from "../data/podcasts";

const Star = ({ filled }) => {
  return (
    <svg
      className={`block w-6 h-6 ${
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
  const [filter, setFilter] = useState(0);
  const [sortedPodcasts, setSortedPodcasts] = useState([]);

  useEffect(() => {
    setSortedPodcasts(
      podcasts.sort((a, b) => {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();

        if (titleA > titleB) {
          return 1;
        } else if (titleA < titleB) {
          return -1;
        }
        return 0;
      })
    );
  });

  return (
    <MainLayout>
      <div className="bg-indigo-100 pt-8 pb-16">
        <div className="flex flex-wrap container mx-auto items-center justify-end px-2 text-yellow-500">
          <button
            type="button"
            onClick={() => setFilter(0)}
            className={`flex flex-wrap mt-4 mx-2 py-2 px-4 rounded shadow-md focus:outline-none ${
              filter === 0 ? "bg-yellow-200" : "bg-white"
            } `}
          >
            <strong>All</strong>
          </button>
          <button
            type="button"
            onClick={() => setFilter(3)}
            className={`flex flex-wrap mt-4 mx-2 py-2 px-4 rounded shadow-md focus:outline-none ${
              filter === 3 ? "bg-yellow-200" : "bg-white"
            } `}
          >
            <Star filled={true} />
            <Star filled={true} />
            <Star filled={true} />
            <span className="font-black pl-1">+</span>
          </button>
          <button
            type="button"
            onClick={() => setFilter(4)}
            className={`flex flex-wrap mt-4 mx-2 py-2 px-4 rounded shadow-md focus:outline-none ${
              filter === 4 ? "bg-yellow-200" : "bg-white"
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
            onClick={() => setFilter(5)}
            className={`flex flex-wrap mt-4 mx-2 py-2 px-4 rounded shadow-md focus:outline-none ${
              filter === 5 ? "bg-yellow-200" : "bg-white"
            } `}
          >
            <Star filled={true} />
            <Star filled={true} />
            <Star filled={true} />
            <Star filled={true} />
            <Star filled={true} />
          </button>
        </div>
        <div className="flex flex-wrap container mx-auto mt-4 items-stretch">
          {sortedPodcasts.map(podcast => {
            return (
              <div
                key={podcast.title}
                className={`${
                  podcast.rating >= filter
                    ? "w-full h-full md:w-1/2 p-4"
                    : "hidden"
                }`}
              >
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
                  <div className="w-3/4 px-6">
                    <p className="text-xl font-semibold">
                      <a href={podcast.url} target="_blank">
                        <span
                          dangerouslySetInnerHTML={{ __html: podcast.title }}
                        />
                      </a>
                    </p>
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
          })}
        </div>
      </div>
    </MainLayout>
  );
}

export default Home;
