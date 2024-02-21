import { z } from "zod";
import { authenticateUserSchema } from "./schema";

export type AuthenticateUser = z.infer<typeof authenticateUserSchema>;

export type AuthenticateUserResponse = {
  message: string;
  email: string;
  rules: string[];
  name: string;
  nameComplete: string;
  to: string;
};
