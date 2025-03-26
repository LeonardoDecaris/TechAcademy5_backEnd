import { z } from "zod";

// Esquema de validação para criação de autor
export const createAuthorSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
});

// Esquema de validação para atualização de autor
export const updateAuthorSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
});