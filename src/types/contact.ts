import { z } from "zod";

const contactTypesSchema = z.enum([
  "email",
  "phone",
  "emailXML",
  "website",
  "whatsapp",
]);

export const contactSchema = z.object({
  type: contactTypesSchema,
  value: z.string({ required_error: "Campo obrigatório" }),
});

export type Contact = z.infer<typeof contactSchema>;
export type ContactType = z.infer<typeof contactTypesSchema>;

export const CONTACT_TYPES = [
  "email",
  "phone",
  "emailXML",
  "website",
  "whatsapp",
];

export const CONTACT = [
  {
    label: "Email",
    value: "email",
  },
  {
    label: "Telefone",
    value: "phone",
  },
  {
    label: "Email XML",
    value: "emailXML",
  },
  {
    label: "Website",
    value: "website",
  },
  {
    label: "Whatsapp",
    value: "whatsapp",
  },
];
