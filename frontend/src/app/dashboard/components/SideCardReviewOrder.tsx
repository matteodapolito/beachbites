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
import { Copy, CreditCard, MoreVertical, Truck } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { FaPrint, FaRegUser, FaUmbrellaBeach, FaInfoCircle } from "react-icons/fa";
import { MdOutlineEmail, MdOutlineAccessTime } from "react-icons/md";
import { OrderElement, OrderItem } from "@/app/constants/constants";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import OrderPageClient from "../ordini/stampa/OrderPageClient";

export default function SideCardReviewOrder({
  orderItem,
}: {
  orderItem: OrderItem;
}) {
  const [isPrinterOpen, setIsPrinterOpen] = useState(false);

  return (
    <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Ordine #{orderItem.id}
            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Copy className="h-3 w-3" />
              <span className="sr-only">Copia ID Ordine</span>
            </Button>
          </CardTitle>
          <CardDescription className="text-capitalize">
            Data:{" "}
            {new Date(orderItem.data_ordine).toLocaleDateString("it-IT", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Drawer open={isPrinterOpen} onOpenChange={setIsPrinterOpen}>
            <DrawerTrigger>
              <Button
                size="sm"
                variant="outline"
                className="h-8 gap-1"
                onClick={() => setIsPrinterOpen(true)}
              >
                <FaPrint className="h-3.5 w-3.5" />
                <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                  Stampa Ricevuta
                </span>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Ricevuta cartacea</DrawerTitle>
                <DrawerDescription>
                  Stampa la ricevuta dell'ordine.
                </DrawerDescription>
              </DrawerHeader>
              <div className="space-y-4 px-4 py-6">
                <OrderPageClient orderItem={orderItem} />
              </div>
              <DrawerFooter>
                <DrawerClose>
                  <Button variant="outline">Chiudi</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
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
              <DropdownMenuItem>Elimina</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Dettagli Ordine</div>
          <ul className="grid gap-3">
            {orderItem.elementi.map((orderElement: OrderElement) => (
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  {orderElement.prodotto.nome} x{" "}
                  <span>{orderElement.quantita}</span>
                </span>
                <span>€{orderElement.prezzo_totale}</span>
              </li>
            ))}
          </ul>
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Totale</span>
              <span>
                €
                {orderItem.elementi
                  .reduce(
                    (total, item) => total + (Number(item.prezzo_totale) || 0),
                    0
                  )
                  .toFixed(2)}
              </span>
            </li>
          </ul>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Informazioni Cliente</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-1 text-muted-foreground">
                <FaRegUser className="h-4 w-4" />
                Cliente
              </dt>
              <dd>
                {orderItem.nome} {orderItem.cognome}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-1 text-muted-foreground">
                <FaUmbrellaBeach className="h-4 w-4" />
                N. Ombrellone
              </dt>
              <dd>
                <Badge variant="secondary">{orderItem.n_ombrellone}</Badge>
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-1 text-muted-foreground">
                <MdOutlineAccessTime className="h-4 w-4" />
                Slot consegna
              </dt>
              <dd>{orderItem.slot_delivery}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-1 text-muted-foreground">
                <FaInfoCircle className="h-4 w-4" />
                Note ordine
              </dt>
              <dd>{orderItem.note ? orderItem.note : "-"}</dd>
            </div>
          </dl>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Informazioni Pagamento</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-1 text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                Visa
              </dt>
              <dd>**** **** **** 4532</dd>
            </div>
          </dl>
        </div>
      </CardContent>
    </Card>
  );
}
