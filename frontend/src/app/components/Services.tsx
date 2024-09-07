import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { RiRefund2Fill } from "react-icons/ri";
import { FaRegCreditCard } from "react-icons/fa";
import { MdOutlineWifiOff } from "react-icons/md";
import Image from "next/image";

interface ServiceProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

const serviceList: ServiceProps[] = [
  {
    title: "Generazione",
    description:
      "La Bites Card viene generata con un codice univoco presso la reception, garantendo un'identificazione sicura e precisa per ogni transazione.",
    icon: <FaRegCreditCard className="h-10 w-10 p-1" />,
  },
  {
    title: "Pagamenti Offline",
    description:
      "La Bites Card opera su un sistema locale indipendente da internet, assicurando transazioni stabili e affidabili anche in assenza di connessione.",
    icon: <MdOutlineWifiOff className="h-10 w-10 p-1" />,
  },
  {
    title: "Gestione del Credito e Rimborso",
    description:
      "Il sistema permette di monitorare il saldo in tempo reale, con possibilità di rimborso del credito residuo a fine stagione tramite database centralizzato.",
    icon: <RiRefund2Fill className="h-10 w-10 p-1" />,
  },
];

export const Services = () => {
  return (
    <section className="container py-12 sm:py-32">
      <div className="grid lg:grid-cols-[1fr,1fr] gap-8 place-items-center">
        <div>
          <main className="text-5xl md:text-3xl font-bold">
            <h1 className="inline">Semplifica la Gestione dei Pagamenti con</h1>{" "}
            <h2 className="inline">
              <span className="inline bg-gradient-to-r from-[#fbdc61] via-[#f1ab1f] to-[#d7b703] text-transparent bg-clip-text">
                BitesCard
              </span>{" "}
            </h2>
          </main>
          <p className="text-muted-foreground text-xl mt-4 mb-8 ">
            Implementa una soluzione innovativa che consente pagamenti offline,
            gestione centralizzata del credito e un'esperienza cliente senza
            pari, tutto con un’unica carta ricaricabile.
          </p>

          <div className="flex flex-col gap-8">
            {serviceList.map(({ icon, title, description }: ServiceProps) => (
              <Card key={title}>
                <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                  <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
                    {icon}
                  </div>
                  <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="text-md mt-2">
                      {description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
        <div className="w-[300px] md:w-[500px] lg:w-[600px] object-contain">
          <Image
            src="/bites-card.gif"
            alt="Bites Card"
            width={600}
            height={600}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};
