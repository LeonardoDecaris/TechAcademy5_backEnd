import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { createUserSchema, updateUserSchema } from "../schemas/userValidationSchemas";
import { z } from "zod";

export const getAllUsers = async (req: Request, res: Response) => {
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
    res.status(500).json("Erro do Servidor Interno: " + error);
  }
};

export const getPaginatedUsers = async (req: Request, res: Response) => {
  try {
    const { page } = req.params;
    const { limit = 10 } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit as string, 10);

    if (isNaN(pageNumber) || pageNumber <= 0 || isNaN(limitNumber) || limitNumber <= 0) {
      return res.status(400).json({ message: 'Parâmetros de paginação inválidos.' });
    }

    const offset = (pageNumber - 1) * limitNumber;

    const { rows: users, count: totalUsers } = await UserModel.findAndCountAll({
      limit: limitNumber,
      offset,
    });

    res.status(200).json({
      currentPage: pageNumber,
      totalPages: Math.ceil(totalUsers / limitNumber),
      totalUsers,
      users,
    });
  } catch (error) {
    console.error('Erro ao buscar usuários paginados:', error);
    res.status(500).json({ message: 'Erro ao buscar usuários paginados.' });
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

    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Obtém o ID do usuário da URL
    const { name, password } = req.body;

    // Verifica se o usuário existe
    const user = await UserModel.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Atualiza os dados do usuário
    user.name = name || user.name;
    user.password = password || user.password;

    await user.save();

    res.status(200).json({ user });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ message: 'Erro ao atualizar usuário.' });
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
    res.status(500).json("Erro do Servidor Interno: " + error);
  }
};