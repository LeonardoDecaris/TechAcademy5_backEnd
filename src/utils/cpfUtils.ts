export const validateAndFormatCPF = (cpf: string): string => {
  // Remove all non-numeric characters
  const cleanedCPF = cpf.replace(/\D/g, '');

  // Check if the cleaned CPF has 11 digits
  if (cleanedCPF.length !== 11) {
    throw new Error("Invalid CPF format");
  }

  // Add additional CPF validation logic if necessary

  return cleanedCPF;
};