"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AuthActions } from "@/app/auth/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ActivationPage = () => {
  const [isActivating, setIsActivating] = useState(true);
  const [activationStatus, setActivationStatus] = useState<
    "success" | "error" | null
  >(null);

  const params = useParams();
  const { activateAccount } = AuthActions();

  useEffect(() => {
    const uid = params.uid as string;
    const token = params.token as string;

    if (uid && token && isActivating) {
      activateAccount(uid, token)
        .json()
        .then(() => {
          setActivationStatus("success");
          setIsActivating(false);
        })
        .catch((err) => {
          console.log(err.json);
          setActivationStatus("error");
          setIsActivating(false);
        });
    } else if (!uid || !token) {
      setActivationStatus("error");
      setIsActivating(false);
    }
  }, [params, isActivating, activateAccount]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Attivazione Account - {}</CardTitle>
          <CardDescription>
            {isActivating
              ? "Stiamo attivando il tuo account..."
              : activationStatus === "success"
              ? "Il tuo account è stato attivato con successo!"
              : "Si è verificato un errore durante l'attivazione dell'account oppure l'account è stato già attivato."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isActivating && (
            <Button
              className="w-full"
              onClick={() => (window.location.href = "/auth/login")}
            >
              {activationStatus === "success"
                ? "Vai al Login"
                : "Torna alla Home"}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivationPage;
