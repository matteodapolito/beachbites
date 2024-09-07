"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderElement, OrderItem } from "@/app/constants/constants";
import { OrdersActions } from "../utils";

export default function ThankYouPage() {
  const router = useRouter();
  // const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  // const [noOrder, setNoOrder] = useState(false);
  // const [orderItem, setOrder] = useState<OrderItem>();

  /*   const { getOrder } = OrdersActions();

  useEffect(() => {
    const uid = params.uid as string;
    if (uid) {
      getOrder(Number(uid))
        .then((orderData) => {
          setOrder(orderData as OrderItem);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          setNoOrder(true);
        });
    } else if (!uid) {
      setIsLoading(false);
      setNoOrder(true);
    }
  }, [params, isLoading]); */

  return (
    <div className="container mx-auto my-8 max-w-2xl">
      {isLoading ? (
        <div className="text-center">Caricamento...</div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Grazie per il tuo ordine!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-gray-600">
              Il tuo ordine è stato ricevuto e sarà consegnato presto.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => router.push("/ordina")}>
              Torna al menu
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
