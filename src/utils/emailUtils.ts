import UserModel from "../models/UserModel";

export const isEmailUnique = async (email: string): Promise<boolean> => {
  const user = await UserModel.findOne({ where: { email } });
  return !user;
};