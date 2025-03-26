import express from "express";
import { getAll, getFavoriteById, createFavorite, updateFavorite, deleteFavoriteById} from "../controllers/favoritesController";
import { authMiddleware } from '../middleware/authMiddleware'

const router = express.Router();

router.get("/favorites", authMiddleware, getAll);
router.post("/favorites", authMiddleware, createFavorite);
router.get("/favorites/:id", authMiddleware, getFavoriteById);
router.put("/favorites/:id", authMiddleware, updateFavorite);
router.delete("/favorites/:id", authMiddleware, deleteFavoriteById);

/**
 * @openapi
 * /favorites:
 *   get:
 *     summary: Retorna todos os favoritos
 *     responses:
 *       200:
 *         description: Lista de favoritos
 *       500:
 *         description: Erro de servidor
 *   post:
 *     summary: Adiciona um novo favorito
 *     requestBody:
 *       description: Dados do favorito
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Favorite'
 *     responses:
 *       201:
 *         description: Favorito adicionado com sucesso
 *       400:
 *         description: Comando inválido
 *       500:
 *         description: Erro de servidor
 * /favorites/{id}:
 *   delete:
 *     summary: Remove um favorito pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do favorito
 *     responses:
 *       204:
 *         description: Favorito removido com sucesso
 *       404:
 *         description: Favorito não encontrado
 *       500:
 *         description: Erro de servidor
 */

export default router;