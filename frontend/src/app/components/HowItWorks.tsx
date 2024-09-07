import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { FaBrain, FaQrcode } from "react-icons/fa";
import { MdOutlineWifiOff } from "react-icons/md";
import { IoMdAnalytics } from "react-icons/io";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <FaBrain />,
    title: "Dal cartaceo al digitale",
    description:
      "Carica il tuo menu cartaceo e converti rapidamente in digitale grazie alla nostra AI avanzata.",
  },
  {
    icon: <MdOutlineWifiOff />,
    title: "Internet? No grazie!",
    description:
      "Il sistema funziona anche offline, con pagamenti tramite Bites Card ricaricabile.",
  },
  {
    icon: <FaQrcode />,
    title: "Fast life!",
    description:
      "Nessuna registrazione necessaria. Scansiona il QR code, ordina e paga in pochi secondi.",
  },
  {
    icon: <IoMdAnalytics />,
    title: "Supervisiona",
    description:
      " Monitora ordini e fatturato dalla dashboard dedicata, tutto sotto controllo in un unico posto.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="come-funziona" className="container text-center py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold ">
        Come{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          funziona?
        </span>
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
        Scopri quanto è facile trasformare e gestire il tuo stabilimento
        balneare con Beach Bites.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card key={title} className="bg-muted/50">
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
