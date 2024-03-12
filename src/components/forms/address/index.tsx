import Button from "@/components/ui/button";
import { InputText } from "@/components/ui/fields";
import { searchByCEP } from "@/services/searchByCEP";
import { Address } from "@/types/Address";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

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
  const { control, handleSubmit, setValue, watch } = useForm<Address>({
    defaultValues: address || {},
  });

  const cep = watch("cep");

  const { mutate } = useMutation({
    mutationFn: async (cep: string) => {
      const response = await searchByCEP(cep);
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
    if (cep && cep.length === 8) {
      mutate(cep);
    }
  }, [cep]);

  return (
    <>
      <form
        id="address-form"
        className="w-full flex-col grid grid-cols-4 gap-1"
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <div className="col-span-4">
          <Controller
            control={control}
            name="cep"
            render={({ field }) => (
              <InputText
                mask="99999-999"
                {...field}
                label="CEP"
                fullWidth
                placeholder="Digite o CEP"
                // mask="99999-999"
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
              <InputText
                {...field}
                label="UF"
                placeholder="UF"
                // mask="99999-999"
              />
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
