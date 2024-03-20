import Button from "@/components/ui/button";
import {
  InputText,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/fields";
import Typography from "@/components/ui/typography";

import { searchByCEP } from "@/services/searchByCEP";
import { Address, addressSchema, STATES_BRAZIL } from "@/types/address";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

interface AddressFormProps {
  onClose: () => void;
  setAddress: (address: Address) => void;
  address?: Address;
}

const AddressForm: React.FC<AddressFormProps> = ({
  setAddress,
  onClose,
  address,
}) => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Address>({
    defaultValues: address || {},
    resolver: zodResolver(addressSchema),
  });

  const cep = watch("cep");

  const { mutate } = useMutation({
    mutationFn: async (cep: string) => {
      const response = await searchByCEP(cep);
      setValue("id", uuidv4());
      setValue("bairro", response.bairro);
      setValue("logradouro", response.logradouro);
      setValue("complemento", response.complemento);
      setValue("cidade", response.localidade);
      setValue("uf", response.uf);
      setValue("ddd", response.ddd);
    },
  });

  const handleSubmitForm = (data: Address) => {
    setAddress(data);
    onClose();
  };

  useEffect(() => {
    if (cep && cep.length === 9) {
      mutate(cep);
    }
  }, [cep]);

  return (
    <>
      <form
        id="address-form"
        className="w-full flex-col grid grid-cols-4 gap-2 pt-4"
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <pre>{JSON.stringify(errors, null, 2)}</pre>

        <div className="col-span-4">
          <Controller
            control={control}
            name="cep"
            render={({ field }) => (
              <InputText
                {...field}
                label="CEP"
                fullWidth
                isRequired
                mask="00000-000"
                isError={errors.cep !== undefined}
                messageError={errors.cep?.message}
                placeholder="Digite o CEP"
              />
            )}
          />
        </div>

        <div className="col-span-3 gap-1">
          <Controller
            control={control}
            name="cidade"
            render={({ field }) => (
              <InputText
                {...field}
                label="Cidade"
                placeholder="Digite a cidade"
                // mask="99999-999"
              />
            )}
          />
        </div>
        <div className="col-span-1">
          <Controller
            control={control}
            name="uf"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <Typography variant="formLabel">UF</Typography>
                <SelectTrigger className="my-1" placeholder="UF" />
                <SelectContent className="w-auto overflow-auto">
                  {STATES_BRAZIL.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="col-span-4">
          <Controller
            control={control}
            name="bairro"
            render={({ field }) => (
              <InputText
                {...field}
                id="bairro"
                label="Bairro"
                placeholder="Digite o Bairro"
                // mask="99999-999"
              />
            )}
          />
        </div>

        <div className="col-span-3">
          <Controller
            control={control}
            name="logradouro"
            render={({ field }) => (
              <InputText
                {...field}
                id="logradouro"
                label="Logradouro"
                placeholder="Digite o Logradouro"
                // mask="99999-999"
              />
            )}
          />
        </div>
        <div className="col-span-1">
          <Controller
            control={control}
            name="numero"
            render={({ field }) => (
              <InputText {...field} label="Nº" placeholder="Nº" />
            )}
          />
        </div>

        <div className="col-span-4 flex justify-end gap-2 mt-4">
          <Button type="button" variant="primary" onClick={() => onClose()}>
            Cancelar
          </Button>
          <Button>Adicionar</Button>
        </div>
      </form>
    </>
  );
};

export default AddressForm;
