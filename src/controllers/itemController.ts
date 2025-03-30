import { Request, Response } from "express";
import ItemModel from "../models/ItemModel";
import { createItemSchema, updateItemSchema } from "../schemas/itemValidationSchemas";
import { z } from "zod";

export const getAll = async (req: Request, res: Response) => {
  const items = await ItemModel.findAll();
  res.send(items);
};

export const getItemById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const item = await ItemModel.findByPk(req.params.id);
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
