"use client";

import Button from "@/components/ui/button";
import * as Field from "@/components/ui/fields";
import { Message } from "@/components/ui/message";
import { userStore } from "@/store/user";
import { authenticateUserSchema } from "@/types/auth/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { LockKeyhole, LucideMail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function Auth() {
  const { setUser } = userStore((state) => state);
  const router = useRouter();
  const [errorAuth, setErrorAuth] = useState<string>("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authenticateUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: authenticate, isLoading } = useMutation({
    mutationKey: ["auth"],
    mutationFn: async (data: any) => {
      const response = await axios.post("/api/auth/authenticate", data);
      setUser({
        email: response.data.email,
        name: response.data.name,
        nameComplete: response.data.nameComplete,
        rules: response.data.rules,
      });
      router.push(response.data.to);
    },
    onError: (error: any) => {
      let message = error.response.data.message;

      if (message !== typeof "string")
        message = "Não foi possível autenticar o usuário";

      console.log(message);
      setErrorAuth(message);
    },
  });

  const handleAuth = (data: any) => {
    authenticate(data);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center my-6">
        <div className="flex rounded-full">
          <LockKeyhole />
        </div>
        <h1 className="font-bold">Bem vindo</h1>
        <span className="text-center">
          Para acessar a aplicação, insira suas credenciais abaixo
        </span>
      </div>
      <form
        className="flex flex-col w-full gap-3"
        onSubmit={handleSubmit(handleAuth)}
      >
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Field.InputText
              label="E-mail"
              autoComplete="username"
              messageError={errors.email?.message as string}
              icon={<LucideMail size={18} />}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Field.InputText
              label="Senha"
              autoComplete="current-password"
              type="password"
              messageError={errors.password?.message as string}
              icon={<LockKeyhole size={18} />}
              {...field}
            />
          )}
        />

        {errorAuth.length > 0 && <Message variant="error">{errorAuth}</Message>}

        <Button variant="primary" type="submit" isLoadind={isLoading}>
          Entrar
        </Button>
      </form>
    </>
  );
}
