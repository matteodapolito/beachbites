"use client";

import React from "react";
import CategoryCarousel from "../components/CategoryCarousel";
import CategoryCard from "@/app/ordina/components/CategoryCard";
import { OrdersActions } from "@/app/ordina/utils";
import { useEffect, useState } from "react";
import { Prodotto, MenuSection } from "@/app/constants/constants";
import Cart from "@/app/ordina/components/Cart";

export default function OrdinaPage() {
  const { getMenu, getProducts } = OrdersActions();
  const [menu, setMenu] = useState<MenuSection[]>([]);
  const [products, setProducts] = useState<Prodotto[]>([]);

  useEffect(() => {
    getMenu().then((menuData: MenuSection[]) => {
      setMenu(menuData);
    });

    getProducts().json((productsData: Prodotto[]) => {
      setProducts(productsData as Prodotto[]);
    });
  }, []);

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <CategoryCarousel products={products} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-5">
              {menu.map((section: MenuSection) => (
                <CategoryCard
                  key={section.category.id}
                  categoria={section.category.nome}
                  prodotti={section.products}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Cart />
    </div>
  );
}
