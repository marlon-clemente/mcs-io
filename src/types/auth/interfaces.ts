import { z } from "zod";
import { authenticateUserSchema } from "./schema";

export type AuthenticateUser = z.infer<typeof authenticateUserSchema>;
