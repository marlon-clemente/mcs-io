import Button from "@/components/ui/button";
import { InputText } from "@/components/ui/fields";
import Typography from "@/components/ui/typography";
import { BussinessSector, bussinessSectorSchema } from "@/types/bussinesSector";
import { randomColorGenerate } from "@/utils/randonColorGenerate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Controller, useForm } from "react-hook-form";

interface NewBusinessSectorProps {
  closeModal: () => void;
  businessSector?: BussinessSector;
}

const NewBusinessSector: React.FC<NewBusinessSectorProps> = ({
  closeModal,
  businessSector,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BussinessSector>({
    resolver: zodResolver(bussinessSectorSchema),
    defaultValues: businessSector || {
      name: "",
      color: randomColorGenerate(),
    },
  });

  const saveBusinessSector = useMutation({
    onMutate: async (data: BussinessSector) => {
      await axios.post("/api/business-sector", data);
      closeModal();
    },
  });

  const handleSubmitForm = (data: BussinessSector) => {
    saveBusinessSector.mutate(data);
  };

  return (
    <form
      className="flex w-full flex-col gap-4"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <InputText
            label="Nome"
            messageError={errors.name?.message}
            isError={!!errors.name}
            placeholder="Digite o nome do ramo de atividade"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="color"
        render={({ field }) => (
          <div className="flex flex-col">
            <Typography variant="formLabel">Selecione uma cor</Typography>
            <input
              type="color"
              placeholder="Digite o nome do ramo de atividade"
              {...field}
            />
          </div>
        )}
      />

      <div className="flex justify-end">
        <Button
          isLoadind={saveBusinessSector.isLoading}
          disabled={saveBusinessSector.isLoading}
        >
          {saveBusinessSector.isLoading ? "Salvando" : "Salvar"}
        </Button>
      </div>
    </form>
  );
};

export default NewBusinessSector;
