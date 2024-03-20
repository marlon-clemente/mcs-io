"use client";

import BusinessSector from "@/app/business-sector/page";
import ModalAddress from "@/components/Modal/modal-address";
import { Badge } from "@/components/ui/badge";
import Button from "@/components/ui/button";
import CardFormEmptyData from "@/components/ui/cards/form-empty-data";
import Divider from "@/components/ui/divider";
import { InputContact, InputText } from "@/components/ui/fields";
import InputPhoto from "@/components/ui/fields/input-photo";
import * as Modal from "@/components/ui/modal";
import Typography from "@/components/ui/typography";
import { bussinessSectorSchema } from "@/types/bussinesSector";
import { Company, CompanySchema } from "@/types/company";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  LucideContact,
  LucideInfo,
  LucideMapPin,
  LucidePlusCircle,
  LucideTrash2,
  LucideUser,
} from "lucide-react";
import React, { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

const schemaBusinessSector = z.array(
  bussinessSectorSchema.extend({
    selected: z.boolean().default(false),
  })
);

const NewCompany: React.FC = () => {
  const [isOpenModalCEP, setIsOpenModalCEP] = React.useState(false);
  const [image, setImage] = useState<File | null>(null);
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Company>({
    resolver: zodResolver(CompanySchema),
  });

  const businessSector = watch("businessSector");

  const { insert, remove } = useFieldArray({
    control,
    name: "address",
  });

  const { append: addContact, remove: removeContact } = useFieldArray({
    control,
    name: "contact",
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

  const { isLoading } = useQuery({
    queryKey: ["bussines-sector"],
    queryFn: async () => {
      const response = await axios.get<{ bussinesSectores: BusinessSector[] }>(
        "/api/business-sector"
      );
      console.log(response.data);

      const parse = schemaBusinessSector.safeParse(
        response.data.bussinesSectores
      );

      if (!parse.success) {
        return [];
      }

      setValue("businessSector", parse.data);

      return response.data.bussinesSectores;
    },
    refetchOnWindowFocus: false,
  });

  const handleSelectBusinessSector = (id: string) => {
    const index = businessSector.findIndex((sector) => sector.id === id);
    const newBusinessSector = [...businessSector];
    newBusinessSector[index].selected = !newBusinessSector[index].selected;
    setValue("businessSector", newBusinessSector);
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
          <div>
            <InputPhoto file={image} setFile={setImage} />
          </div>
          {/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
          {/* <div className="col-span-1">
            <div className="bg-gray-300 rounded h-64 w-64 flex justify-center items-center">
              <div className="flex flex-col items-center">
                <LucideImagePlus />
                <span>Adicionar logo da empresa</span>
              </div>
            </div>
          </div> */}

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
            <CardFormEmptyData
              description="Adicionar novo representante"
              icon={<LucidePlusCircle />}
            />

            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <LucideContact />
                <Typography variant="title">Contatos</Typography>
              </div>
              <Divider />
              {/* <InputContact value={} /> */}
            </div>

            {watch("contact")?.map((contact, index) => (
              <div
                key={index}
                className="flex gap-1 justify-between items-center"
              >
                <Controller
                  control={control}
                  name={`contact.${index}`}
                  render={({ field: { value, onChange } }) => (
                    <InputContact value={value} onChange={onChange} />
                  )}
                />
                <button
                  type="button"
                  onClick={() => removeContact(index)}
                  className="hover:text-red-500"
                >
                  <LucideTrash2 size={16} />
                </button>
              </div>
            ))}

            <CardFormEmptyData
              description="Adicionar novo contato"
              icon={<LucidePlusCircle />}
              onClick={() => addContact({ type: "email", value: "" })}
            />

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

            <CardFormEmptyData
              description="Adicionar novo endereço"
              onClick={() => setIsOpenModalCEP(true)}
              icon={<LucidePlusCircle />}
            />

            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <LucideUser />
                  <Typography variant="title">Ramos de atividade</Typography>
                </div>
                {businessSector && businessSector.length > 0 && (
                  <Badge variant="primary">
                    {businessSector?.filter((sector) => sector.selected).length}{" "}
                    selecionados
                  </Badge>
                )}
              </div>
              <Divider />
            </div>

            {businessSector && businessSector.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mb-6 select-none">
                {businessSector.map((sector) => (
                  <div
                    key={sector.id}
                    onClick={() => handleSelectBusinessSector(sector.id!)}
                    className={twMerge(
                      "flex py-2 px-3 items-center gap-2 border border-gray-300 rounded hover:cursor-pointer hover:bg-gray-200",
                      sector.selected ? "bg-blue-50 border-blue-500" : ""
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={sector.selected}
                      className="rounded bg-transparent"
                    />
                    {sector.name}
                  </div>
                ))}
              </div>
            )}

            {businessSector && businessSector.length === 0 && (
              <CardFormEmptyData
                className="select-none"
                description="Não há ramos de atividade cadastrados"
                variant="onlyInfo"
              />
            )}

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
