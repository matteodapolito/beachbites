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
import { FaHashtag } from "react-icons/fa";
import { OrderItem } from "@/app/constants/constants";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { OrdersActions } from "@/app/ordina/utils";
import SideCardReviewOrder from "@/app/dashboard/components/SideCardReviewOrder";

export default function OrdiniPage() {
  const { getOrders } = OrdersActions();
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [orderSelected, setOrderSelected] = useState<OrderItem>();

  useEffect(() => {
    getOrders().then((ordersData) => {
      setOrders(ordersData as OrderItem[]);
    });
  }, []);

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <Card x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-7">
            <CardTitle>Ordini</CardTitle>
            <CardDescription>Elenco completo degli ordini</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <FaHashtag />
                  </TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    N. Ombrellone
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Data</TableHead>
                  <TableHead className="hidden md:table-cell">Orario</TableHead>
                  <TableHead className="text-right">Importo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders?.map((orderItem: OrderItem) => (
                  <TableRow
                    key={orderItem.id}
                    className={`cursor-pointer hover:bg-accent/80 transition-colors ${
                      orderSelected && orderSelected.id === orderItem.id
                        ? "bg-accent"
                        : ""
                    }`}
                    onClick={() => setOrderSelected(orderItem)}
                  >
                    <TableCell>
                      <div className="font-medium">
                        <Badge variant="secondary">{orderItem.id}</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {orderItem.nome} {orderItem.cognome}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {orderItem.n_ombrellone}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(orderItem.data_ordine).toLocaleDateString(
                        "it-IT",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {orderItem.slot_delivery}
                    </TableCell>
                    <TableCell className="text-right">
                      €
                      {orderItem.elementi
                        .reduce(
                          (total, item) =>
                            total + (Number(item.prezzo_totale) || 0),
                          0
                        )
                        .toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div>
        {orderSelected && <SideCardReviewOrder orderItem={orderSelected} />}
      </div>
    </main>
  );
}
