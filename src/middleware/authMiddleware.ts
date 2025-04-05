import { NextFunction, Request, Response } from "express";
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authMiddleware = (
  req: Request, res: Response, next: NextFunction
) => {
  req.body.user = {
    id: "1",
    name: "João",
    cpf: "847.671.250-22",
    email: "email@exemplo.com",
    password: "senha123",
  };

  next();
};