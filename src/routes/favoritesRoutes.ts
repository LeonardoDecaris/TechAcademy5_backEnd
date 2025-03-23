import express from "express";
import { getAll, getFavoriteById, createFavorite, updateFavorite, deleteFavoriteById} from "../controllers/favoritesController";
import { authMiddleware } from '../middleware/authMiddleware'

const router = express.Router();

router.get("/favorites", authMiddleware, getAll);
router.post("/favorites", authMiddleware, createFavorite);
router.get("/favorites/:id", authMiddleware, getFavoriteById);
router.put("/favorites/:id", authMiddleware, updateFavorite);
router.delete("/favorites/:id", authMiddleware, deleteFavoriteById);

export default router;