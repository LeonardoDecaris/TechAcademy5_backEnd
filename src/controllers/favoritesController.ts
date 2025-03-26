import { Request, Response } from "express";
import FavoritesModel from "../models/FavoritesModel";
import { createFavoriteSchema, updateFavoriteSchema } from "../schemas/favoritesValidationSchemas";
import { z } from "zod";

export const getAll = async (req: Request, res: Response) => {
  const favorites = await FavoritesModel.findAll();
  res.send(favorites);
};

export const getFavoriteById = async (req: Request<{ id: string }>, res: Response) => {
  const favorite = await FavoritesModel.findByPk(req.params.id);
  return res.json(favorite);
};

export const createFavorite = async (req: Request, res: Response) => {
  try {
    const parsedData = await createFavoriteSchema.parseAsync(req.body);

    const favorite = await FavoritesModel.create(parsedData);
    res.status(201).json(favorite);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json("Internal server error" + error);
  }
};

export const updateFavorite = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const parsedData = await updateFavoriteSchema.parseAsync(req.body);

    const favorite = await FavoritesModel.findByPk(req.params.id);
    if (!favorite) {
      return res.status(404).json({ error: "Favorito não encontrado" });
    }

    favorite.name = parsedData.name;
    favorite.user_id = parsedData.user_id;

    await favorite.save();
    res.status(201).json(favorite);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json("Internal server error" + error);
  }
};

export const deleteFavoriteById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const favorite = await FavoritesModel.findByPk(req.params.id);
    if (!favorite) {
      return res.status(404).json({ error: "Favorito não encontrado" });
    }
    await favorite.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json("Internal server error" + error);
  }
};
