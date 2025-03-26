import CategoryModel from "../models/CategoryModel";
import AuthorModel from "../models/AuthorModel";
import FavoritesModel from "../models/FavoritesModel";

export const isCategoryExists = async (categoryId: number): Promise<boolean> => {
  const category = await CategoryModel.findByPk(categoryId);
  return !!category;
};

export const isAuthorExists = async (authorId: number): Promise<boolean> => {
  const author = await AuthorModel.findByPk(authorId);
  return !!author;
};

export const isFavoritesExists = async (favoritesId: number): Promise<boolean> => {
  const favorites = await FavoritesModel.findByPk(favoritesId);
  return !!favorites;
};