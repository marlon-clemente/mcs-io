import { z } from "zod";

export const bussinessSectorSchema = z.object({
  id: z.string().optional(),
  name: z.string({ required_error: "Nome é obrigatório" }),
  color: z.string().nonempty("Cor é obrigatório"),
});

export type BussinessSector = z.infer<typeof bussinessSectorSchema>;
