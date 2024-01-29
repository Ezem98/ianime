"use client";
import { Button } from "@nextui-org/button";
import { LuDices } from "react-icons/lu";
import { BentoItem } from "../components/bentoItem";

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="grid grid-rows-[45vh_45vh] ml-4 grid-cols-4 gap-2 p-4">
      <div className="space-y-6 row-start-1 row-end-3">
        <h1 className="text-3xl font-bold text-dark">ANIME RECOMMENDATION</h1>
        <p className="text-sm capitalize">
          Welcome to <strong>AInime</strong>, your personalized anime
          recommendation hub! Our site is powered by cutting-edge artificial
          intelligence that tailors anime suggestions to your unique
          preferences. Simply input your favorite genres, anime list, or provide
          a brief summary of your preferences, and watch as our AI algorithm
          curates a custom list of anime recommendations just for you. Discover
          new and exciting series that match your tastes with precision. Elevate
          your anime-watching experience with <strong>AInime</strong>, where
          recommendations meet the power of AI innovation.
        </p>
        <Button
          className="bg-yellow-400 text-black uppercase"
          onClick={() => router.push("/recommend")}
        >
          <strong>recommend me</strong>
          <LuDices />
        </Button>
      </div>
      <BentoItem
        image="/gojo.jpg"
        width={1920}
        height={1080}
        colStart={2}
        colEnd={3}
        rowStart={1}
        rowEnd={2}
      />
      <BentoItem
        image="/solo-leveling.jpg"
        width={1920}
        height={1080}
        colStart={3}
        colEnd={5}
        rowStart={1}
        rowEnd={2}
      />
      <BentoItem
        image="/demon-slayer.jpg"
        width={1920}
        height={1080}
        colStart={2}
        colEnd={4}
        rowStart={2}
        rowEnd={3}
      />
      <BentoItem
        image="/snk.jpg"
        width={1920}
        height={1080}
        colStart={4}
        colEnd={5}
        rowStart={2}
        rowEnd={3}
      />

      {/* <div>
            <Image
              alt="Anime character"
              src="/gojo.jpg"
              width={500}
              height={500}
              className="object-cover"
            />
            <div className="flex justify-end mt-2">
              <CiStar className="text-yellow-500" />
              <CiStar className="text-yellow-500" />
              <CiStar className="text-yellow-500" />
            </div>
            <div className="absolute bottom-0 left-0 p-8">
              <Button className="bg-yellow-500 text-black flex items-center">
                <LuDices className="text-white" />
                CREATE ANIME
              </Button>
            </div>
          </div> */}
    </div>
  );
}
