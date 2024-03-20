import axios from "axios";

interface AddressAPI {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: number;
  gia: number;
  ddd: string;
  siafi: number;
}

export const searchByCEP = async (cep: string) => {
  const response = await axios.get<AddressAPI>(
    `https://viacep.com.br/ws/${cep}/json/`
  );
  return response.data;
};
