"use client";

import ModalAddress from "@/components/Modal/modal-address";
import Button from "@/components/ui/button";
import Divider from "@/components/ui/divider";
import { InputText } from "@/components/ui/fields";
import * as Modal from "@/components/ui/modal";
import Typography from "@/components/ui/typography";
import { addressSchema } from "@/types/Address";
import { contactSchema } from "@/types/contact";
import { isValidCNPJ } from "@/utils/validateCNPJ";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LucideContact,
  LucideImagePlus,
  LucideInfo,
  LucideMapPin,
  LucidePlusCircle,
  LucideTrash2,
  LucideUser,
} from "lucide-react";
import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const CompanySchema = z.object({
  corporateReason: z
    .string({ required_error: "Razão social é obrigatória" })
    .min(1, { message: "Razão social é obrigatória" }),
  fantasyName: z
    .string({ required_error: "Nome fantasia é obrigatório" })
    .min(1, { message: "Nome fantasia é obrigatório" }),
  cpnj: z
    .string({ required_error: "CNPJ obrigatório" })
    .refine((cnpj) => isValidCNPJ(cnpj), {
      message: "CNPJ inválido",
    }),
  contact: z.array(contactSchema),
  address: z.array(addressSchema),
});

type Company = z.infer<typeof CompanySchema>;

const NewCompany: React.FC = () => {
  const [isOpenModalCEP, setIsOpenModalCEP] = React.useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Company>({
    resolver: zodResolver(CompanySchema),
    defaultValues: {
      contact: [],
    },
  });

  const { insert, remove } = useFieldArray({
    control,
    name: "address",
  });

  const handleSubmitForm = (data: Company) => {
    console.log(data);
  };

  const updateAddres = (address: any) => {
    insert(0, address);
  };

  const removeAddress = (index: number) => {
    remove(index);
  };

  return (
    <>
      <form
        id="company-form"
        className="flex flex-col w-full gap-8"
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <div>
          <Typography variant="title">Adicionar nova empresa</Typography>
          <Divider />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <div className="bg-gray-300 rounded h-64 w-64 flex justify-center items-center">
              <div className="flex flex-col items-center">
                <LucideImagePlus />
                <span>Adicionar logo da empresa</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col col-span-2 gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <LucideInfo />
                <Typography variant="title">Informações da empresa</Typography>
              </div>
              <Divider />
            </div>

            <Controller
              control={control}
              name="corporateReason"
              render={(field) => (
                <InputText
                  {...field.field}
                  isRequired
                  placeholder="Informe a razão social"
                  isError={errors.corporateReason !== undefined}
                  label="Razão Social"
                  messageError={errors.corporateReason?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="fantasyName"
              render={(field) => (
                <InputText
                  {...field.field}
                  isRequired
                  placeholder="Informe o nome fantasia"
                  isError={errors.fantasyName !== undefined}
                  label="Razão Social"
                  messageError={errors.fantasyName?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="cpnj"
              render={(field) => (
                <InputText
                  {...field.field}
                  isRequired
                  placeholder="Informe o CNPJ"
                  isError={errors.cpnj !== undefined}
                  label="CNPJ"
                  mask="00.000.000/0000-00"
                  messageError={errors.cpnj?.message}
                />
              )}
            />

            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <LucideInfo />
                <Typography variant="title">
                  Informações legais e fiscais
                </Typography>
              </div>
              <Divider />
            </div>

            <InputText
              label="Inscrição estadual "
              placeholder="Informe a inscrição estadual"
            />
            <InputText
              label="Inscrição municipal"
              placeholder="Informe a inscrição municipal"
            />

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
              {/* <InputContact value={} /> */}
            </div>

            <div className="flex gap-2 w-full py-8 border border-gray-300 rounded justify-center">
              <LucidePlusCircle />
              <Typography variant="formLabel">
                Adicionar novo contato
              </Typography>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <LucideMapPin />
                <Typography variant="title">Endereço</Typography>
              </div>
              <Divider />
            </div>
            <div className="flex flex-col w-full gap-2">
              {watch("address")?.map((address, index) => (
                <div
                  key={index}
                  className="flex gap-2 bg-gray-100 p-4 rounded justify-between hover:cursor-pointer"
                >
                  <Typography variant="formLabel">
                    {address.cep} - {address.cidade} - {address.uf}
                  </Typography>
                  <button
                    type="button"
                    onClick={() => removeAddress(index)}
                    className="hover:text-red-500"
                  >
                    <LucideTrash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            <div
              className="flex gap-2 w-full py-8 border border-gray-300 rounded justify-center hover:cursor-pointer "
              onClick={() => setIsOpenModalCEP(true)}
            >
              <LucidePlusCircle />
              <Typography variant="formLabel">
                Adicionar novo endereço
              </Typography>
            </div>
            <Button form="company-form" type="submit">
              Salvar
            </Button>
          </div>
        </div>
      </form>

      <Modal.Root open={isOpenModalCEP}>
        <ModalAddress
          onClose={() => setIsOpenModalCEP(false)}
          setAddress={updateAddres}
        />
      </Modal.Root>
    </>
  );
};

export default NewCompany;
