import { z } from "zod";
import CategoryModel from "../models/CategoryModel";
import AuthorModel from "../models/AuthorModel";
import FavoritesModel from "../models/FavoritesModel";

// Function to validate and format time in MM:SS format
const validateAndFormatTime = (time: string): string => {
  const cleanedTime = time.replace(/\D/g, '');

  if (cleanedTime.length !== 4) {
    throw new Error("Time argument must be in the format MM:SS");
  }

  const formattedTime = `${cleanedTime.slice(0, 2)}:${cleanedTime.slice(2, 4)}`;
  const regex = /^([0-5][0-9]):([0-5][0-9])$/;
  if (!regex.test(formattedTime)) {
    throw new Error("Time argument must be in the format MM:SS");
  }

  return formattedTime;
};

const isCategoryExists = async (categoryId: number): Promise<boolean> => {
  const category = await CategoryModel.findByPk(categoryId);
  return !!category;
};

const isAuthorExists = async (authorId: number): Promise<boolean> => {
  const author = await AuthorModel.findByPk(authorId);
  return !!author;
};

const isFavoritesExists = async (favoritesId: number): Promise<boolean> => {
  const favorites = await FavoritesModel.findByPk(favoritesId);
  return !!favorites;
};

export const createItemSchema = z.object({
  name: z.string().nonempty("Name is required"),
  time: z.string().optional().transform((time) => {
    if (!time) return null;
    return validateAndFormatTime(time);
  }),
  directory: z.string().nonempty("Directory is required"),
  image: z.string().optional(),
  category_id: z.number().int().positive("Category ID must be a positive number").refine(async (categoryId) => {
    return await isCategoryExists(categoryId);
  }, {
    message: "Category not found",
  }),
  favorites_id: z.number().int().positive("Favorites ID must be a positive number").nullable().optional().refine(async (favoritesId) => {
    if (favoritesId === null || favoritesId === undefined) return true;
    return await isFavoritesExists(favoritesId);
  }, {
    message: "Favorites not found",
  }),
  author_id: z.number().int().positive("Author ID must be a positive number").refine(async (authorId) => {
    return await isAuthorExists(authorId);
  }, {
    message: "Author not found",
  }),
});

export const updateItemSchema = z.object({
  name: z.string().nonempty("Name is required").optional(),
  time: z.string().optional().transform((time) => {
    if (!time) return null;
    return validateAndFormatTime(time);
  }),
  directory: z.string().optional(),
  image: z.string().optional(),
  category_id: z.number().int().positive("Category ID must be a positive number").refine(async (categoryId) => {
    return await isCategoryExists(categoryId);
  }, {
    message: "Category not found",
  }),
  favorites_id: z.number().int().positive("Favorites ID must be a positive number").nullable().optional().refine(async (favoritesId) => {
    if (favoritesId === null || favoritesId === undefined) return true;
    return await isFavoritesExists(favoritesId);
  }, {
    message: "Favorites not found",
  }),
  author_id: z.number().int().positive("Author ID must be a positive number").refine(async (authorId) => {
    return await isAuthorExists(authorId);
  }, {
    message: "Author not found",
  }),
});