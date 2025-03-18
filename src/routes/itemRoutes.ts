import express from "express";
import { getAll, getUserById, createUser, updateUser, deleteUserById} from "../controllers/userController";
import { authMiddleware } from '../middleware/authMiddleware'

const router = express.Router();

router.post("/users", createUser);

router.get("/users", authMiddleware, getAll);
router.get("/users/:id", authMiddleware, getUserById);
router.get("/users/:id", authMiddleware, updateUser);
router.put("/users/:id", authMiddleware, deleteUserById);

export default router;