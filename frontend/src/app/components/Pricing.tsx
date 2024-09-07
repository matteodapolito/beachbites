import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

enum PopularPlanType {
  NO = 0,
  YES = 1,
}

interface PricingProps {
  title: string;
  popular: PopularPlanType;
  price: number;
  description: string;
  buttonText: string;
  benefitList: string[];
}

const pricingList: PricingProps[] = [
  {
    title: "Gratis",
    popular: 0,
    price: 0,
    description:
      "Perfetto per iniziare: gestione base del menu e ordini illimitati senza costi iniziali.",
    buttonText: "Inizia ora",
    benefitList: [
      "Carica fino a 15 Prodotti",
      "Ordini Illimitati",
      "Supporto Base",
    ],
  },
  {
    title: "Premium",
    popular: 1,
    price: 49.99,
    description:
      "Per un'esperienza completa: prodotti illimitati e supporto prioritario per qualsiasi problema.",
    buttonText: "Inizia Prova Gratuita",
    benefitList: [
      "Carica prodotti illimitati",
      "Ordini Illimitati",
      "Supporto Prioritario",
    ],
  },
  {
    title: "Enterprise",
    popular: 0,
    price: 99.99,
    description:
      "Soluzione su misura per grandi strutture: integrazioni personalizzate e supporto premium 24/7.",
    buttonText: "Contattaci",
    benefitList: [
      "Carica prodotti illimitati",
      "Ordini Illimitati",
      "Supporto Premium",
      "Integrazione Personalizzata",
      "Funzionalità Avanzate",
    ],
  },
];

export const Pricing = () => {
  return (
    <section id="prezzo" className="container sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        Ottieni l'accesso
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          {" "}
          Illimitato{" "}
        </span>
      </h2>
      <h3 className="text-xl text-center text-muted-foreground pt-4 pb-8">
        Scegli il pacchetto che soddisfa di più le tue necessità.
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pricingList.map((pricing: PricingProps) => (
          <Card
            key={pricing.title}
            className={
              pricing.popular === PopularPlanType.YES
                ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10"
                : ""
            }
          >
            <CardHeader>
              <CardTitle className="flex item-center justify-between">
                {pricing.title}
                {pricing.popular === PopularPlanType.YES ? (
                  <Badge variant="secondary" className="text-sm text-primary">
                    Il più popolare
                  </Badge>
                ) : null}
              </CardTitle>
              <div>
                <span className="text-3xl font-bold">€{pricing.price}</span>
                <span className="text-muted-foreground"> /mese</span>
              </div>

              <CardDescription>{pricing.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <Button className="w-full">{pricing.buttonText}</Button>
            </CardContent>

            <hr className="w-4/5 m-auto mb-4" />

            <CardFooter className="flex">
              <div className="space-y-4">
                {pricing.benefitList.map((benefit: string) => (
                  <span key={benefit} className="flex">
                    <Check className="text-green-500" />{" "}
                    <h3 className="ml-2">{benefit}</h3>
                  </span>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
