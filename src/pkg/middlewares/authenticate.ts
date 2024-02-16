import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

interface NextApiRequestExtended extends NextApiRequest {
  user?: any;
}

export function authenticateToken(
  req: NextApiRequestExtended,
  res: NextApiResponse,
  next: () => void
) {
  const token = req.cookies.accessToken || "";

  if (token === "") {
    res.status(401).json({ message: "Token não fornecido" });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY || "", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido ou expirado" });
    }
    req.user = user;
    next();
  });
}
