import { prisma } from "@/pkg/services/prisma";
import { openSessionToken } from "@/services/jwt";
import { NextApiRequest, NextApiResponse } from "next";

export const newUserVerifyToken = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const {
    query: { id },
  } = req;

  try {
    const solicitation = await prisma.createPassword.findUnique({
      where: {
        hash: id as string,
      },
    });

    // valida token

    const { exp } = await openSessionToken(solicitation?.expireToken as string);
    const expirationDate = new Date((exp as number) * 1000);

    return res
      .status(200)
      .json({ expirationDate, toke: solicitation?.expireToken });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
