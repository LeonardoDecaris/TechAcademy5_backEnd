import { z } from "zod";

export const createFavoriteSchema = z.object({
  name: z.string().optional(), 
  items: z.array(z.number().int().positive("Item ID must be a positive number")).optional(),
});

export const updateFavoriteSchema = z.object({
  name: z.string().optional(), 
  items: z.array(z.number().int().positive("Item ID must be a positive number")).optional(),
});