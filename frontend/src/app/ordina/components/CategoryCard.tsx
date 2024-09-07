import { Prodotto } from "@/app/constants/constants";
import MenuItem from "@/app/ordina/components/MenuItem";

export default function CategoryCard({
  categoria,
  prodotti,
}: {
  categoria: string;
  prodotti: Prodotto[];
}) {
  return (
    <div className="bg-muted rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 first-letter:uppercase">
        {categoria}
      </h2>
      <ul className="grid gap-4">
        {prodotti.map((prodotto: any) => (
          <MenuItem key={prodotto.id} prodotto={prodotto} />
        ))}
      </ul>
    </div>
  );
}
