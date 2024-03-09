"use client";

import Button from "@/components/ui/button";
import * as Field from "@/components/ui/fields";
import { Message } from "@/components/ui/message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

interface NewUserHashByIdProps {
  hash: string;
  expirationDate: string;
}

const schemaNewUser = z
  .object({
    name: z.string({ required_error: "Nome é obrigatório" }),
    password: z.string({ required_error: "Senha é obrigatória" }),
    confirmPassword: z.string({
      required_error: "Confirmação de senha é obrigatória",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type NewUser = z.infer<typeof schemaNewUser>;

const getDate = (expirationDate: string) => {
  const date = new Date(expirationDate);

  const timeString = date.toLocaleTimeString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
  });

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${timeString} de ${day}/${month}/${year}`;
};

const NewUserHashById: React.FC<NewUserHashByIdProps> = ({
  expirationDate,
  hash,
}) => {
  const navegation = useRouter();
  const [statusMessage, setStatusMessage] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewUser>({
    resolver: zodResolver(schemaNewUser),
  });

  const saveUser = useMutation({
    mutationFn: async (data: Omit<NewUser, "confirmPassword">) => {
      await axios.post(`/api/user/new/hash/${hash}`, data);
      setStatusMessage(
        "Sua conta foi criada com sucesso. Redirecionando para a tela de login."
      );
      setTimeout(() => {
        navegation.push("/auth");
      }, 1000);
    },
  });

  const submitForm = ({ name, password }: NewUser): void => {
    saveUser.mutate({
      name,
      password,
    });
  };

  return (
    <form
      className="w-full flex flex-col gap-3"
      onSubmit={handleSubmit(submitForm)}
    >
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <Field.InputText
            {...field}
            label="Nome completo"
            isError={errors.name?.message && true}
            messageError={errors.name?.message}
            placeholder="Insira seu nome completo"
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <Field.InputText
            {...field}
            type="password"
            isError={errors.password?.message}
            messageError={errors.password?.message}
            label="Crie uma senha"
            placeholder="Digite uma senha"
          />
        )}
      />
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field }) => (
          <Field.InputText
            {...field}
            type="password"
            isError={errors.confirmPassword?.message}
            messageError={errors.confirmPassword?.message}
            label="Digite sua senha novamente"
            placeholder="Confirme sua senha"
          />
        )}
      />

      <Message className="mt-4">
        Este link é válido até {getDate(expirationDate)}
      </Message>

      {statusMessage && <Message variant="success">{statusMessage}</Message>}

      <Button isLoadind={saveUser.isLoading} type="submit">
        Confirmar
      </Button>
    </form>
  );
};

export default NewUserHashById;
