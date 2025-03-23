import express from "express";
import { getAll, getUserById, createUser, updateUser, deleteUserById} from "../controllers/userController";
import { authMiddleware } from '../middleware/authMiddleware'

const router = express.Router();

router.get("/users", authMiddleware, getAll);
router.post("/users", authMiddleware, createUser);
router.get("/users/:id", authMiddleware, getUserById);
router.put("/users/:id", authMiddleware, updateUser);
router.delete("/users/:id", authMiddleware, deleteUserById);

export default router;