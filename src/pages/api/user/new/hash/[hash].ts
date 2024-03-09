import { newUserByToken } from "@/modules/controllers/user/new-user-by-token";
import { NextApiRequest, NextApiResponse } from "next";

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    newUserByToken(req, res);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Método ${req.method} Não Permitido`);
  }
}
