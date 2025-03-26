import { z } from "zod";

// Esquema de validação para criação de categoria
export const createCategorySchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
});

// Esquema de validação para atualização de categoria
export const updateCategorySchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
});