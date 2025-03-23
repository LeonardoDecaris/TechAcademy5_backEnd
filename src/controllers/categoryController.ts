import { Request, Response } from "express";
// import FavoritesModel from "../models/FavoritesModel.tsss";
import CategoryModel from "../models/CategoryModel";

export const getAll = async (req: Request, res: Response) => {
    const category = await CategoryModel.findAll()
    res.send(category)
  };
  
  export const getCategoryById = async (
    req: Request<{ id: string }>,
    res: Response) => {
      const category = await CategoryModel.findByPk(req.params.id)
      return res.json(category)
  }

  export const createCategory = async (req: Request, res: Response) => {
    try{
      const { name } = req.body
  
      if(!name){
        return res.status(400).json({error: 'All values is  required' })
      }
  
      const category = await CategoryModel.create({name})
      res.status(201).json(category)
    } catch (error) {
      res.status(500).json('Internal server error' + error)
    }
  }
  
  export const updateCategory = async (
    req: Request<{ id: string }>,
    res: Response) => {
  
      try {
        const { name } = req.body
  
        if(!name){
          return res.status(400).json({error: 'All values is  required' })
        }
    
        const category = await CategoryModel.findByPk(req.params.id)
        if(!category){
          return res.status(404).json({error: "Favorite not Found"})
        }
        
        category.name = name;
  
        await category.save()
        res.status(201).json(category)
  
      } catch (error) {
        res.status(500).json("Internal server error" + error)
      }
    }
  
  export const deleteCategoryById = async (
    req: Request <{ id: string }>,
    res: Response) =>{
  
      try {
        const category = await CategoryModel.findByPk(req.params.id)
        if (!category) {
          return res.status(404).json({error: "Favorite not found"})
        }
      } catch (error) {
        res.status(500).json("Internal server error" + error)
      }
    }
   