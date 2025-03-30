import { Request, Response } from "express";
import FavoritesModel from "../models/FavoritesModel";
import ItemModel from "../models/ItemModel";
import { createFavoriteSchema, updateFavoriteSchema } from "../schemas/favoritesValidationSchemas";
import { z } from "zod";

export const getAll = async (req: Request, res: Response) => {
  try {
    const favorites = await FavoritesModel.findAll({
      include: [
        {
          model: ItemModel,
          as: "items",
          through: { attributes: [] }, // Exclui os dados da tabela intermediária
        },
      ],
    });
    res.status(200).json(favorites);
  } catch (error) {
    console.error("Erro ao buscar favoritos:", error); // Adicione este log
    res.status(500).json({ error: "Erro ao buscar favoritos", details: error });
  }
};

export const createFavorite = async (req: Request, res: Response) => {
  try {
    const parsedData = await createFavoriteSchema.parseAsync(req.body);

    // Certifique-se de que o user_id está vindo do token decodificado
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    console.log("Dados recebidos:", parsedData);
    console.log("Usuário autenticado:", userId);

    if (!Array.isArray(parsedData.items) || !parsedData.items.every(id => typeof id === "number")) {
      return res.status(400).json({ error: "O campo 'items' deve ser um array de IDs numéricos" });
    }

    // Cria o favorito
    const favorite = await FavoritesModel.create({
      name: parsedData.name,
      user_id: userId,
    });

    // Associa os itens, se fornecidos
    if (parsedData.items && parsedData.items.length > 0) {
      const items = await ItemModel.findAll({
        where: {
          id: parsedData.items, // Busca todos os itens com IDs correspondentes
        },
      });

      if (items.length !== parsedData.items.length) {
        return res.status(400).json({ error: "Um ou mais itens não foram encontrados" });
      }

      console.log("IDs dos itens recebidos:", parsedData.items);
      console.log("Itens encontrados no banco de dados:", items);
      console.log("Itens encontrados:", items);

      // Cria a ligação na tabela associativa
      await favorite.addItems(items);
    }

    const favoriteWithItems = await FavoritesModel.findByPk(favorite.id, {
      include: [{ model: ItemModel, as: "items" }],
    });

    res.status(201).json(favoriteWithItems);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Erro ao criar favorito:", error);
    res.status(500).json({ error: "Erro ao criar favorito", details: error });
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