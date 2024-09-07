"use client";

import { File, ListFilter, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SideCardReviewOrder from "@/app/dashboard/components/SideCardReviewOrder";
import { OrdersActions } from "@/app/ordina/utils";
import { useEffect, useState } from "react";
import { OrderItem } from "@/app/constants/constants";
import OrdersTab from "./components/OrdersTab";
import { calculateEarnings } from "@/app/dashboard/utils";

export default function Dashboard() {
  const { getOrders } = OrdersActions();
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [orderSelected, setOrderSelected] = useState<OrderItem>();

  const [weeklyEarnings, setWeeklyEarnings] = useState<number>(0);
  const [monthlyEarnings, setMonthlyEarnings] = useState<number>(0);

  useEffect(() => {
    const { weeklyTotal, monthlyTotal } = calculateEarnings(orders);

    setWeeklyEarnings(weeklyTotal);
    setMonthlyEarnings(monthlyTotal);
  }, [orders]);

  useEffect(() => {
    getOrders().then((ordersData) => {
      setOrders(ordersData as OrderItem[]);
    });
  }, []);

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <Card x-chunk="dashboard-05-chunk-1">
            <CardHeader className="pb-2">
              <CardDescription>Questa settimana</CardDescription>
              <CardTitle className="text-4xl">
                €{monthlyEarnings.toFixed(2)}
              </CardTitle>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
          <Card x-chunk="dashboard-05-chunk-2">
            <CardHeader className="pb-2">
              <CardDescription>Questo mese</CardDescription>
              <CardTitle className="text-4xl">
                €{weeklyEarnings.toFixed(2)}
              </CardTitle>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter></CardFooter>
          </Card>
        </div>
        <Tabs defaultValue="week">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="week">Settimana</TabsTrigger>
              <TabsTrigger value="month">Mese</TabsTrigger>
              <TabsTrigger value="year">Anno</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="h-7 gap-1 text-sm"
                disabled
              >
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Esporta</span>
              </Button>
            </div>
          </div>
          <OrdersTab
            filter="week"
            orders={orders}
            setOrderSelected={setOrderSelected}
            orderSelected={orderSelected}
          />
          <OrdersTab
            filter="month"
            orders={orders}
            setOrderSelected={setOrderSelected}
            orderSelected={orderSelected}
          />
          <OrdersTab
            filter="year"
            orders={orders}
            setOrderSelected={setOrderSelected}
            orderSelected={orderSelected}
          />
        </Tabs>
      </div>
      <div>
        {orderSelected && <SideCardReviewOrder orderItem={orderSelected} />}
      </div>
    </main>
  );
}
