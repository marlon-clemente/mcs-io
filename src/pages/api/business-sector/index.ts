import { listBusinessSector } from "@/modules/controllers/business-sector/business-sector-list";
import { newBusinessSector } from "@/modules/controllers/business-sector/business-sector-new";
import { NextApiRequest, NextApiResponse } from "next";

export default async function businessSector(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    newBusinessSector(req, res);
  } else if (req.method === "GET") {
    listBusinessSector(req, res);
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Método ${req.method} Não Permitido`);
  }
}
