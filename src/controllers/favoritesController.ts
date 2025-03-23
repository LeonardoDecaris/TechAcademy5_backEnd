import { Request, Response } from "express";
import FavoritesModel from "../models/FavoritesModel";

export const getAll = async (req: Request, res: Response) => {
    const favorites = await FavoritesModel.findAll()
    res.send(favorites)
  };
  
  export const getFavoriteById = async (
    req: Request<{ id: string }>,
    res: Response) => {
      const favorite = await FavoritesModel.findByPk(req.params.id)
      return res.json(favorite)
  }

  export const createFavorite = async (req: Request, res: Response) => {
    try{
      const { name, user_id } = req.body
  
      if(!name || !user_id){
        return res.status(400).json({error: 'All values is  required' })
      }
  
      const favorite = await FavoritesModel.create({name})
      res.status(201).json(favorite)
    } catch (error) {
      res.status(500).json('Internal server error' + error)
    }
  }
  
  export const updateFavorite= async (
    req: Request<{ id: string }>,
    res: Response) => {
  
      try {
        const { name, user_id } = req.body
  
        if(!name || !user_id){
          return res.status(400).json({error: 'All values is  required' })
        }
    
        const favorite = await FavoritesModel.findByPk(req.params.id)
        if(!favorite){
          return res.status(404).json({error: "Favorite not Found"})
        }
        
        favorite.name = name;
  
        await favorite.save()
        res.status(201).json(favorite)
  
      } catch (error) {
        res.status(500).json("Internal server error" + error)
      }
    }
  
  export const deleteFavoriteById = async (
    req: Request <{ id: string }>,
    res: Response) =>{
  
      try {
        const favorite = await FavoritesModel.findByPk(req.params.id)
        if (!favorite) {
          return res.status(404).json({error: "Favorite not found"})
        }
      } catch (error) {
        res.status(500).json("Internal server error" + error)
      }
    }
   