import Image from "next/future/image";
import { FC, memo } from "react";
import { Podcast } from "types/Podcast";
import { Star } from "./Star";

type Props = {
  podcast: Podcast;
  tagFilter: string;
  setTagFilter: (tag: string) => void;
};

export const PodcastCard: FC<Props> = memo(function PodcastCard({
  podcast,
  tagFilter,
  setTagFilter,
}) {
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
                    ? "bg-sky-200 text-sky-700"
                    : "bg-gray-200 text-gray-700"
                } rounded px-2 py-1 text-xs font-semibold focus:outline-none`}
                key={tag}
                onClick={() =>
                  tagFilter === tag ? setTagFilter("") : setTagFilter(tag)
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
});
