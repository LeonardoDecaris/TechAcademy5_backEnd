import { Request, Response } from "express";
import FavoritesModel from "../models/FavoritesModel";
import ItemModel from "../models/ItemModel";
import { createFavoriteSchema, updateFavoriteSchema } from "../schemas/favoritesValidationSchemas";
import { z } from "zod";

const collections: { id: number; name: string }[] = [];

// Método para criar uma nova coleção
export const createFavorite = async (req: Request, res: Response): Promise<void> => {
    const { name, items } = req.body; // `items` é um array de IDs de itens

    if (!name) {
        res.status(400).json({ message: 'O campo "name" é obrigatório.' });
        return;
    }

    try {
        // Cria o favorito
        const newFavorite = await FavoritesModel.create({ name });

        // Verifica se há itens para associar
        if (items && Array.isArray(items)) {
            // Busca os itens pelo array de IDs
            const foundItems = await ItemModel.findAll({
                where: {
                    id: items,
                },
            });

            if (foundItems.length === 0) {
                res.status(404).json({ message: 'Nenhum item encontrado com os IDs fornecidos.' });
                return;
            }

            // Associa os itens ao favorito
            await newFavorite.addItems(foundItems);
        }

        // Retorna o favorito criado com os itens associados
        const favoriteWithItems = await FavoritesModel.findByPk(newFavorite.id, {
            include: [{ model: ItemModel, as: 'items' }],
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
    // Busca todos os favoritos no banco de dados, incluindo os itens associados
    const favorites = await FavoritesModel.findAll({
      include: [{ model: ItemModel, as: "items" }],
    });

    res.status(200).json(favorites);
  } catch (error) {
    console.error("Erro ao buscar favoritos:", error);
    res.status(500).json({ error: "Erro ao buscar favoritos", details: error });
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