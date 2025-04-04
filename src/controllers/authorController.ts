import { Request, Response } from "express";
import AuthorModel from "../models/AuthorModel";
import { createAuthorSchema, updateAuthorSchema } from "../schemas/authorValidationSchemas";
import { z } from "zod";

export const getAll = async (req: Request, res: Response) => {
  const authors = await AuthorModel.findAll();
  res.send(authors);
};

export const getAuthorById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const author = await AuthorModel.findByPk(req.params.id);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    return res.status(200).json(author);
  } catch (error) {
    res.status(500).json("Internal server error" + error);
  }
};

export const createAuthor = async (req: Request, res: Response) => {
  try {
    const parsedData = await createAuthorSchema.parseAsync(req.body);

    const author = await AuthorModel.create(parsedData);
    res.status(201).json(author);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json("Internal server error" + error);
  }
};

export const updateAuthor = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const parsedData = await updateAuthorSchema.parseAsync(req.body);

    const author = await AuthorModel.findByPk(req.params.id);
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    author.name = parsedData.name;

    await author.save();
    res.status(201).json(author);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json("Internal server error" + error);
  }
};

export const deleteAuthorById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const author = await AuthorModel.findByPk(req.params.id);
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }
    await author.destroy();
    res.status(200).json({ message: "Author deleted successfully" });
  } catch (error) {
    res.status(500).json("Internal server error" + error);
  }
};