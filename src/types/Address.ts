import { z } from "zod";

export const addressSchema = z.object({
  cep: z.string(),
  logradouro: z.string(),
  complemento: z.string(),
  bairro: z.string(),
  cidade: z.string(),
  uf: z.string(),
  ddd: z.number(),
  numero: z.string().optional(),
});

export type Address = z.infer<typeof addressSchema>;
