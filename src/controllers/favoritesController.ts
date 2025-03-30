import { Request, Response } from "express";
import FavoritesModel from "../models/FavoritesModel";
import ItemModel from "../models/ItemModel";
import { createFavoriteSchema, updateFavoriteSchema } from "../schemas/favoritesValidationSchemas";
import { z } from "zod";

const collections: { id: number; name: string }[] = [];

// Método para criar uma nova coleção
export const getPost = async (req: Request, res: Response): Promise<void> => {
    const { name, itemIds } = req.body; // `bookIds` é um array de IDs de livros

    if (!name) {
        res.status(400).json({ message: 'O campo "name" é obrigatório.' });
        return;
    }

    try {
        // Cria a coleção
        const newCollection = await FavoritesModel.create({ name });

        // Verifica se há livros para associar
        if (itemIds && Array.isArray(itemIds)) {
            // Busca os livros pelo array de IDs
            const items = await ItemModel.findAll({
                where: {
                    id: itemIds,
                },
            });

            if (items.length === 0) {
                res.status(404).json({ message: 'Nenhum livro encontrado com os IDs fornecidos.' });
                return;
            }

            // Associa os livros à coleção
            await newCollection.addItems(items);
        }

        // Retorna a coleção criada com os livros associados
        const favoriteWithItems = await FavoritesModel.findByPk(newCollection.id, {
            include: [{ model: ItemModel, as: 'items' }],
        });

        res.status(201).json({
            message: 'Coleção criada com sucesso.',
            collection: favoriteWithItems,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar a coleção.' });
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