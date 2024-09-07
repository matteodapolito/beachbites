import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Check, Linkedin } from "lucide-react";
import { MdRadar } from "react-icons/md";

export const HeroCards = () => {
  return (
    <div className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]">
      {/* Testimonial */}
      <Card className="absolute w-[340px] -top-[15px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Avatar>
            <AvatarImage alt="" src="https://i.pravatar.cc/150?img=38" />
            <AvatarFallback>SH</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <CardTitle className="text-lg">Giulia</CardTitle>
            <CardDescription>@mare_luxe</CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          Beach Bites ha trasformato il nostro servizio in spiaggia, rendendolo
          più efficiente e moderno.
        </CardContent>
      </Card>

      {/* Team */}
      <Card className="absolute right-[20px] top-4 w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="mt-8 flex justify-center items-center pb-2">
          <img
            src="https://i.pravatar.cc/150?img=56"
            alt="user avatar"
            className="absolute grayscale-[0%] -top-12 rounded-full w-24 h-24 aspect-square object-cover"
          />
          <CardTitle className="text-center">Andrea</CardTitle>
          <CardDescription className="font-normal text-primary">
            Imprenditore
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center pb-2">
          <p>
            Da quando abbiamo introdotto Beach Bites, i nostri clienti sono
            entusiasti. Il numero di ordini è aumentato e il personale è più
            organizzato!
          </p>
        </CardContent>
      </Card>

      {/* Pricing */}
      <Card className="absolute top-[150px] left-[50px] w-72  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader>
          <CardTitle className="flex item-center justify-between">
            Gratis
            <Badge variant="secondary" className="text-sm text-primary">
              Il più popolare
            </Badge>
          </CardTitle>
          <div>
            <span className="text-3xl font-bold">€0</span>
            <span className="text-muted-foreground"> /mese</span>
          </div>

          <CardDescription>
            Perfetto per iniziare: gestione base del menu e ordini illimitati
            senza costi iniziali.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button className="w-full">Prova Gratis</Button>
        </CardContent>

        <hr className="w-4/5 m-auto mb-4" />

        <CardFooter className="flex">
          <div className="space-y-4">
            {["15 prodotti", "Ordini illimitati", "Supporto Base"].map(
              (benefit: string) => (
                <span key={benefit} className="flex">
                  <Check className="text-green-500" />{" "}
                  <h3 className="ml-2">{benefit}</h3>
                </span>
              )
            )}
          </div>
        </CardFooter>
      </Card>

      {/* Service */}
      <Card className="absolute w-[350px] -right-[10px] bottom-[35px]  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
          <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
            <MdRadar className="w-8 h-8" />
          </div>
          <div>
            <CardTitle>Ordini veritieri</CardTitle>
            <CardDescription className="text-md mt-2">
              Limita gli ordini alla tua area, evitando confusione.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};
