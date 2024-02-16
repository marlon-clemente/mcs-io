"use client";

import Button from "@/components/button";
import * as Form from "@/components/form";
import { authenticateUserSchema } from "@/types/auth/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { LockKeyhole, LucideMail } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

export default function Auth() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authenticateUserSchema),
  });

  const authenticate = useMutation({
    mutationKey: ["auth"],
    mutationFn: async (data: any) => {
      const response = await axios.post("/api/auth/authenticate", data);
      router.push(response.data.to);
    },
  });

  const handleAuth = (data: any) => {
    console.log(data);
    authenticate.mutate(data);
  };

  return (
    <div className="select-none max-w-[360px] p-6 justify-center bg-[#f5f6fa] items-center rounded-md w-full shadow-2xl flex flex-col m-auto">
      <div className="flex flex-col justify-center items-center my-6">
        <div className="flex rounded-full">
          <LockKeyhole />
        </div>
        <h1 className="font-bold">Bem vindo</h1>
        <span className="text-center">
          Para acessar a aplicação, insira suas credenciais abaixo
        </span>
      </div>
      <Form.Root
        className="flex flex-col w-full gap-3"
        onSubmit={handleSubmit(handleAuth)}
      >
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Form.FieldText
              label="E-mail"
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
            <Form.FieldText
              label="Senha"
              messageError={errors.password?.message as string}
              icon={<LockKeyhole size={18} />}
              {...field}
            />
          )}
        />

        {authenticate.error?.message && <div>{authenticate.error.message}</div>}
        <Form.Submit asChild>
          <Button>Entrar</Button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
}
