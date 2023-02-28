require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string;
  email: string;
  role: string;
}
interface AuthRequest extends Request {
  user?: TokenPayload;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  let authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  if (authHeader.startsWith("Bearer ")) {
    authHeader = authHeader.split(" ")[1];
  }

  try {
    const decodedToken = jwt.verify(
      authHeader,
      process.env.JWT_SECRET as string
    ) as TokenPayload;
    req.user = decodedToken;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
