import { Request, Response } from "express";
import ItemModel from "../models/ItemModel";
import { createItemSchema, updateItemSchema } from "../schemas/itemValidationSchemas";
import { z } from "zod";
import AuthorModel from "../models/AuthorModel";
import CategoryModel from "../models/CategoryModel";
import FavoritesModel from "../models/FavoritesModel";
import UserModel from "../models/UserModel";



export const getItemById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const item = await ItemModel.findByPk(req.params.id, {
      include: [
        {
          model: CategoryModel,
          as: "category",
          attributes: ["id", "name"], // Campos que deseja retornar
        },
        {
          model: AuthorModel,
          as: "author",
          attributes: ["id", "name"], // Campos que deseja retornar
        },
      ],
    });

    if (!item) {
      return res.status(404).json({ message: "Item não encontrado" });
    }



    return res.status(200).json(item);
  } catch (error) {
    res.status(500).json("Erro do Servidor Interno" + error);
  }
};

export const createItem = async (req: Request, res: Response) => {
  try {
    const parsedData = await createItemSchema.parseAsync(req.body);

    const item = await ItemModel.create(parsedData);
    res.status(201).json(item);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json("Internal server error" + error);
  }
};

export const updateItem = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const parsedData = await updateItemSchema.parseAsync(req.body);

    const item = await ItemModel.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not Found" });
    }

    item.name = parsedData.name;
    item.time = parsedData.time;
    item.directory = parsedData.directory;
    item.image = parsedData.image;
    item.category_id = parsedData.category_id;
    item.author_id = parsedData.author_id;

    await item.save();
    res.status(201).json(item);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json("Internal server error" + error);
  }
};

export const deleteItemById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const item = await ItemModel.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    await item.destroy();
    res.status(200).json({ message: "Item deletado com sucesso" });
  } catch (error) {
    res.status(500).json("Internal server error" + error);
  }
};

export const getPaginatedItems = async (req: Request<{ page: string }>, res: Response) => {
  try {
    const { page } = req.params;
    const { limit = 10 } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit as string, 10);

    if (isNaN(pageNumber) || pageNumber <= 0 || isNaN(limitNumber) || limitNumber <= 0) {
      return res.status(400).json({ message: "Parâmetros de paginação inválidos." });
    }

    const offset = (pageNumber - 1) * limitNumber;

    const { rows: items, count: totalItems } = await ItemModel.findAndCountAll({
      limit: limitNumber,
      offset,
      include: [
        {
          model: CategoryModel,
          as: "category",
          attributes: ["id", "name"], // Campos que deseja retornar
        },
        {
          model: AuthorModel,
          as: "author",
          attributes: ["id", "name"], // Campos que deseja retornar
        },
      ],
    });


    const totalPages = Math.ceil(totalItems / limitNumber);

    if (pageNumber > totalPages) {
      return res.status(404).json({ message: `Página ${pageNumber} não existe. Total de páginas: ${totalPages}.` });
    }

    res.status(200).json({
      currentPage: pageNumber,
      totalPages,
      totalItems,
      items,
    });
  } catch (error) {
    console.error("Erro ao buscar itens paginados:", error);
    res.status(500).json({ message: "Erro ao buscar itens paginados.", details: error });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const items = await ItemModel.findAll({
      include: [
        {
          model: CategoryModel,
          as: "category",
          attributes: ["id", "name"], // Campos que deseja retornar
        },
        {
          model: AuthorModel,
          as: "author",
          attributes: ["id", "name"], // Campos que deseja retornar
        },
      ],
    });

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar itens.", details: error });
  }
};
