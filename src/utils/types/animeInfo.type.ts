import { IAnime } from "./anime.type";
import { ICategory } from "./category.type";

export interface IAnimeInfo extends IAnime {
  rating: string;
  status: string;
  categories: ICategory[];
  description: string;
  listEpisodes: string[];
}
