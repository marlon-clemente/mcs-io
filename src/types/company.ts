import { isValidCNPJ } from "@/utils/validateCNPJ";
import z from "zod";
import { addressSchema } from "./address";
import { bussinessSectorSchema } from "./bussinesSector";
import { contactSchema } from "./contact";

export const CompanySchema = z.object({
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
  businessSector: z.array(bussinessSectorSchema),
});

export type Company = z.infer<typeof CompanySchema>;
