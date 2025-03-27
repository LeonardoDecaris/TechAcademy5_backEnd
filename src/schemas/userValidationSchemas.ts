import { z } from "zod";
import UserModel from "../models/UserModel";

// Função para validar e formatar CPF
const validateAndFormatCPF = (cpf: string): string => {
  const cleanedCPF = cpf.replace(/\D/g, '');

  if (cleanedCPF.length !== 11) {
    throw new Error("Formato de CPF Inválido");
  }

  const isValidCPF = (cpf: string): boolean => {
    let sum;
    let remainder;
    sum = 0;
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

  if (!isValidCPF(cleanedCPF)) {
    throw new Error("CPF Inválido");
  }

  return cleanedCPF;
};

// Função para verificar se o CPF é único
const isCPFUnique = async (cpf: string): Promise<boolean> => {
  const user = await UserModel.findOne({ where: { cpf } });
  return !user;
};

// Função para verificar se o email é único
const isEmailUnique = async (email: string): Promise<boolean> => {
  const user = await UserModel.findOne({ where: { email } });
  return !user;
};

// Esquema de validação de email para criação
const emailSchemaForCreate = z.string().email("Endereço de email inválido").refine(async (email) => {
  const isUnique = await isEmailUnique(email);
  return isUnique;
}, {
  message: "Email já existe",
});

// Esquema de validação de CPF para criação
const cpfSchemaForCreate = z.string().nonempty("CPF é obrigatório").transform(validateAndFormatCPF).refine(async (cpf) => {
  const isUnique = await isCPFUnique(cpf);
  return isUnique;
}, {
  message: "Esse CPF já existe",
});

// Esquema de validação de email para atualização (sem validação de unicidade)
const emailSchemaForUpdate = z.string().email("Endereço de email inválido");

// Esquema de validação de CPF para atualização (sem validação de unicidade)
const cpfSchemaForUpdate = z.string().nonempty("CPF é obrigatório").transform(validateAndFormatCPF);

// Esquema de validação para criação de usuário
export const createUserSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  cpf: cpfSchemaForCreate,
  email: emailSchemaForCreate,
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

// Esquema de validação para atualização de usuário
export const updateUserSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  cpf: cpfSchemaForUpdate,
  email: emailSchemaForUpdate,
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});