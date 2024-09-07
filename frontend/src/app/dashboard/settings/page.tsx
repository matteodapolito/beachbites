"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FaRegTrashAlt } from "react-icons/fa";
import CommonBreadcrumbs from "@/app/components/CommonBreadcumbs";
import { OrdersActions } from "@/app/ordina/utils";
import { UserSettings } from "@/app/constants/constants";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import MapComponent from "@/app/ordina/components/Maps";
import { findCentralPoint } from "../utils";

const settingsSchema = z.object({
  company_name: z.string().min(1, "Il nome dello stabilimento è obbligatorio"),
  company_address: z
    .string()
    .min(1, "L'indirizzo dello stabilimento è obbligatorio"),
  company_phone: z
    .string()
    .regex(
      /^[0-9]{10}$/,
      "Il numero di telefono deve essere composto da 10 cifre"
    ),
  umbrella_count: z
    .number()
    .min(1, "Il numero di ombrelloni deve essere almeno 1"),
  gps_coordinates: z
    .array(
      z.object({
        lat: z.number().min(-90).max(90),
        lng: z.number().min(-180).max(180),
      })
    )
    .min(1, "Inserisci almeno una coordinata GPS"),
  opening_time: z
    .string()
    .regex(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,
      "Formato orario non valido"
    ),
  closing_time: z
    .string()
    .regex(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,
      "Formato orario non valido"
    ),
  profile_picture: z.instanceof(File),
});

export default function SettingsPage() {
  const [coordinates, setCoordinates] = useState([
    { lat: 41.902782, lng: 12.496366 },
  ]);

  const { getUserSettings, putUserSettings } = OrdersActions();
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      umbrella_count: 0,
      gps_coordinates: [],
      opening_time: "",
      closing_time: "",
      company_name: "",
      company_address: "",
      company_phone: "",
      profile_picture: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof settingsSchema>) {
    console.log("ONSUB: ", values);

    // Crea un nuovo oggetto FormData
    const formData = new FormData();

    // Aggiungi tutti i campi al FormData
    Object.keys(values).forEach((key) => {
      if (key === "profile_picture" && values[key] instanceof File) {
        formData.append(key, values[key]);
      } else if (key === "gps_coordinates") {
        formData.append(key, JSON.stringify(values[key]));
      } else {
        formData.append(key, String(values[key as keyof typeof values]));
      }
    });

    putUserSettings(values)
      .then((settings) => {
        form.reset({
          umbrella_count: values.umbrella_count,
          gps_coordinates: values.gps_coordinates,
          opening_time: values.opening_time,
          closing_time: values.closing_time,
          company_name: values.company_name,
          company_address: values.company_address,
          company_phone: values.company_phone,
          profile_picture: values.profile_picture,
        } as z.infer<typeof settingsSchema>);
        setCoordinates(values.gps_coordinates);
        toast("Impostazioni salvate con successo!");
      })
      .catch((errore) => {
        toast("Errore nel salvataggio delle impostazioni: " + errore);
      });
  }

  const addCoordinate = () => {
    setCoordinates([...coordinates, { lat: 0, lng: 0 }]);
  };

  const removeCoordinate = (index: number) => {
    const newCoordinates = [...coordinates];
    newCoordinates.splice(index, 1);
    setCoordinates(newCoordinates);

    const currentCoordinates = form.getValues("gps_coordinates");
    currentCoordinates.splice(index, 1);
    form.setValue("gps_coordinates", currentCoordinates);
  };

  useEffect(() => {
    getUserSettings()
      .json((settings: UserSettings) => {
        form.reset({
          umbrella_count: settings.umbrella_count,
          gps_coordinates: settings.gps_coordinates,
          opening_time: settings.opening_time,
          closing_time: settings.closing_time,
          company_name: settings.company_name,
          company_address: settings.company_address,
          company_phone: settings.company_phone,
        } as z.infer<typeof settingsSchema>);
        setCoordinates(settings.gps_coordinates);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Impostazioni</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="profile_picture"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormLabel>Logo dello stabilimento</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".png,.jpg,.jpeg"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 1024 * 1024) {
                            toast.error("Il file non deve superare 1MB");
                            e.target.value = "";
                            return;
                          }
                          onChange(file);
                        }
                      }}
                      {...rest}
                    />
                  </FormControl>
                  <FormDescription>
                    Carica un'immagine PNG o JPG (max 1MB)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome dello stabilimento balneare</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company_address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Indirizzo dello stabilimento</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company_phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numero di telefono</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="umbrella_count"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numero di ombrelloni</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {coordinates.map((coord, index) => (
              <div key={index} className="flex space-x-4">
                <FormField
                  control={form.control}
                  name={`gps_coordinates.${index}.lat`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Latitudine {index + 1}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="any"
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
                  name={`gps_coordinates.${index}.lng`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Longitudine {index + 1}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="any"
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
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeCoordinate(index)}
                >
                  <FaRegTrashAlt className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <Button type="button" variant="outline" onClick={addCoordinate}>
              Aggiungi coordinata GPS
            </Button>

            <h1 className="font-bold">
              Area in cui il servizio sarà disponibile
            </h1>
            <MapComponent
              position={findCentralPoint(coordinates) || { lat: 0, lng: 0 }}
              points={coordinates || []}
            />

            <FormField
              control={form.control}
              name="opening_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Orario di apertura</FormLabel>
                  <FormControl>
                    <Input type="time" step="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="closing_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Orario di chiusura</FormLabel>
                  <FormControl>
                    <Input type="time" step="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Salva impostazioni</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
