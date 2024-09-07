import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "Cos'è BeachBites?",
    answer:
      "BeachBites è una soluzione completa per ordinare bevande, gelati e aperitivi direttamente dalla spiaggia. Utilizzando il nostro servizio, i clienti possono effettuare ordini comodamente dal loro lettino, senza doversi alzare.",
    value: "item-1",
  },
  {
    question: "Come funziona il sistema di ordini di BeachBites?",
    answer:
      "I clienti scansionano un QR code posizionato sull'ombrellone, selezionano i prodotti desiderati e completano il pagamento. Il sistema BitesCard permette di effettuare pagamenti anche senza connessione internet, utilizzando una carta prepagata ricaricabile.",
    value: "item-2",
  },
  {
    question: "Quali sono i requisiti per utilizzare BeachBites?",
    answer:
      "BeachBites richiede solo una connessione a internet per la configurazione iniziale e la gestione dei dati. Tuttavia, i pagamenti possono essere effettuati anche offline utilizzando la BitesCard, che può essere ricaricata presso la reception.",
    value: "item-3",
  },
  {
    question: "Come posso configurare il menu per BeachBites?",
    answer:
      "Puoi caricare il tuo menu cartaceo nel sistema BeachBites utilizzando la funzione di conversione AI, che trasforma il menu in formato digitale in pochi minuti. Non è necessario un intervento manuale lungo e complesso.",
    value: "item-4",
  },
  {
    question:
      "Che tipo di supporto è disponibile per gli utenti di BeachBites?",
    answer:
      "BeachBites offre supporto di base per gli utenti del piano Gratis e supporto prioritario via email e chat per i piani Premium. Per i clienti del piano Enterprise, è disponibile supporto premium 24/7 con consulenza personalizzata.",
    value: "item-5",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="container py-12 sm:py-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Domande{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          frequenti
        </span>
      </h2>

      <Accordion type="single" collapsible className="w-full AccordionRoot">
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Hai delle ulteriori domande?{" "}
        <a
          rel="noreferrer noopener"
          href="#"
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          Contattaci
        </a>
      </h3>
    </section>
  );
};
