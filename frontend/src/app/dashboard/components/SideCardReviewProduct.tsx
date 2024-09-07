import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, MoreVertical } from "lucide-react";

import { FaRegUser } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { getCategoryById, getAllergeneById } from "../prodotti/utils";
import { Allergene, Category, Prodotto } from "@/app/constants/constants";
import { toast } from "sonner";
import { OrdersActions } from "@/app/ordina/utils";

export default function SideCardReviewProduct({
  productItem,
  categories,
  allergeni,
  setProducts,
}: {
  productItem: Prodotto;
  categories: Category[];
  allergeni: Allergene[];
  setProducts: React.Dispatch<React.SetStateAction<Prodotto[]>>;
}) {
  const { deleteProduct } = OrdersActions();

  function handleDeleteProduct() {
    deleteProduct(productItem.id)
      .then((risposta) => {
        console.log(risposta);
        toast(
          `Il prodotto ${productItem.nome} è stato eliminato con successo.`
        );
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productItem.id)
        );
      })
      .catch((errore) =>
        toast(
          `Si è verificato un errore durante l'eliminazione del prodotto: ${errore}`
        )
      );
  }
  return (
    <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
      <CardHeader className="flex flex-row gap-4 items-start bg-muted/50">
        <img
          src="/placeholder.jpg"
          alt={productItem.nome}
          width={64}
          height={64}
          className="rounded-md"
          style={{ aspectRatio: "64/64", objectFit: "cover" }}
        />
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            {productItem.nome}
            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Copy className="h-3 w-3" />
              <span className="sr-only">Copia ID Prodotto</span>
            </Button>
          </CardTitle>

          <CardDescription className="text-capitalize">
            Categoria:{" "}
            <Badge className="capitalize">
              {" "}
              {getCategoryById(categories, Number(productItem.categoria))
                ?.nome || "N/A"}
            </Badge>
          </CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline" className="h-8 w-8">
                <MoreVertical className="h-3.5 w-3.5" />
                <span className="sr-only">Altro</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem disabled>Modifica</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDeleteProduct()}>
                Elimina
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Descrizione Prodotto</div>
          <h2 className="first-letter:uppercase">{productItem.descrizione}</h2>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Lista allergeni</div>
          <div className="flex gap-2">
            {productItem.allergeni.map((id) => {
              const allergene = getAllergeneById(allergeni, id);
              return allergene ? (
                <Badge className="capitalize" key={id}>
                  {allergene.nome}
                </Badge>
              ) : null;
            })}
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3 flex items-center justify-between">
          <h2 className="font-semibold">Prezzo</h2>
          <h2 className="font-semibold">€{productItem.prezzo}</h2>
        </div>
      </CardContent>
    </Card>
  );
}
