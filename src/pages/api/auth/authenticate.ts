import { prisma } from "@/pkg/services/prisma";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export default async function authenticate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const authenticateRequest = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    try {
      const { email, password } = authenticateRequest.parse(req.body);

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      const passwordValidate = await bcryptjs.compare(password, user.password);

      if (!passwordValidate) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      const generateRefreshToken = jwt.sign(
        { userId: user.id, email: user.email, rules: user.rules },
        process.env.JWT_SECRET_KEY || "",
        {
          expiresIn: "1h",
        }
      );

      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: generateRefreshToken, lastAccess: new Date() },
      });

      const generateAccessToken = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET_KEY || "",
        {
          expiresIn: "15m",
        }
      );

      res.setHeader("Set-Cookie", [
        `refreshToken=${generateRefreshToken}; HttpOnly; Path=/; Max-Age=3600; SameSite=Lax;`,
        `accessToken=${generateAccessToken}; HttpOnly; Path=/; Max-Age=3600; SameSite=Lax;`,
      ]);

      res.status(200).json({
        message: "Autorizado",
        to: user.rules.includes("ADMIN") ? "/admin" : "/app",
      });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Método ${req.method} Não Permitido`);
  }
}
