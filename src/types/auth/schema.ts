import { z } from "zod";

export const authenticateUserSchema = z.object({
  email: z
    .string({ required_error: "Informe um e-mail" })
    .email({ message: "Informe um e-mail inválido" }),
  password: z.string({ required_error: "Informe uma senha" }),
});
