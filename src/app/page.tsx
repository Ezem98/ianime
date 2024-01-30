"use client";
import { Button } from "@nextui-org/button";
import { LuDices } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { IAnime } from "@/utils/types/anime.type";
import React, { useState } from "react";
import { Divider, Skeleton } from "@nextui-org/react";

const getLatestAnimes = async () => {
  return await fetch(`http://localhost:3001/latest-animes`)
    .then(async (res) => {
      if (!res.ok) throw new Error("Error!");
      return await res.json();
    })
    .then((res) => res.latestAnimes as IAnime[]);
};

export default function HomePage() {
  const router = useRouter();
  const [footerIndex, setFooterIndex] = useState<number>();

  const { data, isLoading } = useQuery({
    queryKey: ["get-latest-animes"],
    queryFn: async () => await getLatestAnimes(),
  });

  const handleHoverStart = (index: number) => {
    setFooterIndex(index); // Cambiar el ancho a 600px en hover
  };

  const handleHoverEnd = () => {
    setFooterIndex(undefined); // Restaurar el ancho por defecto al finalizar el hover
  };

  return (
    <main className="grid ml-4 grid-cols-[30%_70%] h-[92vh] gap-4 p-4 mr-8">
      <section className="flex flex-col justify-between space-y-6 h-2/5 self-center text-pretty">
        <header>
          <h1 className="text-4xl font-bold text-dark pb-0">IA-NIME</h1>
          <h2 className="text-2xl font-bold text-secondary pt-0">
            AI Anime Recommendation
          </h2>
        </header>
        <p className="text-sm tracking-widest">
          Welcome to <strong>IAnime</strong>, your personalized anime
          recommendation hub! Our site is powered by cutting-edge artificial
          intelligence that tailors anime suggestions to your unique
          preferences. Simply input your favorite genres, anime list, or provide
          a brief summary of your preferences, and watch as our AI algorithm
          curates a custom list of anime recommendations just for you. Discover
          new and exciting series that match your tastes with precision. Elevate
          your anime-watching experience with <strong>AInime</strong>, where
          recommendations meet the power of AI innovation.
        </p>
        <footer className="flex items-center gap-2">
          <Button
            className="bg-yellow-400 text-black uppercase"
            onClick={() => router.push("/recommend")}
          >
            <strong>recommend me</strong>
            <LuDices />
          </Button>
          <Divider orientation="vertical" className="w-[2px]" />
          <small className="font-semibold transition-all hover:underline hover:cursor-pointer">
            How to use?
          </small>
        </footer>
      </section>
      <section className="flex w-full h-full gap-4 rounded-xl overflow-hidden">
        {!isLoading
          ? data?.slice(0, 5).map((anime, index) => {
              return (
                <article
                  onMouseEnter={() => handleHoverStart(index)}
                  onMouseLeave={handleHoverEnd}
                  key={index}
                  className="flex flex-col border-2 border-dark flex-grow w-0 h-full opacity-80 relative transition-all hover:cursor-crosshair hover:w-[600px] hover:opacity-1 hover:contrast-120"
                >
                  <img
                    className="h-full object-cover"
                    src={anime.imageUrl}
                    alt={anime.title}
                  />
                  {footerIndex === index ? (
                    <footer className="flex flex-col absolute bottom-0 h-full transition-all items-start justify-end p-4 gap-4 bg-gradient-to-b from-transparent to-dark">
                      <h4 className="font-bold text-large text-white">
                        {anime.title}
                      </h4>
                      <p className="text-small font-medium text-white">
                        {anime.description}
                      </p>
                    </footer>
                  ) : null}
                </article>
              );
            })
          : Array.from({ length: 5 }).map((_, i) => {
              return (
                <article
                  key={i}
                  className="flex flex-col flex-grow border-2 w-0 h-full"
                >
                  <Skeleton className="flex w-full h-full" />
                </article>
              );
            })}
      </section>
    </main>
  );
}
