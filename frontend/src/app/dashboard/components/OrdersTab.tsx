import { TabsContent } from "@/components/ui/tabs";
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

export default function OrdersTab({
  filter,
  orders,
  setOrderSelected,
  orderSelected,
}: {
  filter: string;
  orders: OrderItem[];
  setOrderSelected: React.Dispatch<React.SetStateAction<OrderItem | undefined>>;
  orderSelected: OrderItem | undefined;
}) {
  const [filteredOrders, setFilteredOrder] = useState<OrderItem[]>();
  const [cardTitle, setCardTitle] = useState("");
  const [cardSubtitle, setCardSubtitle] = useState("");

  const filterOrders = (orders: OrderItem[], filter: string) => {
    const today = new Date();
    let startDate: Date;

    switch (filter) {
      case "week":
        startDate = new Date(today.setDate(today.getDate() - today.getDay()));
        setCardTitle("Ordini della settimana");
        setCardSubtitle("Ordini effettuati questa settimana");
        break;
      case "month":
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        setCardTitle("Ordini del mese");
        setCardSubtitle("Ordini effettuati questo mese");
        break;
      case "year":
        startDate = new Date(today.getFullYear(), 0, 1);
        setCardTitle("Ordini dell'anno");
        setCardSubtitle("Ordini effettuati quest'anno");
        break;
      default:
        return orders;
    }

    return orders.filter((orderItem) => {
      const orderDate = new Date(orderItem.data_ordine);
      return orderDate >= startDate;
    });
  };

  useEffect(() => {
    setFilteredOrder(filterOrders(orders, filter));
  }, [orders, filter]);

  return (
    <TabsContent value={filter}>
      <Card x-chunk="dashboard-05-chunk-3">
        <CardHeader className="px-7">
          <CardTitle>{cardTitle}</CardTitle>
          <CardDescription>{cardSubtitle}</CardDescription>
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
              {filteredOrders?.map((orderItem: OrderItem) => (
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
    </TabsContent>
  );
}
