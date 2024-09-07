"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaHashtag, FaPlus } from "react-icons/fa";
import { Allergene, Category, Prodotto } from "@/app/constants/constants";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { OrdersActions } from "@/app/ordina/utils";
import SideCardReviewProduct from "../components/SideCardReviewProduct";
import { getAllergeneById, getCategoryById } from "./utils";
import { Button } from "@/components/ui/button";
import SideCardAddProduct from "../components/SideCardAddProduct";

export default function ProductsPage() {
  const { getProducts, getCategories, getAllergeni } = OrdersActions();
  const [products, setProducts] = useState<Prodotto[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [allergeni, setAllergeni] = useState<Allergene[]>([]);
  const [productSelected, setProductSelected] = useState<Prodotto>();

  useEffect(() => {
    getProducts().json((productsData: Prodotto[]) => {
      setProducts(productsData as Prodotto[]);
    });

    getCategories().json((categoriesData: Category[]) => {
      setCategories(categoriesData as Category[]);
    });

    getAllergeni().json((allergeniData: Allergene[]) => {
      setAllergeni(allergeniData as Allergene[]);
    });
  }, []);

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <Card x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-7">
            <CardTitle className="flex items-center gap-2 justify-between">
              Prodotti{" "}
              <Button
                variant="outline"
                className="bg-green"
                onClick={() => setProductSelected(undefined)}
              >
                <FaPlus className="mr-2 h-4 w-4" /> Aggiungi prodotto
              </Button>
            </CardTitle>
            <CardDescription>Elenco completo dei prodotti</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <FaHashtag />
                  </TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Allergeni</TableHead>
                  <TableHead>Prezzo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products?.map((productItem: Prodotto) => (
                  <TableRow
                    key={productItem.id}
                    className={`cursor-pointer hover:bg-accent/80 transition-colors ${
                      productSelected && productSelected.id === productItem.id
                        ? "bg-accent"
                        : ""
                    }`}
                    onClick={() => setProductSelected(productItem)}
                  >
                    <TableCell>
                      <div className="font-medium">
                        <Badge variant="secondary">{productItem.id}</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{productItem.nome}</div>
                    </TableCell>
                    <TableCell>
                      <Badge className="capitalize">
                        {" "}
                        {getCategoryById(
                          categories,
                          Number(productItem.categoria)
                        )?.nome || "N/A"}
                      </Badge>
                    </TableCell>
                    <TableCell className="flex flex-row gap-1">
                      {productItem.allergeni.map((id) => {
                        const allergene = getAllergeneById(allergeni, id);
                        return allergene ? (
                          <Badge className="capitalize" key={id}>
                            {allergene.nome}
                          </Badge>
                        ) : null;
                      })}
                    </TableCell>
                    <TableCell>€{productItem.prezzo}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div>
        {productSelected && (
          <SideCardReviewProduct
            productItem={productSelected}
            categories={categories}
            allergeni={allergeni}
            setProducts={setProducts}
          />
        )}
        {!productSelected && (
          <SideCardAddProduct
            categories={categories}
            allergeni={allergeni}
            setProducts={setProducts}
            setCategories={setCategories}
            setAllergeni={setAllergeni}
          />
        )}
      </div>
    </main>
  );
}
