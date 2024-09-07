"use client";

import { useState, useContext, useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FaShoppingCart, FaMinus, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { CartContext } from "@/app/ordina/context/CartContext";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

export default function Cart() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const router = useRouter();

  const cartContext = useContext(CartContext);
  const {
    cartItems,
    addToCart,
    removeFromCart,
    removeEntireProduct,
    clearCart,
  } = cartContext || {};

  const total =
    cartItems?.reduce(
      (acc, item) => acc + item.menu_item.prezzo * item.quantity,
      0
    ) || 0;

  useEffect(() => {
    const totalItems =
      cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;
    setTotalItems(totalItems);
  });

  return (
    <div className="relative">
      <button
        className="fixed bottom-20 right-10 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-105 focus:outline-none"
        onClick={() => setIsCartOpen(true)}
      >
        <FaShoppingCart />
        {totalItems > 0 && (
          <Badge
            variant="outline"
            className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground"
          >
            {totalItems}
          </Badge>
        )}
      </button>
      <Drawer open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Il tuo Carrello</DrawerTitle>
            <DrawerDescription>
              Rivedi i prodotti nel carrello e procedi al pagamento!
            </DrawerDescription>
          </DrawerHeader>
          <div className="space-y-4 px-4 py-6">
            {cartItems?.map((item) => (
              <div
                key={item.menu_item.id}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-4"
              >
                <img
                  src="/placeholder.jpg"
                  alt={item.menu_item.nome}
                  width={64}
                  height={64}
                  className="rounded-md"
                  style={{ aspectRatio: "64/64", objectFit: "cover" }}
                />
                <div>
                  <h4 className="font-medium first-letter:uppercase">
                    {item.menu_item.nome}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    €{item.menu_item.prezzo} x {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={() =>
                      removeFromCart && removeFromCart(item.menu_item.id)
                    }
                  >
                    <FaMinus />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={() =>
                      addToCart &&
                      addToCart({ menu_item: item.menu_item, quantity: 1 })
                    }
                  >
                    <FaPlus />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={() =>
                      removeEntireProduct &&
                      removeEntireProduct(item.menu_item.id)
                    }
                  >
                    <FaRegTrashAlt />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="px-4 py-6">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Totale:</span>
              <span className="text-lg font-medium">€{total.toFixed(2)}</span>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <Button
                onClick={() =>
                  totalItems > 0 && router.push("/ordina/checkout")
                }
                disabled={totalItems === 0}
              >
                Pagamento
              </Button>
              <Button variant="outline" onClick={() => setIsCartOpen(false)}>
                Aggiungi altro
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
