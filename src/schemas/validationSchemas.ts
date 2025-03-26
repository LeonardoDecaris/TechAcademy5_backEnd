import { z } from "zod";
import { validateAndFormatCPF, isCPFUnique } from "../utils/cpfUtils";
import { isEmailUnique } from "../utils/emailUtils";

//Validacao de email nao repetido
const emailSchema = z.string().email("Invalid email address").refine(async (email) => {
  // Check if the email is unique
  const isUnique = await isEmailUnique(email);
  return isUnique;
}, {
  message: "Email already exists",
});

const cpfSchema = z.string().nonempty("CPF is required").transform(validateAndFormatCPF).refine(async (cpf) => {
  // Check if the CPF is unique
  const isUnique = await isCPFUnique(cpf);
  return isUnique;
}, {
  message: "CPF already exists",
});

export const createUserSchema = z.object({
  name: z.string().nonempty("Name is required"),
  cpf: cpfSchema,
  email: emailSchema,
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const updateUserSchema = z.object({
  name: z.string().nonempty("Name is required"),
  cpf: cpfSchema,
  email: emailSchema,
  password: z.string().min(6, "Password must be at least 6 characters long"),
});