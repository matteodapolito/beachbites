import { OrderItem } from "@/app/constants/constants";

export const calculateEarnings = (orders: OrderItem[]) => {
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const weeklyTotal = orders.reduce((total: number, order: OrderItem) => {
    const orderDate = new Date(order.data_ordine);
    if (orderDate >= startOfWeek) {
      return (
        total +
        order.elementi.reduce(
          (sum: number, item: { prezzo_totale: string | number }) =>
            sum + (Number(item.prezzo_totale) || 0),
          0
        )
      );
    }
    return total;
  }, 0);

  const monthlyTotal = orders.reduce((total: number, order: OrderItem) => {
    const orderDate = new Date(order.data_ordine);
    if (orderDate >= startOfMonth) {
      return (
        total +
        order.elementi.reduce(
          (sum: number, item: { prezzo_totale: string | number }) =>
            sum + (Number(item.prezzo_totale) || 0),
          0
        )
      );
    }
    return total;
  }, 0);

  return { weeklyTotal, monthlyTotal };
};

export const findCentralPoint = (
  coordinates: { lat: number; lng: number }[]
) => {
  if (coordinates.length === 0) {
    return null;
  }

  const sumLat = coordinates.reduce((sum, coord) => sum + coord.lat, 0);
  const sumLng = coordinates.reduce((sum, coord) => sum + coord.lng, 0);
  const count = coordinates.length;

  return {
    lat: sumLat / count,
    lng: sumLng / count,
  };
};
