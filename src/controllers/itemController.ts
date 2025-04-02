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

<<<<<<< Updated upstream
    // Ajusta o formato do retorno para incluir os dados de categoria e autor
    const formattedItem = {
      ...item.toJSON(),
      category_id: item.category ? [item.category] : [],
      author_id: item.author ? [item.author] : [],
    };

    return res.status(200).json(formattedItem);
=======


    return res.status(200).json(item);
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
    item.name = parsedData.name;
    item.time = parsedData.time;
    item.directory = parsedData.directory;
    item.image = parsedData.image;
    item.category_id = parsedData.category_id;
    item.author_id = parsedData.author_id;
=======
    if (parsedData.name !== undefined) item.name = parsedData.name;
    if (parsedData.time !== undefined && parsedData.time !== null) item.time = parsedData.time;
    if (parsedData.directory !== undefined && parsedData.directory !== null) item.directory = parsedData.directory;
    if (parsedData.image !== undefined) item.image = parsedData.image;
    if (parsedData.category_id !== undefined) item.category_id = parsedData.category_id;
    if (parsedData.author_id !== undefined) item.author_id = parsedData.author_id;

>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
    const formattedItems = items.map((item) => ({
      ...item.toJSON(),
      category_id: item.category ? [item.category] : [],
      author_id: item.author ? [item.author] : [],
    }));
=======
>>>>>>> Stashed changes

    const totalPages = Math.ceil(totalItems / limitNumber);

    if (pageNumber > totalPages) {
      return res.status(404).json({ message: `Página ${pageNumber} não existe. Total de páginas: ${totalPages}.` });
    }

    res.status(200).json({
      currentPage: pageNumber,
      totalPages,
      totalItems,
<<<<<<< Updated upstream
      items: formattedItems,
=======
      items,
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
    const formattedItems = items.map((item) => ({
      ...item.toJSON(),
      category_id: item.category ? [item.category] : [],
      author_id: item.author ? [item.author] : [],
    }));

    res.status(200).json(formattedItems);
=======
    res.status(200).json(items);
>>>>>>> Stashed changes
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar itens.", details: error });
  }
};
