import { prisma } from "@/pkg/services/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export const listBusinessSector = async (
  _req: NextApiRequest,
  res: NextApiResponse
) => {
  const bussinesSectores = await prisma.businessSector.findMany({
    select: {
      id: true,
      name: true,
      color: true,
    },
  });

  try {
    return res.status(200).json({ bussinesSectores });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
