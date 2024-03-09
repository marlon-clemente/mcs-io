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
  value: z.string(),
});

export type Contact = z.infer<typeof contactSchema>;
type ContactType = z.infer<typeof contactTypesSchema>;

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
