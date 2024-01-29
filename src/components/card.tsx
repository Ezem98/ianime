import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { ICategory } from "@/utils/types/category.type";
import { sliceText } from "@/utils/functions";

interface InputCardProps {
  image?: string;
  genres?: ICategory[];
  episodes?: number;
  title?: string;
  description?: string;
}

export const InputCard: React.FC<InputCardProps> = ({
  image = "/not-found.png",
  genres = [],
  episodes = 0,
  title = "Title",
  description = "Description",
}) => {
  return (
    <Card className="py-4 h-fit min-h-[510px] hover:scale-105 transition-all text-white">
      <CardBody className="overflow-visible py-2 items-center justify-center cursor-pointer">
        <section className="relative">
          <img
            alt={title}
            className="object-cover rounded-xl relative"
            src={image}
            width={1920}
            height={1080}
          />
          <section className="absolute p-2 z-10 bottom-0 bg-gradient-to-b from-transparent to-dark w-full">
            <small className="">{episodes} episodes</small>
            <h4 className="font-bold text-large">{title}</h4>
            <section className="flex gap-2">
              {genres?.map((g, i) => {
                return (
                  <small
                    key={i}
                    className="text-tiny text-gray-200 capitalize font-medium"
                  >
                    {g.name}
                  </small>
                );
              })}
            </section>
            <p className="text-small font-medium text-pretty min-h-[40px] mt-2">
              {sliceText(description, 55)}
            </p>
          </section>
        </section>
      </CardBody>
    </Card>
  );
};
