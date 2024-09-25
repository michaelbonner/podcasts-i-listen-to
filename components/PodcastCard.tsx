import Image from "next/image";
import { FC, memo } from "react";
import { Podcast } from "types/Podcast";
import { Star } from "./Star";
import { Tag } from "types/Tag";

type Props = {
  podcast: Podcast;
  tagFilter: Tag | null;
  setTagFilter: (tag: Tag) => void;
};

export const PodcastCard: FC<Props> = memo(function PodcastCard({
  podcast,
  tagFilter,
  setTagFilter,
}) {
  return (
    <div
      key={podcast.itunesId}
      className="grid grid-cols-3 lg:grid-cols-3 items-start gap-6 sm:gap-4 lg:gap-6 bg-white rounded-lg shadow-lg w-full"
    >
      <a
        className="w-full h-full"
        href={podcast.itunesData?.collectionViewUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={`${podcast.itunesData?.collectionName} Poster`}
      >
        <Image
          className="rounded-lg rounded-r-none w-full h-full border-r border-gray-200 object-cover"
          alt={`${podcast.itunesData?.collectionName} Poster`}
          height={200}
          src={podcast.itunesData?.artworkUrl600}
          width={200}
        />
      </a>
      <div className="pr-6 py-4 lg:pt-4 flex flex-col justify-between h-full w-full flex-2 col-span-2">
        <div>
          <p className="text-xl font-bold truncate">
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
        <div className="flex-col lg:flex lg:mt-1 flex-1 gap-2 lg:flex-row-reverse justify-between">
          <p className="flex lg:justify-end my-3">
            <Star filled={podcast.rating > 0} />
            <Star filled={podcast.rating > 1} />
            <Star filled={podcast.rating > 2} />
            <Star filled={podcast.rating > 3} />
            <Star filled={podcast.rating > 4} />
          </p>
          <div>
            <div className="flex flex-wrap justify-start gap-x-2 gap-y-1 mt-4 lg:my-2">
              {podcast.tags.map((tag) => (
                <button
                  className={`inline-block ${
                    tagFilter === tag
                      ? "bg-sky-200 text-sky-700"
                      : "bg-gray-200 text-gray-700"
                  } rounded px-1.5 py-1 text-xs font-semibold focus:outline-none`}
                  key={tag}
                  onClick={() =>
                    tagFilter === tag ? setTagFilter(null) : setTagFilter(tag)
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
    </div>
  );
});
