import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthActions } from "@/app/auth/utils";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Loader2 } from "lucide-react"; // Importa l'icona dello spinner

type FormData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  re_password: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();

  const [showActivationMessage, setShowActivationMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register: registerUser } = AuthActions(); // Note: Renamed to avoid naming conflict with useForm's register

  const onSubmit = (data: FormData) => {
    setIsLoading(true);
    registerUser(
      data.email,
      data.first_name,
      data.last_name,
      data.password,
      data.re_password
    )
      .json(() => {
        setShowActivationMessage(true);
        setIsLoading(false);
      })
      .catch((err) => {
        Object.entries(err.json).forEach(([key, value]) => {
          if (typeof value === "string") {
            setError("root", { type: "manual", message: value });
          } else if (Array.isArray(value)) {
            setError("root", { type: "manual", message: value.join(", ") });
          }
        });
        console.log(err.json);
        setIsLoading(false);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">Registrati</CardTitle>
            <CardDescription>
              Inserisci le informazioni richieste per creare un account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">Nome</Label>
                  <Input
                    id="first-name"
                    placeholder="John"
                    {...register("first_name", {
                      required: "Nome obbligatorio",
                    })}
                  />
                  {errors.first_name && (
                    <span className="text-xs text-red-600">
                      {errors.first_name.message}
                    </span>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Cognome</Label>
                  <Input
                    id="last-name"
                    placeholder="Doe"
                    {...register("last_name", {
                      required: "Cognome obbligatorio",
                    })}
                  />
                  {errors.last_name && (
                    <span className="text-xs text-red-600">
                      {errors.last_name.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="mail@example.com"
                  {...register("email", { required: "Email obbligatoria" })}
                />
                {errors.email && (
                  <span className="text-xs text-red-600">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Password obbligatoria",
                  })}
                />
                {errors.password && (
                  <span className="text-xs text-red-600">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="re-password">Conferma Password</Label>
                <Input
                  id="re-password"
                  type="password"
                  {...register("re_password", {
                    required: "Conferma password obbligatoria",
                  })}
                />
                {errors.password && (
                  <span className="text-xs text-red-600">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creazione in corso...
                  </>
                ) : (
                  "Crea un account"
                )}
              </Button>
              {errors.root && (
                <span className="text-xs text-red-600">
                  {errors.root.message}
                </span>
              )}
            </div>
            <div className="mt-4 text-center text-sm">
              Hai già un account?{" "}
              <Link href="/auth/login" className="underline">
                Accedi
              </Link>
            </div>
          </CardContent>
          <CardFooter>
            {showActivationMessage && (
              <div className="text-sm text-center text-muted-foreground">
                <p>
                  Abbiamo inviato una email di attivazione al tuo indirizzo.
                </p>
                <p>
                  Per favore, controlla la tua casella di posta e segui le
                  istruzioni per attivare il tuo account.
                </p>
              </div>
            )}
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default Register;
