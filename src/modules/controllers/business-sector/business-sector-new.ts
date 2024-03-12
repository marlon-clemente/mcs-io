import { prisma } from "@/pkg/services/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export const newBusinessSector = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const {
    body: { name, color },
  } = req;

  await prisma.businessSector.create({
    data: {
      name,
      color,
    },
  });

  try {
    return res.status(200).end();
  } catch (error) {
    return res.status(400).json({ error });
  }
};
