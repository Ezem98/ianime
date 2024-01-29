import { IAnime } from "@/utils/types/anime.type";

export const SearchItem = ({
  anime,
  handleClick,
}: {
  anime: IAnime;
  handleClick: (animeUrl: string) => void;
}) => {
  return (
    <article
      onClick={() => handleClick(anime.url)}
      className="flex p-2 gap-2 cursor-pointer text-dark"
    >
      <img
        src={anime.imageUrl}
        alt={anime.title}
        width={50}
        height={50}
        className="rounded-md"
      />
      <section className="flex flex-col">
        <span className="uppercase font-bold">{anime.title}</span>
        <small className="text-default-500 font-medium">{anime.type}</small>
      </section>
    </article>
  );
};
