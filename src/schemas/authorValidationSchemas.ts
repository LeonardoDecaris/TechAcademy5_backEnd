import { z } from "zod";

export const createAuthorSchema = z.object({
  name: z.string().nonempty("Name is required"),
});

export const updateAuthorSchema = z.object({
  name: z.string().nonempty("Name is required"),
});