import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jtw";
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}


export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Acesso negado. Sem Token" });
  }

  try {
    const decoded: any = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Acesso negado. Token inválido" });
  }
};