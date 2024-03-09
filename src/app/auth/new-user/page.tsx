"use client";
import NewUserHash from "@/components/forms/users/new-user-by-hash";
import Typography from "@/components/ui/typography";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LucideLoader } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React from "react";

const NewUser: React.FC = () => {
  const parameters = useSearchParams();
  const hash = parameters?.get("hash") || "";

  const { data, isLoading } = useQuery({
    queryKey: ["new-user", hash],
    queryFn: async () => {
      return await axios.get<{ expirationDate: string }>(
        `/api/user/new/verify/hash/${hash}`
      );
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col w-full justify-center items-center py-6">
        <div className="animate-spin">
          <LucideLoader />
        </div>
        <span>Carregando</span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col w-full justify-center items-center py-6">
        <span>Ocorreu um erro</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full py-6 gap-2 animate-fade-up animate-once">
      <Typography variant="h1">Olá! Bem vindo ao mcs.io</Typography>
      <Typography variant="description">
        Insira seus dados abaixo para continuar com o cadastro.
      </Typography>
      <NewUserHash hash={hash} expirationDate={data.data.expirationDate} />
    </div>
  );
};

export default NewUser;
