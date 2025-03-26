import { z } from "zod";

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

// Esquema de validação para criação de item
export const createItemSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  time: z.string().nonempty("Tempo é obrigatório").transform(validateAndFormatTime),
  directory: z.string().nonempty("Diretório é obrigatório"),
  image: z.string().nonempty("Imagem é obrigatória"),
  category_id: z.number().int().positive("ID da categoria deve ser um número positivo"),
  favorites_id: z.number().int().positive("ID dos favoritos deve ser um número positivo"),
  author_id: z.number().int().positive("ID do autor deve ser um número positivo"),
});

// Esquema de validação para atualização de item
export const updateItemSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  time: z.string().nonempty("Tempo é obrigatório").transform(validateAndFormatTime),
  directory: z.string().nonempty("Diretório é obrigatório"),
  image: z.string().nonempty("Imagem é obrigatória"),
  category_id: z.number().int().positive("ID da categoria deve ser um número positivo"),
  favorites_id: z.number().int().positive("ID dos favoritos deve ser um número positivo"),
  author_id: z.number().int().positive("ID do autor deve ser um número positivo"),
});