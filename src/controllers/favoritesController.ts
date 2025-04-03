import { Request, Response } from "express";
import FavoritesModel from "../models/FavoritesModel";
import ItemModel from "../models/ItemModel";
import { createFavoriteSchema, updateFavoriteSchema } from "../schemas/favoritesValidationSchemas";
import { z } from "zod";

const collections: { id: number; name: string }[] = [];

export const getAll = async (req: Request, res: Response) => {
  try {
    // Busca todos os favoritos com os itens associados
    const favorites = await FavoritesModel.findAll({
      include: [
        {
          model: ItemModel,
          as: "items", // Deve corresponder ao alias definido no relacionamento
        },
      ],
    });

    res.status(200).json(favorites);
  } catch (error) {
    console.error("Erro ao buscar favoritos:", error);
    res.status(500).json({ error: "Erro ao buscar favoritos", details: error });
  }
};

export const getFavoriteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Busca um favorito específico pelo ID com os itens associados
    const favorite = await FavoritesModel.findByPk(id, {
      include: [
        {
          model: ItemModel,
          as: "items", // Deve corresponder ao alias definido no relacionamento
        },
      ],
    });

    if (!favorite) {
      return res.status(404).json({ error: "Favorito não encontrado" });
    }

    res.status(200).json(favorite);
  } catch (error) {
    console.error("Erro ao buscar favorito:", error);
    res.status(500).json({ error: "Erro ao buscar favorito", details: error });
  }
};

export const createFavorite = async (req: Request, res: Response) => {
  try {
    const { name, items } = req.body;

    // Valida os dados de entrada usando o schema do Zod (se necessário)
    const parsedData = createFavoriteSchema.parse({ name, items });

    // Cria um novo favorito
    if (!parsedData.name) {
      return res.status(400).json({ error: "O nome do favorito é obrigatório." });
    }
    const favorite = await FavoritesModel.create({ name: parsedData.name });

    // Valida os itens fornecidos
    if (parsedData.items && parsedData.items.length > 0) {
      const validItems = await ItemModel.findAll({
        where: { id: parsedData.items },
      });

      // Verifica se todos os itens fornecidos existem
      if (validItems.length !== parsedData.items.length) {
        return res.status(400).json({
          error: "Alguns itens fornecidos não existem.",
        });
      }

      // Associa os itens ao favorito
      await favorite.addItems(validItems);
    }

    // Busca o favorito criado com os itens associados
    const favoriteWithItems = await FavoritesModel.findByPk(favorite.id, {
      include: [
        {
          model: ItemModel,
          as: "items",
        },
      ],
    });

    res.status(201).json(favoriteWithItems);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Erro de validação", details: error.errors });
    }

    console.error("Erro ao criar favorito:", error);
    res.status(500).json({ error: "Erro ao criar favorito", details: error });
  }
};

export const deleteFavoriteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Busca o favorito pelo ID
    const favorite = await FavoritesModel.findByPk(id);

    if (!favorite) {
      return res.status(404).json({ error: "Favorito não encontrado" });
    }

    // Remove o favorito
    await favorite.destroy();

    res.status(200).json({ message: "Favorito removido com sucesso" });
  } catch (error) {
    console.error("Erro ao remover favorito:", error);
    res.status(500).json({ error: "Erro ao remover favorito", details: error });
  }
};

export const updateFavorite = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Valida os dados de entrada usando o schema do Zod
    const parsedData = updateFavoriteSchema.parse(req.body);

    // Busca o favorito pelo ID
    const favorite = await FavoritesModel.findByPk(id);

    if (!favorite) {
      return res.status(404).json({ error: "Favorito não encontrado" });
    }

    // Atualiza o nome do favorito
    favorite.name = parsedData.name || favorite.name;

    // Atualiza os itens associados, se fornecidos
    if (parsedData.items && parsedData.items.length > 0) {
      const items = await ItemModel.findAll({ where: { id: parsedData.items } });
      await favorite.setItems(items);
    }

    await favorite.save();

    // Busca o favorito atualizado com os itens associados
    const updatedFavorite = await FavoritesModel.findByPk(favorite.id, {
      include: [
        {
          model: ItemModel,
          as: "items",
        },
      ],
    });

    res.status(200).json(updatedFavorite);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Erro de validação", details: error.errors });
    }

    console.error("Erro ao atualizar favorito:", error);
    res.status(500).json({ error: "Erro ao atualizar favorito", details: error });
  }
};