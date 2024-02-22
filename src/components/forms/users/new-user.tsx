import * as Fields from "@/components/ui/fields";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LucideSend } from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import Button from "../../ui/button";
/**
 *
 * @description Formulário que envia email de solicitação a novo usuário
 */

const newUserSchmema = z.object({
  email: z
    .string({
      required_error: "E-mail é obrigatório",
    })
    .email({
      message: "E-mail inválido",
    }),
  validateInMinutes: z.number().int().positive().default(60),
});
type NewUser = z.infer<typeof newUserSchmema>;

export const NewUser: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewUser>({
    resolver: zodResolver(newUserSchmema),
  });

  const submitForm = (data: NewUser) => {
    console.log(data);
  };

  const mutate = useMutation({
    onMutate: async (data) => {
      console.log(data);
    },
  });

  return (
    <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-4">
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <Fields.InputText
            isRequired
            label="E-mail"
            type="email"
            isError={errors.email ? true : false}
            messageError={errors.email ? errors.email.message : ""}
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="validateInMinutes"
        render={({ field }) => (
          <Fields.InputText
            isRequired
            label="Validade do link de solicitação"
            sufix="minutos"
            isError={errors.validateInMinutes ? true : false}
            messageError={
              errors.validateInMinutes ? errors.validateInMinutes.message : ""
            }
            {...field}
          />
        )}
      />

      <div className="mt-[25px] flex justify-end">
        <Button
          type="submit"
          className="flex gap-2 justify-center items-center"
        >
          <LucideSend size={16} />
          <span>Enviar</span>
        </Button>
      </div>
    </form>
  );
};
