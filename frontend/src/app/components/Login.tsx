import React from "react";
import { useForm } from "react-hook-form";
import { AuthActions } from "@/app/auth/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();

  const router = useRouter();

  const { login, storeToken } = AuthActions();

  const onSubmit = (data: FormData) => {
    login(data.email, data.password)
      .json((json) => {
        storeToken(json.access, "access");
        storeToken(json.refresh, "refresh");

        router.push("/dashboard");
      })
      .catch((err) => {
        setError("root", { type: "manual", message: err.json.detail });
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Inserisci le credenziali per accedere al tuo account!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="mail@example.com"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-xs text-red-600">Email richiesta</span>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/auth/password/reset-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Hai dimenticato la password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-xs text-red-600">
                    Password richiesta
                  </span>
                )}
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              {errors.root && (
                <span className="text-xs text-red-600">
                  {errors.root.message}
                </span>
              )}
            </div>
            <div className="mt-4 text-center text-sm">
              Non hai un account?{" "}
              <Link href="/auth/register" className="underline">
                Registrati!
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default Login;
