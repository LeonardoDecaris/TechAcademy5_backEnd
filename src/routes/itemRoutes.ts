import express from "express";
import { getAll, getUserById, createUser, updateUser, deleteUserById} from "../controllers/userController";
import { authMiddleware } from '../middleware/authMiddleware'

const router = express.Router();

router.get("/item", getAll);
router.get("/item/:id", getUserById);
router.post("/item", authMiddleware, createUser);
router.put("/item/:id", authMiddleware, updateUser);
router.delete("/item/:id", authMiddleware, deleteUserById);

export default router;