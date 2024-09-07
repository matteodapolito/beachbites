import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";
import Image from "next/image";
import { Prodotto } from "../constants/constants";

export default function CategoryCarousel({
  products,
}: {
  products: Prodotto[];
}) {
  return (
    <div className="w-full mx-auto">
      <Carousel className="rounded overflow-hidden">
        <CarouselContent>
          {products.map((item, index) => (
            <CarouselItem
              key={index}
              className="mx-auto basis-1/3 md:basis-1/4 lg:basis-1/5"
              style={{ cursor: "pointer" }}
            >
              <div className="flex flex-col items-center rounded-xl bg-background">
                <Image
                  src="/placeholder.jpg"
                  width={80}
                  height={80}
                  alt="category"
                  className="rounded-full aspect-square object-cover"
                />
                <p className="mt-2 text-center text-sm font-medium">
                  {item.nome}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2 hover:bg-white/75 transition-colors">
          <FaRegArrowAltCircleLeft />
        </CarouselPrevious>
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2 hover:bg-white/75 transition-colors">
          <FaRegArrowAltCircleRight />
        </CarouselNext>
      </Carousel>
    </div>
  );
}
