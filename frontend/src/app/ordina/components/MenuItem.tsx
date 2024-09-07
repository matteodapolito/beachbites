import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/app/ordina/context/CartContext";
import { CartItem, Prodotto } from "@/app/constants/constants";
import { Badge } from "@/components/ui/badge";
import { FaMinus, FaPlus, FaRegTrashAlt } from "react-icons/fa";

export default function MenuItem({ prodotto }: { prodotto: Prodotto }) {
  // export default function MenuItem(props: any) {
  const cartContext = useContext(CartContext);
  const { cartItems, addToCart, removeFromCart, clearCart } = cartContext || {};

  const [isInCart, setIsInCart] = useState<boolean>(false);
  const [quantityInCart, setQuantityInCart] = useState<number>(0);

  useEffect(() => {
    const itemInCart = cartItems?.find(
      (item) => item.menu_item.id === prodotto.id
    );
    setIsInCart(!!itemInCart);
    setQuantityInCart(itemInCart ? itemInCart.quantity : 0);
  });

  return (
    <li className="flex items-center gap-3 justify-between">
      <img
        src="/placeholder.jpg"
        alt={prodotto.nome}
        width={64}
        height={64}
        className="rounded-md"
        style={{ aspectRatio: "64/64", objectFit: "cover" }}
      />
      <div>
        <h3 className="text-lg font-medium first-letter:uppercase">
          {prodotto.nome}
        </h3>
        <p className="text-muted-foreground text-sm first-letter:uppercase	">
          {prodotto.descrizione}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-medium">€{prodotto.prezzo}</span>

        {!isInCart && (
          <Button
            size="sm"
            className="relative"
            onClick={() =>
              addToCart && addToCart({ menu_item: prodotto, quantity: 1 })
            }
          >
            Ordina
            {isInCart && (
              <Badge
                variant="secondary"
                className="absolute -top-3 -right-4 flex h-6 w-6 items-center justify-center rounded-full"
              >
                {quantityInCart}
              </Badge>
            )}
          </Button>
        )}

        {isInCart && (
          <div className="flex items-center border-2 border-gray-700 rounded-md relative">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={() => removeFromCart && removeFromCart(prodotto.id)}
            >
              <FaMinus />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={() =>
                addToCart && addToCart({ menu_item: prodotto, quantity: 1 })
              }
            >
              <Badge
                variant="secondary"
                className="absolute -top-3 -right-4 flex h-6 w-6 items-center justify-center rounded-full"
              >
                {quantityInCart}
              </Badge>
              <FaPlus />
            </Button>
          </div>
        )}
      </div>
    </li>
  );
}
