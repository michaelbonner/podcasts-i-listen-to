import { memo } from "react";
import type { FC } from "react";
import type { Podcast } from "../types/Podcast";
import { Star } from "./Star";
import type { Tag } from "../types/Tag";

type Props = {
  podcast: Podcast;
  tagFilter: Tag | null;
  setTagFilter: (tag: Tag | null) => void;
};

export const PodcastCard: FC<Props> = memo(function PodcastCard({
  podcast,
  tagFilter,
  setTagFilter,
}) {
  return (
    <div
      key={podcast.itunesId}
      className="grid grid-cols-3 gap-6 items-start w-full bg-white rounded-lg shadow-lg sm:gap-4 lg:grid-cols-3 lg:gap-6"
    >
      <a
        className="w-full h-full"
        href={podcast.itunesData?.collectionViewUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={`${podcast.itunesData?.collectionName} Poster`}
      >
        <picture>
          <source
            type="image/webp"
            srcSet={`${podcast.itunesData?.artworkUrl600?.replace(
              "600x600bb.jpg",
              "200x200bb.webp"
            )} 1x, ${podcast.itunesData?.artworkUrl600?.replace(
              "600x600bb.jpg",
              "400x400bb.webp"
            )} 2x`}
          />
          <img
            className="object-cover w-full h-full rounded-lg rounded-r-none border-r border-gray-200"
            alt={`${podcast.itunesData?.collectionName} Poster`}
            height={200}
            loading="lazy"
            src={podcast.itunesData?.artworkUrl600?.replace(
              "600x600bb.jpg",
              "200x200bb.jpg"
            )}
            srcSet={`${podcast.itunesData?.artworkUrl600?.replace(
              "600x600bb.jpg",
              "200x200bb.jpg"
            )} 1x, ${podcast.itunesData?.artworkUrl600?.replace(
              "600x600bb.jpg",
              "400x400bb.jpg"
            )} 2x`}
            width={200}
          />
        </picture>
      </a>
      <div className="flex flex-col col-span-2 justify-between py-4 pr-6 w-full h-full lg:pt-4 flex-2">
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
        <div className="flex-col flex-1 gap-2 justify-between lg:flex lg:flex-row-reverse lg:mt-1">
          <p className="flex my-3 lg:justify-end">
            <Star filled={podcast.rating > 0} />
            <Star filled={podcast.rating > 1} />
            <Star filled={podcast.rating > 2} />
            <Star filled={podcast.rating > 3} />
            <Star filled={podcast.rating > 4} />
          </p>
          <div>
            <div className="flex flex-wrap gap-y-1 gap-x-2 justify-start mt-4 lg:my-2">
              {podcast.tags.map((tag) => (
                <button
                  className={`inline-block ${
                    tagFilter === tag
                      ? "bg-sky-200 text-sky-700"
                      : "bg-gray-200 text-gray-700"
                  } rounded px-1.5 py-1 text-xs font-semibold focus:outline-hidden`}
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
