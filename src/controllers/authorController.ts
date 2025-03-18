import { Request, Response } from "express";
import AuthorModel from "../models/AuthorModel";

export const getAll = async (req: Request, res: Response) => {
    const authors = await AuthorModel.findAll()
    res.send(authors)
  };
  
  export const getAuthorById = async (
    req: Request<{ id: string }>,
    res: Response) => {
      const author = await AuthorModel.findByPk(req.params.id)
      return res.json(author)
  }

  export const createAuthor = async (req: Request, res: Response) => {
    try{
      const { name } = req.body
  
      if(!name){
        return res.status(400).json({error: 'All values is  required' })
      }
  
      const author = await AuthorModel.create({name})
      res.status(201).json(author)
    } catch (error) {
      res.status(500).json('Internal server error' + error)
    }
  }
  
  export const updateAuthor= async (
    req: Request<{ id: string }>,
    res: Response) => {
  
      try {
        const { name } = req.body

        if(!name){
          return res.status(400).json({error: 'All values is  required' })
        }
  
        const author = await AuthorModel.findByPk(req.params.id)
        if(!author){
          return res.status(404).json({error: "Author not Found"})
        }
        
        author.name = name;
  
        await author.save()
        res.status(201).json(author)
  
      } catch (error) {
        res.status(500).json("Internal server error" + error)
      }
    }
  
  export const deleteAuthorById = async (
    req: Request <{ id: string }>,
    res: Response) =>{
  
      try {
        const author = await AuthorModel.findByPk(req.params.id)
        if (!author) {
          return res.status(404).json({error: "Author not found"})
        }
      } catch (error) {
        res.status(500).json("Internal server error" + error)
      }
    }
  