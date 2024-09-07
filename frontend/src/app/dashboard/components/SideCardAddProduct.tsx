import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Allergene, Category, Prodotto } from "@/app/constants/constants";
import { MultiSelect } from "@/app/components/MultiSelect";
import { OrdersActions } from "@/app/ordina/utils";
import { toast } from "sonner";
import { FaPlus } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  nome: z
    .string()
    .min(2, { message: "Il nome deve contenere almeno 2 caratteri" }),
  descrizione: z
    .string()
    .min(10, { message: "La descrizione deve contenere almeno 10 caratteri" }),
  prezzo: z.number().min(0, { message: "Il prezzo non può essere negativo" }),
  categoria: z.string(),
  allergeni: z.array(z.number()),
});

export default function SideCardAddProduct({
  categories,
  allergeni,
  setProducts,
  setCategories,
  setAllergeni,
}: {
  categories: Category[];
  allergeni: Allergene[];
  setProducts: React.Dispatch<React.SetStateAction<Prodotto[]>>;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  setAllergeni: React.Dispatch<React.SetStateAction<Allergene[]>>;
}) {
  const { addProduct, addCategory, addAllergene } = OrdersActions();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      descrizione: "",
      prezzo: 0.0,
      categoria: "0",
      allergeni: [],
    },
  });

  const singleFeatureFormSchema = z.object({
    nome: z
      .string()
      .min(2, { message: "Il nome deve contenere almeno 2 caratteri" }),
  });

  const singlefeatureForm = useForm<z.infer<typeof singleFeatureFormSchema>>({
    resolver: zodResolver(singleFeatureFormSchema),
    defaultValues: {
      nome: "",
    },
  });

  function onSubmitCategory(values: z.infer<typeof singleFeatureFormSchema>) {
    addCategory({ name: values.nome })
      .then((result) => {
        toast("Categoria creata con successo");
        setCategories((prevCategories) => [
          ...prevCategories,
          result as Category,
        ]);
        singlefeatureForm.reset();
      })
      .catch((errore) => {
        toast("Errore nella creazione della categoria: " + errore);
      });
  }

  function onSubmitAllergene(values: z.infer<typeof singleFeatureFormSchema>) {
    addAllergene({ name: values.nome })
      .then((result) => {
        toast("Allergene creato con successo");
        setAllergeni((prevAllergeni) => [...prevAllergeni, result as Category]);
        singlefeatureForm.reset();
      })
      .catch((errore) => {
        toast("Errore nella creazione della categoria: " + errore);
      });
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    addProduct({ product: values })
      .then((risposta) => {
        toast("Prodotto creato con successo");
        setProducts((prevProducts) => [...prevProducts, risposta as Prodotto]);
        form.reset();
      })
      .catch((errore) =>
        toast("Errore nella creazione del prodotto: " + errore)
      );
  }

  return (
    <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
      <CardHeader className="flex flex-row gap-4 items-start bg-muted/50">
        <img
          src="/placeholder.jpg"
          width={64}
          height={64}
          className="rounded-md"
          style={{ aspectRatio: "64/64", objectFit: "cover" }}
        />
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Aggiungi prodotto
          </CardTitle>

          <CardDescription className="text-capitalize">
            Compila il modulo per aggiungere un nuovo prodotto.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome del prodotto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="descrizione"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrizione</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descrizione del prodotto"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prezzo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prezzo</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Prezzo"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoria"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Categoria{" "}
                    <Dialog>
                      <DialogTrigger>
                        <Badge onClick={() => {}}>
                          <FaPlus />
                        </Badge>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Aggiungi nuova categoria</DialogTitle>
                          <DialogDescription>
                            Inserisci il nome della nuova categoria da
                            aggiungere alla lista.
                          </DialogDescription>
                        </DialogHeader>
                        <Form {...singlefeatureForm}>
                          <form
                            onSubmit={singlefeatureForm.handleSubmit(
                              onSubmitCategory
                            )}
                            className="space-y-4"
                          >
                            <FormField
                              control={singlefeatureForm.control}
                              name="nome"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Nome Categoria</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Inserisci il nome della categoria"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button type="submit">Aggiungi Categoria</Button>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona una categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((categoria) => (
                        <SelectItem
                          key={categoria.id}
                          value={categoria.id.toString()}
                        >
                          <p className="capitalize">{categoria.nome}</p>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="allergeni"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Allergeni{" "}
                    <Dialog>
                      <DialogTrigger>
                        <Badge onClick={() => {}}>
                          <FaPlus />
                        </Badge>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Aggiungi nuovo allergene</DialogTitle>
                          <DialogDescription>
                            Inserisci il nome del nuovo allergene da aggiungere
                            alla lista.
                          </DialogDescription>
                        </DialogHeader>
                        <Form {...singlefeatureForm}>
                          <form
                            onSubmit={singlefeatureForm.handleSubmit(
                              onSubmitAllergene
                            )}
                            className="space-y-4"
                          >
                            <FormField
                              control={singlefeatureForm.control}
                              name="nome"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Nome Allergene</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Inserisci il nome dell'allergene"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button type="submit">Aggiungi Allergene</Button>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                  </FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={allergeni.map((allergene) => ({
                        value: allergene.id.toString(),
                        label: allergene.nome,
                      }))}
                      onValueChange={(selectedValues: string[]) => {
                        field.onChange(
                          selectedValues.map((value) => parseInt(value))
                        );
                      }}
                      defaultValue={field.value.map(String)}
                      placeholder="Seleziona gli allergeni"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Aggiungi Prodotto</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
