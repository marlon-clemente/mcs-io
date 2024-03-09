import { newUserVerifyToken } from "@/modules/controllers/user/new-user-verify-token";
import { NextApiRequest, NextApiResponse } from "next";

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    newUserVerifyToken(req, res);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Método ${req.method} Não Permitido`);
  }
}
