import { Request, Response } from "express"
import UserModel from "../models/UserModel";

export const getAll = async (req: Request, res: Response) => {
  const users = await UserModel.findAll()
  res.send(users)
};

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response) => {
    const user = await UserModel.findByPk(req.params.id)
    return res.json(user)
}

export const createUser = async (req: Request, res: Response) => {
  try{
    const { name, cpf, email, password } = req.body

    if(!name || !cpf || !email || !password ){
      return res.status(400).json({error: 'All values are acquired' })
    }

    const user = await UserModel.create({name, cpf, email, password})
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json('Internal server error' + error)
  }
}

export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response) => {

    try {
      const { name, cpf, email, password } = req.body
      const loggedUser = req.body.user

      if(!name || !cpf || !email || !password ){
        return res.status(400).json({error: 'All values are acquired' })
      }

      const user = await UserModel.findByPk(req.params.id)
      if(!user){
        return res.status(404).json({error: "User not Found"})
      }
      
      user.name = name;
      user.cpf = cpf;
      user.email = email;
      user.password = password;

      await user.save()
      res.status(201).json(user)

    } catch (error) {
      res.status(500).json("Internal server error" + error)
    }
  }

export const deleteUserById = async (
  req: Request <{ id: string }>,
  res: Response) =>{

    try {
      const user = await UserModel.findByPk(req.params.id)
      if (!user) {
        return res.status(404).json({error: "User not found"})
      }
    } catch (error) {
      res.status(500).json("Internal server error" + error)
    }
  }
