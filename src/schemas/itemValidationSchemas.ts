import { z } from "zod";
import CategoryModel from "../models/CategoryModel";
import AuthorModel from "../models/AuthorModel";
import FavoritesModel from "../models/FavoritesModel";

// Função para validar e formatar o tempo no formato MM:SS
const validateAndFormatTime = (time: string): string => {
  // Remove todos os caracteres não numéricos
  const cleanedTime = time.replace(/\D/g, '');

  // Verifica se o tempo tem 4 dígitos (MMSS)
  if (cleanedTime.length !== 4) {
    throw new Error("Tempo deve estar no formato MM:SS");
  }

  // Formata o tempo no formato MM:SS
  const formattedTime = `${cleanedTime.slice(0, 2)}:${cleanedTime.slice(2, 4)}`;

  // Verifica se o tempo formatado está no formato correto
  const regex = /^([0-5][0-9]):([0-5][0-9])$/;
  if (!regex.test(formattedTime)) {
    throw new Error("Tempo deve estar no formato MM:SS");
  }

  return formattedTime;
};

// Função para verificar se a categoria existe
const isCategoryExists = async (categoryId: number): Promise<boolean> => {
  const category = await CategoryModel.findByPk(categoryId);
  return !!category;
};

// Função para verificar se o autor existe
const isAuthorExists = async (authorId: number): Promise<boolean> => {
  const author = await AuthorModel.findByPk(authorId);
  return !!author;
};

// Função para verificar se os favoritos existem
const isFavoritesExists = async (favoritesId: number): Promise<boolean> => {
  const favorites = await FavoritesModel.findByPk(favoritesId);
  return !!favorites;
};

// Esquema de validação para criação de item
export const createItemSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  time: z.string().nonempty("Tempo é obrigatório").transform(validateAndFormatTime),
  directory: z.string().nonempty("Diretório é obrigatório"),
  image: z.string().nonempty("Imagem é obrigatória"),
  category_id: z.number().int().positive("ID da categoria deve ser um número positivo").refine(async (categoryId) => {
    return await isCategoryExists(categoryId);
  }, {
    message: "Categoria não encontrada",
  }),
  favorites_id: z.number().int().positive("ID dos favoritos deve ser um número positivo").nullable().optional().refine(async (favoritesId) => {
    if (favoritesId === null || favoritesId === undefined) return true;
    return await isFavoritesExists(favoritesId);
  }, {
    message: "Favoritos não encontrados",
  }),
  author_id: z.number().int().positive("ID do autor deve ser um número positivo").refine(async (authorId) => {
    return await isAuthorExists(authorId);
  }, {
    message: "Autor não encontrado",
  }),
});

// Esquema de validação para atualização de item
export const updateItemSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  time: z.string().nonempty("Tempo é obrigatório").transform(validateAndFormatTime),
  directory: z.string().nonempty("Diretório é obrigatório"),
  image: z.string().nonempty("Imagem é obrigatória"),
  category_id: z.number().int().positive("ID da categoria deve ser um número positivo").refine(async (categoryId) => {
    return await isCategoryExists(categoryId);
  }, {
    message: "Categoria não encontrada",
  }),
  favorites_id: z.number().int().positive("ID dos favoritos deve ser um número positivo").nullable().optional().refine(async (favoritesId) => {
    if (favoritesId === null || favoritesId === undefined) return true;
    return await isFavoritesExists(favoritesId);
  }, {
    message: "Favoritos não encontrados",
  }),
  author_id: z.number().int().positive("ID do autor deve ser um número positivo").refine(async (authorId) => {
    return await isAuthorExists(authorId);
  }, {
    message: "Autor não encontrado",
  }),
});