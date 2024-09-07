"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "@/app/ordina/context/CartContext";
import ButtonWithMap from "@/app/ordina/components/ButtonMap";
import TimeSlotSelector from "@/app/ordina/components/TimeSlotSelector";
import UmbrellaSelector from "@/app/ordina/components/UmbrellaSelector";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { OrdersActions } from "../utils";
import { OrderItem } from "@/app/constants/constants";

const formOrderSchema = z.object({
  nome: z
    .string()
    .min(2, { message: "Il nome deve contenere almeno 2 caratteri" }),
  cognome: z
    .string()
    .min(2, { message: "Il cognome deve contenere almeno 2 caratteri" }),
  n_ombrellone: z
    .string()
    .min(1, { message: "Il numero dell'ombrellone non può essere negativo" })
    .transform((val) => parseInt(val, 10)),
  elementi: z.array(
    z.object({
      prodotto: z.number(),
      quantita: z.number(),
    })
  ),
  slot_delivery: z.string(),
  note: z.string(),
});

export default function CheckoutPage() {
  const cartContext = useContext(CartContext);
  const { cartItems } = cartContext || {};
  const router = useRouter();

  const [total, setTotal] = useState(0);
  const [isOrderEnabled, setIsOrderEnabled] = useState<boolean>(false);
  const { addOrder } = OrdersActions();

  useEffect(() => {
    setTotal(
      cartItems?.reduce(
        (acc, item) => acc + item.menu_item.prezzo * item.quantity,
        0
      ) || 0
    );
  });

  const formOrder = useForm<z.infer<typeof formOrderSchema>>({
    resolver: zodResolver(formOrderSchema),
    defaultValues: {
      nome: "",
      cognome: "",
      n_ombrellone: 0,
      elementi:
        cartItems?.map((item) => ({
          quantita: item.quantity,
          prodotto: item.menu_item.id,
        })) || [],
      slot_delivery: "",
      note: "",
    },
  });

  function onSubmitOrder(values: z.infer<typeof formOrderSchema>) {
    addOrder({ order: values }).then((result) => {
      const resultData = result as OrderItem;
      localStorage.removeItem("cart");
      cartContext?.clearCart();
      router.push("/ordina/thank-you/");
    });
  }

  return (
    <div className="container mx-auto my-8 grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
      <div>
        <div className="flex items-center">
          <button
            className="flex h-12 w-12 mr-3 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-105 focus:outline-none"
            onClick={() => router.push("/ordina")}
          >
            <IoArrowBackCircleOutline />
          </button>
          <h1 className="text-2xl font-bold">Il tuo Carrello</h1>
        </div>
        <div className="mt-4 space-y-4">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.menu_item.id}
                className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-950"
              >
                <img
                  src="/placeholder.jpg"
                  width={80}
                  height={80}
                  alt="Product Image"
                  className="rounded-md"
                  style={{ aspectRatio: "80/80", objectFit: "cover" }}
                />
                <div className="flex-1">
                  <h3 className="text-lg font-medium first-letter:uppercase">
                    {item.menu_item.nome}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 first-letter:uppercase">
                    {item.menu_item.descrizione}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span>{item.quantity}</span>
                </div>
                <div className="text-right font-medium">
                  €
                  {(item.quantity * (item.menu_item.prezzo as number)).toFixed(
                    2
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>Il tuo carrello è vuoto.</p>
          )}
        </div>
        <Separator className="my-4" />
        <ButtonWithMap setIsOrderEnabled={setIsOrderEnabled} />
      </div>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Riepilogo ordine</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between font-medium">
              <span>Totale complessivo</span>
              <span>€{(total as number).toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-sm">
              <span>di cui IVA</span>
              <span>€{(total * 0.22).toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pagamento</CardTitle>
          </CardHeader>
          <Form {...formOrder}>
            <form
              onSubmit={formOrder.handleSubmit(onSubmitOrder)}
              className="space-y-4"
            >
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <FormField
                      control={formOrder.control}
                      name="nome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={formOrder.control}
                      name="cognome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cognome</FormLabel>
                          <FormControl>
                            <Input placeholder="Cognome" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={formOrder.control}
                      name="slot_delivery"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Orario della consegna</FormLabel>
                          <TimeSlotSelector
                            openingTime="09:00"
                            closingTime="21:00"
                            required={true}
                            placeholder="Seleziona orario"
                            field={field}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={formOrder.control}
                      name="n_ombrellone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>N. Ombrellone</FormLabel>
                          <UmbrellaSelector
                            maxUmbrellas={100}
                            required={true}
                            placeholder="Seleziona N. ombrellone"
                            field={field}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={formOrder.control}
                      name="note"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Note</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Descrizione del prodotto"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payment">Metodo di pagamento</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona metodo di pagamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit-card">BEACH Card</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="apple-pay">Apple Pay</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!isOrderEnabled}
                >
                  Ordina
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
