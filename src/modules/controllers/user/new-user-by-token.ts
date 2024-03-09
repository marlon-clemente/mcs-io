import { prisma } from "@/pkg/services/prisma";
import { openSessionToken } from "@/services/jwt";
import bcryptjs from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";

export const newUserByToken = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const {
    query: { hash },
    body: { name, password },
  } = req;

  try {
    const solicitation = await prisma.createPassword.findUnique({
      where: {
        hash: hash as string,
      },
    });

    // valida token
    await openSessionToken(solicitation?.expireToken as string);

    const newPassword = bcryptjs.hashSync(password, 10);

    await prisma.user.create({
      data: {
        name: name.split(" ")[0],
        password: newPassword,
        email: solicitation?.email as string,
        nameComplete: name,
        rules: [],
      },
    });

    await prisma.createPassword.delete({
      where: {
        hash: hash as string,
      },
    });

    return res.status(201);
  } catch (error) {
    return res.status(400).json({ error });
  }
};
