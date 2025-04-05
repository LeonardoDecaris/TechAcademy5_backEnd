import { z } from "zod";
import UserModel from "../models/UserModel";

// Function to validate and format CPF
const validateAndFormatCPF = (cpf: string): string => {
  // Remove all non-numeric characters from CPF
  const cleanedCPF = cpf.replace(/\D/g, '');

  // Check if the CPF has exactly 11 digits
  if (cleanedCPF.length !== 11) {
    throw new Error("Invalid CPF format");
  }

  // Internal function to validate CPF based on verification digits
  const isValidCPF = (cpf: string): boolean => {
    let sum;
    let remainder;
    sum = 0;

    // Common invalid CPF (all digits are the same)
    if (cpf === "00000000000") return false;

    for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
  };

  // Check if the CPF is valid
  if (!isValidCPF(cleanedCPF)) {
    throw new Error("Invalid CPF");
  }

  return cleanedCPF;
};

// Function to check if the CPF is unique in the database
const isCPFUnique = async (cpf: string): Promise<boolean> => {
  const user = await UserModel.findOne({ where: { cpf } });
  return !user;
};

// Function to check if the email is unique in the database
const isEmailUnique = async (email: string): Promise<boolean> => {
  const user = await UserModel.findOne({ where: { email } });
  return !user;
};

// Email validation schema for user creation
const emailSchemaForCreate = z.string().email("Invalid email address").refine(async (email) => {
    const isUnique = await isEmailUnique(email);
return isUnique;
  }, {
    message: "Email already exists",
  });

const cpfSchemaForCreate = z
  .string()
  .nonempty("CPF is required")
  .transform(validateAndFormatCPF)
  .refine(async (cpf) => {
    const isUnique = await isCPFUnique(cpf);
    return isUnique;
  }, {
    message: "This CPF already exists",
  });


// Email & CPF validation schema for user
const emailSchemaForUpdate = z.string().email("Invalid email address");
const cpfSchemaForUpdate = z.string().nonempty("CPF is required").transform(validateAndFormatCPF);

export const createUserSchema = z.object({
  name: z.string().nonempty("Name is required"),
  cpf: cpfSchemaForCreate,
  email: emailSchemaForCreate,
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const updateUserSchema = z.object({
  name: z.string().nonempty("Name is required"),
  cpf: cpfSchemaForUpdate,
  email: emailSchemaForUpdate,
  password: z.string().min(6, "Password must be at least 6 characters long"),
});