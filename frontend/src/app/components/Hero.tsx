import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button";
import { HeroCards } from "./HeroCards";
import { IoCallOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

export const Hero = () => {
  const router = useRouter();

  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">Porta il tuo stabilimento balneare nel</h1>{" "}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#fbdc61] via-[#f1ab1f] to-[#d7b703] text-transparent bg-clip-text">
              futuro
            </span>{" "}
          </h2>
          con{" "}
          <span className="inline bg-gradient-to-r from-[#fba661] via-[#f1ab1f] to-[#d7b703] text-transparent bg-clip-text">
            Beach Bites
          </span>{" "}
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Offri ai tuoi clienti un'esperienza di lusso con ordini veloci e
          facili direttamente sotto l'ombrellone.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Button
            onClick={() => router.push("/auth/login")}
            className="w-full md:w-1/3"
          >
            Demo Gestore
          </Button>

          <Button
            onClick={() => router.push("/ordina")}
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "secondary",
            })}`}
          >
            Demo Cliente
          </Button>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
