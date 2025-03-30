import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: any; // Add the `user` property to the Request interface
    }
  }
}
import { verifyToken } from "../utils/jtw";

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
    const decoded: any = verifyToken(token); // Decodifica o token
    req.user = decoded; // Adiciona o usuário decodificado ao objeto `req`
    next();
  } catch (error) {
    return res.status(401).json({ message: "Acesso negado. Token inválido" });
  }
};