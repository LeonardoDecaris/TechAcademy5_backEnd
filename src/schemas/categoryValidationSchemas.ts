import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().nonempty("Name is required"),
});

export const updateCategorySchema = z.object({
  name: z.string().nonempty("Name is required"),
});