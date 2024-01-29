"use client";

import { InputCard } from "@/components/card";
import { useMutation } from "@tanstack/react-query";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Spinner,
  Tooltip,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { SearchItem } from "@/components/searchItem";
import { IAnime } from "@/utils/types/anime.type";
import { IAnimeInfo } from "@/utils/types/animeInfo.type";
import { useCompletion } from "ai/react";

const getAnimes = async (search?: string) => {
  return await fetch(`http://localhost:3001/directory?search=${search}`)
    .then(async (res) => {
      if (!res.ok) throw new Error("Error!");
      return await res.json();
    })
    .then((res) => res.directory as IAnime[]);
};

const getAnimeInfo = async (animeUrl?: string) => {
  return await fetch(`http://localhost:3001/anime-info`, {
    method: "POST",
    body: JSON.stringify({ url: animeUrl }),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(async (res) => {
      if (!res.ok) throw new Error("Error!");
      return await res.json();
    })
    .then((res) => res.animeInfo as IAnimeInfo);
};

const RecommendPage = () => {
  const [search, setSearch] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [animes, setAnimes] = useState<IAnime[]>([]);
  const [selectedAnimes, setSelectedAnimes] = useState<IAnimeInfo[]>([]);

  const { completion, input, stop, isLoading, handleSubmit, setInput } =
    useCompletion({
      api: "/api/fireworks",
    });

  const animesList = useMutation({
    mutationFn: async () => await getAnimes(),
    onSuccess: (data) => {
      setAnimes(data);
    },
  });

  const animeInfo = useMutation({
    mutationFn: getAnimeInfo,
  });

  const handleChange = (value: string) => {
    setSearch(value);
  };

  const handleClick = (animeUrl: string) => {
    animeInfo.mutate(animeUrl);
  };

  useEffect(() => {
    animesList.mutate();
  }, []);

  useEffect(() => {
    if (animeInfo.isSuccess) {
      const tempArray = selectedAnimes;
      tempArray[selectedAnimes.length] = animeInfo.data;
      setSelectedAnimes([...tempArray]);
    }
  }, [animeInfo.data, animeInfo.isSuccess]);

  return (
    <div className="grid relative grid-cols-5 gap-6 h-[92vh] p-6 grid-rows-[10%] w-full">
      <section className="row-start-1 row-end-2 col-start-1 col-end-6 w-full h-fit">
        <Autocomplete
          defaultItems={animes}
          placeholder="Search anime"
          variant="bordered"
          color="warning"
          isClearable
          startContent={<IoSearchOutline />}
          description="Search and add an anime"
          isLoading={animesList.isPending}
        >
          {(anime) => (
            <AutocompleteItem key={anime.title} textValue={anime.title}>
              <SearchItem
                anime={anime}
                key={anime.title}
                handleClick={handleClick}
              />
            </AutocompleteItem>
          )}
        </Autocomplete>
      </section>
      {selectedAnimes.map((selected, i) => {
        const { imageUrl, categories, listEpisodes, title, description } =
          selected;

        return (
          <InputCard
            key={i}
            image={imageUrl ?? ""}
            genres={categories ?? ""}
            episodes={listEpisodes.length ?? 0}
            title={title ?? ""}
            description={description ?? ""}
          />
        );
      })}
      {Array.from({ length: 5 - selectedAnimes.length }).map((_, i) => {
        return <InputCard key={i} />;
      })}
      <form
        className="h-fit w-full col-span-full grid place-content-center"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Tooltip
          content="Select at least two anime"
          color="foreground"
          showArrow
          placement="bottom-start"
        >
          <Button
            variant="shadow"
            color="warning"
            size="lg"
            type="submit"
            onClick={() => {
              setInput(
                "[Sword Art Online, Shingeki no kyoshin, Full metal alchemist]"
              );
            }}
            // disabled={selectedAnimes.length === 0}
          >
            <strong className="py-4">Discover related ones</strong>
          </Button>
        </Tooltip>
      </form>
      <p className="col-span-full">Completion result: {completion}</p>
      {animeInfo.isPending || animesList.isPending ? (
        <div className="absolute z-40 bottom-0 w-full h-full backdrop-blur-md grid place-content-center">
          <Spinner size="lg" color="warning" />
        </div>
      ) : null}
    </div>
  );
};

export default RecommendPage;
