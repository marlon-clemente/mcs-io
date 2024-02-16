import { authenticateToken } from "@/pkg/middlewares/authenticate";
import { prisma } from "@/pkg/services/prisma";
import { sendEmail } from "@/pkg/services/sendgrid";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidV4 } from "uuid";
import { z } from "zod";

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  authenticateToken(req, res, async () => {
    if (req.method === "POST") {
      const bodyRequest = z.object({
        email: z.string().email(),
        validateInMinutes: z.number().int(),
      });

      const { email, validateInMinutes } = bodyRequest.parse(req.body);

      // generat uid
      const hash = uuidV4();

      const expireToken = jwt.sign({ hash }, process.env.JWT_SECRET_KEY || "", {
        expiresIn: validateInMinutes + "m",
      });

      await prisma.createPassword
        .create({
          data: {
            email,
            hash: hash,
            expireToken,
            type: 1,
          },
        })
        .catch((err) => {
          console.log("err", err);
        });

      console.log(email);

      const emailData = {
        from: "dev.clemente@gmail.com",
        to: email,
        subject: "Validação de e-mail",
        text: `http://localhost:3000/auth/new-user?hash=${hash}`,
        html: `<a href="http://localhost:3000/auth/new-user?hash=${hash}">Clique aqui para validar seu email</a>`,
      };

      sendEmail(emailData);

      res.status(200).json({
        message: "Autorizado",
      });
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Método ${req.method} Não Permitido`);
    }
  });
}
