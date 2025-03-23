import { Request, Response } from "express";
import ItemModel from "../models/ItemModel";

export const getAll = async (req: Request, res: Response) => {
    const items = await ItemModel.findAll()
    res.send(items)
  };
  
  export const getItemById = async (
    req: Request<{ id: string }>,
    res: Response) => {
      const item = await ItemModel.findByPk(req.params.id)
      return res.json(item)
  }

  export const createItem = async (req: Request, res: Response) => {
    try{
      const { name, time, directory, image, category_id, favorites_id, author_id } = req.body
  
      if(!name || !time || !directory || !image || !category_id || !favorites_id || !author_id){
        return res.status(400).json({error: 'All values is  required' })
      }
  
      const item = await ItemModel.create({name})
      res.status(201).json(item)
    } catch (error) {
      res.status(500).json('Internal server error' + error)
    }
  }
  
  export const updateItem= async (
    req: Request<{ id: string }>,
    res: Response) => {
  
      try {
        const { name, time, directory, image, category_id, favorites_id, author_id } = req.body
  
        if(!name || !time || !directory || !image || !category_id || !favorites_id || !author_id){
          return res.status(400).json({error: 'All values is  required' })
        }
  
        const item = await ItemModel.findByPk(req.params.id)
        if(!item){
          return res.status(404).json({error: "Item not Found"})
        }
        
        item.name = name;
  
        await item.save()
        res.status(201).json(item)
  
      } catch (error) {
        res.status(500).json("Internal server error" + error)
      }
    }
  
  export const deleteItemById = async (
    req: Request <{ id: string }>,
    res: Response) =>{
  
      try {
        const item = await ItemModel.findByPk(req.params.id)
        if (!item) {
          return res.status(404).json({error: "Item not found"})
        }
      } catch (error) {
        res.status(500).json("Internal server error" + error)
      }
    }
   