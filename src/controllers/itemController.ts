import { Request, Response } from "express";
import ItemModel from "../models/ItemModel";
import { createItemSchema, updateItemSchema } from "../schemas/itemValidationSchemas";
import { z } from "zod";
import AuthorModel from "../models/AuthorModel";
import CategoryModel from "../models/CategoryModel";
import FavoritesModel from "../models/FavoritesModel";
import UserModel from "../models/UserModel";
import fs from "fs";
import path from "path";
import ffmpeg from "fluent-ffmpeg";
import { upload } from "../middlewares/uploadMiddleware";

export const getItemById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const item = await ItemModel.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item não encontrado" });
    }

    // Lê o arquivo de áudio do diretório e converte para Base64
    const audioFilePath = path.join(__dirname, "../../", item.directory);
    const audioBuffer = fs.readFileSync(audioFilePath);
    const base64Audio = audioBuffer.toString("base64");

    // Retorna o item com o áudio em Base64
    res.status(200).json({
      ...item.toJSON(),
      directory: base64Audio, // Substitui o caminho pelo áudio em Base64
    });
  } catch (error) {
    res.status(500).json("Erro do Servidor Interno: " + error);
  }
};

export const createItem = [
  upload.single("audio"), // Middleware para lidar com o upload do arquivo
  async (req: Request, res: Response) => {
    try {
      const parsedData = await createItemSchema.parseAsync(req.body);

      if (!req.file) {
        return res.status(400).json({ error: "O campo 'audio' é obrigatório." });
      }

      // Salva o caminho do arquivo no banco de dados
      parsedData.directory = `/uploads/${req.file.filename}`;

      const item = await ItemModel.create(parsedData);
      res.status(201).json(item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Erro ao criar item:", error);
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  },
];

export const updateItem = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const parsedData = await updateItemSchema.parseAsync(req.body);

    const item = await ItemModel.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not Found" });
    }

    if (parsedData.name !== undefined) item.name = parsedData.name;
    if (parsedData.time !== undefined && parsedData.time !== null) item.time = parsedData.time;
    if (parsedData.directory !== undefined && parsedData.directory !== null) item.directory = parsedData.directory;
    if (parsedData.image !== undefined) item.image = parsedData.image;
    if (parsedData.category_id !== undefined) item.category_id = parsedData.category_id;
    if (parsedData.author_id !== undefined) item.author_id = parsedData.author_id;


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
          attributes: ["id", "name"],
        },
        {
          model: AuthorModel,
          as: "author",
          attributes: ["id", "name"],
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
          attributes: ["id", "name"],
        },
        {
          model: AuthorModel,
          as: "author",
          attributes: ["id", "name"],
        },
      ],
    });

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar itens.", details: error });
  }
};
