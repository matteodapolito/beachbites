import { Allergene, Category } from "@/app/constants/constants";

export const getCategoryById = (categories: Category[], id: number) => {
  return categories.find((category) => category.id === id);
};

export const getAllergeneById = (allergeni: Allergene[], id: number) => {
  return allergeni.find((allergene) => allergene.id === id);
};
