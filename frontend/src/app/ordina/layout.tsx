"use client";

import React from "react";
import { CartProvider } from "@/app/ordina/context/CartContext";
import { NavbarClient } from "../components/NavbarClient";

export default function OrdinaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <NavbarClient />
      {children}
    </CartProvider>
  );
}
