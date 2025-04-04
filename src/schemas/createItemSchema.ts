import { z } from "zod";

export const createItemSchema = z.object({
  name: z.string().nonempty("O campo 'name' é obrigatório."),
  time: z.number().min(1, "O campo 'time' deve ser maior que 0."),
  category_id: z.number().int("O campo 'category_id' deve ser um número inteiro."),
  author_id: z.number().int("O campo 'author_id' deve ser um número inteiro."),
  directory: z.string().optional(),
});