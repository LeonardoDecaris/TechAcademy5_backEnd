import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import {
  createUserSchema,
  updateUserSchema,
} from "../schemas/userValidationSchemas";
import { z } from "zod";

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await UserModel.findAll();
  res.send(users);
};

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json("Internal server error: " + error);
  }
};

export const getPaginatedUsers = async (req: Request, res: Response) => {
  try {
    const { page } = req.params;
    const { limit = 10 } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit as string, 10);

    if (
      isNaN(pageNumber) ||
      pageNumber <= 0 ||
      isNaN(limitNumber) ||
      limitNumber <= 0
    ) {
      return res.status(400).json({ message: "Invalid pagination parameters" });
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
    console.error("Error fetching paginated users: ", error);
    res.status(500).json({ message: "Error fetching paginated users" });
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

    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    // Get the user ID from the request parameters
    const { id } = req.params;
    const { name, password } = req.body;

    if (!req.body.user || !req.body.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    // Verify if the authenticated user ID matches the ID in the request parameters
    if (req.body.user.id !== id) {
      return res
        .status(403)
        .json({ message: "You can only update your own user" });
    }

    const user = await UserModel.findByPk(id);
    if (!user) {
      console.log("User not found:", id);
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user with the provided data
    user.name = name || user.name;
    user.password = password || user.password;

    await user.save();

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error updating user: ", error);
    res.status(500).json({ message: "Error updating user" });
  }
};

export const deleteUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json("Internal server error " + error);
  }
};
