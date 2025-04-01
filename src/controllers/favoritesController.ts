import { Request, Response } from "express";
import FavoritesModel from "../models/FavoritesModel";
import ItemModel from "../models/ItemModel";
import { createFavoriteSchema, updateFavoriteSchema } from "../schemas/favoritesValidationSchemas";
import { z } from "zod";

const collections: { id: number; name: string }[] = [];

export const createFavorite = async (req: Request, res: Response): Promise<void> => {
    const { name, items } = req.body;

    if (!name) {
        res.status(400).json({ message: 'O campo "name" é obrigatório.' });
        return;
    }

    try {

        const newFavorite = await FavoritesModel.create({ name });

        if (items && Array.isArray(items)) {
            const foundItems = await ItemModel.findAll({
                where: {
                    id: items,
                },
            });

            if (foundItems.length === 0) {
                res.status(404).json({ message: 'Nenhum item encontrado com os IDs fornecidos.' });
                return;
            }

            await newFavorite.addItems(foundItems);
        }

        const favoriteWithItems = await FavoritesModel.findByPk(newFavorite.id, {
            include: [{ model: ItemModel, as: 'item' }],
        });

        res.status(201).json({
            message: 'Favorito criado com sucesso.',
            favorite: favoriteWithItems,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar o favorito.' });
    }
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const favorites = await FavoritesModel.findAll({
      include: [{ model: ItemModel, as: "item" }],
    });

    res.status(200).json(favorites);
  } catch (error) {
    console.error("Erro ao buscar favoritos:", error);
    res.status(500).json({ error: "Erro ao buscar favoritos", details: error });
  }
};

export const getFavoriteById = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const favorite = await FavoritesModel.findByPk(id, {
            include: [{ model: ItemModel, as: "item" }],
        });

        if (!favorite) {
            res.status(404).json({ message: "Favorito não encontrado." });
            return;
        }

        res.status(200).json(favorite);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar o favorito." });
    }
};

export const updateFavorite = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const { name, items } = req.body;
    const { id } = req.params;

    try {
        const favorite = await FavoritesModel.findByPk(id, {
            include: [{ model: ItemModel, as: "items" }],
        });

        if (!favorite) {
            res.status(404).json({ message: "Favorito não encontrado." });
            return;
        }

        const currentItems = ((favorite as any).items || []).map((item: ItemModel) => item.id);
        const itemsToAdd = items.filter((itemId: number) => !currentItems.includes(itemId));
        const itemsToRemove = currentItems.filter((itemId: number) => !items.includes(itemId));

        if (itemsToAdd.length > 0) {
            const foundItemsToAdd = await ItemModel.findAll({
                where: {
                    id: itemsToAdd,
                },
            });

            if (foundItemsToAdd.length > 0) {
                await favorite.addItems(foundItemsToAdd);
            }
        }

        if (itemsToRemove.length > 0) {
            const foundItemsToRemove = await ItemModel.findAll({
                where: {
                    id: itemsToRemove,
                },
            });

            if (foundItemsToRemove.length > 0) {
                await favorite.removeItems(foundItemsToRemove);
            }
        }

        const updatedFavorite = await FavoritesModel.findByPk(id, {
            include: [{ model: ItemModel, as: "items" }],
        });

        res.status(200).json({
            message: "Favorito atualizado com sucesso.",
            favorite: updatedFavorite,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao atualizar o favorito." });
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