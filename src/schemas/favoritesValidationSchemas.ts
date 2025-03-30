import { z } from "zod";

// Esquema de validação para criação de favorito
export const createFavoriteSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  items: z.array(z.number().int().positive("ID do item deve ser um número positivo")).optional(),
});

// Esquema de validação para atualização de favorito
export const updateFavoriteSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  user_id: z.number().int().positive("ID do usuário deve ser um número positivo"),
  items: z.array(z.number().int().positive("ID do item deve ser um número positivo")).optional(),
});