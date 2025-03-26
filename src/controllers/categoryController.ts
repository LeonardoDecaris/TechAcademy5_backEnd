import { Request, Response } from "express";
import CategoryModel from "../models/CategoryModel";
import { createCategorySchema, updateCategorySchema } from "../schemas/categoryValidationSchemas";
import { z } from "zod";

export const getAll = async (req: Request, res: Response) => {
  const categories = await CategoryModel.findAll();
  res.send(categories);
};

export const getCategoryById = async (req: Request<{ id: string }>, res: Response) => {
  const category = await CategoryModel.findByPk(req.params.id);
  return res.json(category);
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const parsedData = await createCategorySchema.parseAsync(req.body);

    const category = await CategoryModel.create(parsedData);
    res.status(201).json(category);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json("Internal server error" + error);
  }
};

export const updateCategory = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const parsedData = await updateCategorySchema.parseAsync(req.body);

    const category = await CategoryModel.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    category.name = parsedData.name;

    await category.save();
    res.status(201).json(category);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json("Internal server error" + error);
  }
};

export const deleteCategoryById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const category = await CategoryModel.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }
    await category.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json("Internal server error" + error);
  }
};
