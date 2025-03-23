import express from "express";
import { getAll, getAuthorById, createAuthor, updateAuthor, deleteAuthorById} from "../controllers/authorController";
import { authMiddleware } from '../middleware/authMiddleware'

const router = express.Router();

router.get("/authors", authMiddleware, getAll);
router.post("/authors", authMiddleware, createAuthor);
router.get("/authors/:id", authMiddleware, getAuthorById);
router.put("/authors/:id", authMiddleware, updateAuthor);
router.delete("/authors/:id", authMiddleware, deleteAuthorById);

export default router;