import { Request, Response } from "express";
import FavoritesModel from "../models/FavoritesModel";
import ItemModel from "../models/ItemModel";
import { createFavoriteSchema, updateFavoriteSchema } from "../schemas/favoritesValidationSchemas";
import { z } from "zod";

const collections: { id: number; name: string }[] = [];

export const getAll = async (req: Request, res: Response) => {
  try {
    // Search for all favorites with their associated items
    const favorites = await FavoritesModel.findAll({
      include: [
        {
          model: ItemModel,
          as: "items",
        },
      ],
    });

    res.status(200).json(favorites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ error: "Error fetching favorites", details: error });
  }
};

export const getFavoriteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Search for a favorite by ID with its associated items
    const favorite = await FavoritesModel.findByPk(id, {
      include: [
        {
          model: ItemModel,
          as: "items",
        },
      ],
    });

    if (!favorite) {
      return res.status(404).json({ error: "Favorites not found" });
    }

    res.status(200).json(favorite);
  } catch (error) {
    console.error("Error fetching favorite:", error);
    res.status(500).json({ error: "Error fetching favorite", details: error });
  }
};

export const createFavorite = async (req: Request, res: Response) => {
  try {
    const { name, items } = req.body;
    const parsedData = createFavoriteSchema.parse({ name, items });

    if (!parsedData.name) {
      return res.status(400).json({ error: "Name is required" });
    }
    const favorite = await FavoritesModel.create({ name: parsedData.name });

    if (parsedData.items && parsedData.items.length > 0) {
      const validItems = await ItemModel.findAll({
        where: { id: parsedData.items },
      });

      if (validItems.length !== parsedData.items.length) {
        return res.status(400).json({
          error: "Invalid item IDs. Please provide valid item IDs",
        });
      }

      await favorite.addItems(validItems);
    }

    const favoriteWithItems = await FavoritesModel.findByPk(favorite.id, {
      include: [
        {
          model: ItemModel,
          as: "items",
        },
      ],
    });

    res.status(201).json(favoriteWithItems);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Error in validate favorite", details: error.errors });
    }

    console.error("Error creating favorite:", error);
    res.status(500).json({ error: "Error creating favorite", details: error });
  }
};

export const deleteFavoriteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const favorite = await FavoritesModel.findByPk(id);

    if (!favorite) {
      return res.status(404).json({ error: "Favorite not found" });
    }

    await favorite.destroy();

    res.status(200).json({ message: "Favorite deleted successfully" });
  } catch (error) {
    console.error("Error removing favorite:", error);
    res.status(500).json({ error: "Error removing favorite:", details: error });
  }
};

export const updateFavorite = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const parsedData = updateFavoriteSchema.parse(req.body);

    const favorite = await FavoritesModel.findByPk(id);

    if (!favorite) {
      return res.status(404).json({ error: "Favorite not found" });
    }

    favorite.name = parsedData.name || favorite.name;

    // Update items associated with the favorite
    if (parsedData.items && parsedData.items.length > 0) {
      const items = await ItemModel.findAll({ where: { id: parsedData.items } });
      await favorite.setItems(items);
    }

    await favorite.save();

    // Seacrh for the updated favorite with its associated items
    const updatedFavorite = await FavoritesModel.findByPk(favorite.id, {
      include: [
        {
          model: ItemModel,
          as: "items",
        },
      ],
    });

    res.status(200).json(updatedFavorite);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Error in validate favorite", details: error.errors });
    }

    console.error("Error updating favorite:", error);
    res.status(500).json({ error: "Error updating favorite", details: error });
  }
};