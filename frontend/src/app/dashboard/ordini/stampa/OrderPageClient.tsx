"use client";

import React from "react";
import Receipt from "@/app/dashboard/components/Receipt";
import { OrderItem } from "@/app/constants/constants";
import { Button } from "@/components/ui/button";

export default function OrderPageClient({
  orderItem,
}: {
  orderItem: OrderItem;
}) {
  const handlePrint = () => {
    const printWindow = window.open("", "_blank", "width=400,height=600");
    if (printWindow) {
      printWindow.document.write(
        "<html><head><title>Stampa Scontrino</title></head><body>"
      );
      printWindow.document.write(
        document.getElementById("receipt-content")?.innerHTML || ""
      );
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div>
      <div id="receipt-content">
        <Receipt order={orderItem} />
      </div>
      <div className="flex justify-center mt-5">
        <Button onClick={handlePrint}>Stampa Scontrino</Button>
      </div>
    </div>
  );
}
