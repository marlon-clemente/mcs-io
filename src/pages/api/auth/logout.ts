import { NextApiRequest, NextApiResponse } from "next";

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    res.setHeader("Set-Cookie", [
      `refreshToken=""; HttpOnly; Path=/; Max-Age=3600; SameSite=Lax;`,
      `accessToken=""; HttpOnly; Path=/; Max-Age=3600; SameSite=Lax;`,
    ]);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Método ${req.method} Não Permitido`);
  }
}
