import express from "express";
import { getAll, getCategoryById, createCategory, updateCategory, deleteCategoryById} from "../controllers/categoryController";
import { authMiddleware } from '../middleware/authMiddleware'

const router = express.Router();

router.get("/category", authMiddleware, getAll);
router.post("/category", authMiddleware, createCategory);
router.get("/category/:id", authMiddleware, getCategoryById);
router.put("/category/:id", authMiddleware, updateCategory);
router.delete("/category/:id", authMiddleware, deleteCategoryById);

export default router;