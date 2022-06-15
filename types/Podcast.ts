import { Tag } from "./Tag";

export type Podcast = {
  sortTitle: string;
  itunesId: number;
  rating: number;
  tags: Tag[];
  itunesData: any;
};
