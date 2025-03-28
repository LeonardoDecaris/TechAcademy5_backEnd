import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { createUserSchema, updateUserSchema } from "../schemas/userValidationSchemas";
import { z } from "zod";

export const getAll = async (req: Request, res: Response) => {
  const users = await UserModel.findAll();
  res.send(users);
};

export const getUserById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User não encontrado" });
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json("Erro do Servidor Interno" + error);
  }
};




export const createUser = async (req: Request, res: Response) => {
  try {
    const parsedData = await createUserSchema.parseAsync(req.body);

    const user = await UserModel.create(parsedData);
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json("Erro do Servidor Interno" + error);
  }
};

export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const parsedData = await updateUserSchema.parseAsync(req.body);

    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }

    user.name = parsedData.name;
    user.cpf = parsedData.cpf;
    user.email = parsedData.email;
    user.password = parsedData.password;

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors });
    }
    res.status(500).json("Internal server error" + error);
  }
};

export const deleteUserById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    await user.destroy();
    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    res.status(500).json("Erro do Servidor Interno" + error);
  }
};