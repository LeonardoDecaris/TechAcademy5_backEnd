import { z } from "zod";
import { validateAndFormatCPF } from "../utils/cpfUtils";

export const createUserSchema = z.object({
  name: z.string().nonempty("Name is required"),
  cpf: z.string().nonempty("CPF is required").transform(validateAndFormatCPF),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const updateUserSchema = z.object({
  name: z.string().nonempty("Name is required"),
  cpf: z.string().nonempty("CPF is required").transform(validateAndFormatCPF),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});