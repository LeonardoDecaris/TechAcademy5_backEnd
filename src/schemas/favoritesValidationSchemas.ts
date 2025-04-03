import { z } from "zod";

// Esquema de validação para criação de favorito
export const createFavoriteSchema = z.object({
  name: z.string().optional(), 
  items: z.array(z.number().int().positive("ID do item deve ser um número positivo")).optional(),
});

// Esquema de validação para atualização de favorito
export const updateFavoriteSchema = z.object({
  name: z.string().optional(), 
  items: z.array(z.number().int().positive("ID do item deve ser um número positivo")).optional(),
});