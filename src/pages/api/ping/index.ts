import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verifica se o método da requisição é GET
  if (req.method === "GET") {
    // Processa a solicitação GET
    res.status(200).json({ message: "Olá do Next.js 14!" });
  } else {
    // Caso não seja um método GET, retorna um erro 405 - Método não permitido
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Método ${req.method} Não Permitido`);
  }
}
