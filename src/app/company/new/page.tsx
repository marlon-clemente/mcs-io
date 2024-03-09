"use client";

import { ContactForm } from "@/components/forms/contact";
import Button from "@/components/ui/button";
import Divider from "@/components/ui/divider";
import { InputText } from "@/components/ui/fields";
import Typography from "@/components/ui/typography";
import { Contact } from "@/types/contact";
import {
  LucideContact,
  LucideInfo,
  LucideMapPin,
  LucidePlusCircle,
  LucideUser,
} from "lucide-react";
import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

interface Company {
  contact: Contact[];
}

const NewCompany: React.FC = () => {
  const { control, handleSubmit, watch } = useForm<Company>({
    defaultValues: {
      contact: [],
    },
  });

  const {} = useFieldArray({
    name: "contact",
    control,
  });

  const company = watch();

  const handleSubmitForm = (data: Company) => {
    console.log(data);
  };

  return (
    <form
      className="flex flex-col w-full gap-8"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <Typography variant="title">Adicionar nova empresa</Typography>

      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <LucideInfo />
          <Typography variant="title">Informações da empresa</Typography>
        </div>
        <Divider />
      </div>

      <InputText label="Razão Social" />
      <InputText label="Nome Fantasia" />
      <InputText label="CNPJ" />

      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <LucideInfo />
          <Typography variant="title">Informações legais e fiscais</Typography>
        </div>
        <Divider />
      </div>

      <InputText label="Inscrição estadual " />
      <InputText label="Inscrição municipal " />

      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <LucideUser />
          <Typography variant="title">Representantes</Typography>
        </div>
        <Divider />
      </div>
      <div className="flex gap-2 w-full py-8 border border-gray-300 rounded justify-center">
        <LucidePlusCircle />
        <Typography variant="formLabel">
          Adicionar novo representante
        </Typography>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <LucideContact />
          <Typography variant="title">Contatos</Typography>
        </div>
        <Divider />
      </div>
      {company.contact.length > 0 ? (
        <Controller
          control={control}
          name="contact"
          render={() => <ContactForm />}
        />
      ) : (
        <div className="flex gap-2 w-full py-8 border border-gray-300 rounded justify-center">
          <LucidePlusCircle />
          <Typography variant="formLabel">Adicionar novo contato</Typography>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <LucideMapPin />
          <Typography variant="title">Endereço</Typography>
        </div>
        <Divider />
      </div>
      <div className="flex gap-2 w-full py-8 border border-gray-300 rounded justify-center">
        <LucidePlusCircle />
        <Typography variant="formLabel">Adicionar novo endereço</Typography>
      </div>
      <Button type="submit">Salvar</Button>
    </form>
  );
};

export default NewCompany;
