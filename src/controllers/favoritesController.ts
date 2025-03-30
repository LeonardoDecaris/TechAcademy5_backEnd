import { Request, Response } from "express";
import FavoritesModel from "../models/FavoritesModel";
import ItemModel from "../models/ItemModel";
import { createFavoriteSchema, updateFavoriteSchema } from "../schemas/favoritesValidationSchemas";
import { z } from "zod";

export const getAll = async (req: Request, res: Response) => {
  try {
    const favorites = await FavoritesModel.findAll({
      include: [{ model: ItemModel, as: "items" }],
    });
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar favoritos", details: error });
  }
};

export const getFavoriteById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const favorite = await FavoritesModel.findByPk(req.params.id, {
      include: [{ model: ItemModel, as: "items" }],
    });
    if (!favorite) {
      return res.status(404).json({ error: "Favorito não encontrado" });
    }
    res.status(200).json(favorite);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar favorito", details: error });
  }
};

export const createFavorite = async (req: Request, res: Response) => {
  try {
    const parsedData = await createFavoriteSchema.parseAsync(req.body);

    // Use o user_id do token decodificado
    const favorite = await FavoritesModel.create({
      name: parsedData.name,
      user_id: req.body.user.id, // Certifique-se de que o user_id está vindo do token
    });

    if (parsedData.items && parsedData.items.length > 0) {
      const items = await ItemModel.findAll({ where: { id: parsedData.items } });

      if (items.length !== parsedData.items.length) {
        return res.status(400).json({ error: "Um ou mais itens não foram encontrados" });
      }

      await favorite.set("items", items);
    }

    const favoriteWithItems = await FavoritesModel.findByPk(favorite.id, {
      include: [{ model: ItemModel, as: "items" }],
    });

    res.status(201).json(favoriteWithItems);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: "Erro ao criar favorito", details: error });
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

    if (parsedData.items && parsedData.items.length > 0) {
      const items = await ItemModel.findAll({ where: { id: parsedData.items } });

      if (items.length !== parsedData.items.length) {
        return res.status(400).json({ error: "Um ou mais itens não foram encontrados" });
      }

      await favorite.set("item", items); // Corrigido para usar `set`
    }

    res.status(200).json(favorite);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: "Erro ao atualizar favorito", details: error });
  }
};

export const deleteFavoriteById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const favorite = await FavoritesModel.findByPk(req.params.id);
    if (!favorite) {
      return res.status(404).json({ error: "Favorito não encontrado" });
    }
    await favorite.destroy();
    res.status(200).json({ message: "Favorito deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar favorito", details: error });
  }
};