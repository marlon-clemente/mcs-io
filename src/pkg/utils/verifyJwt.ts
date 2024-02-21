import jwt from "jsonwebtoken";

export const veryfyJwt = (token: string) => {
  jwt.verify(token, process.env.JWT_SECRET_KEY || "", (err, _) => {
    if (err) {
      return false;
    }
    return true;
  });
  return false;
};
