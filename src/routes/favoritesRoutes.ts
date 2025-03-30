import express from "express";
import { getAll, getFavoriteById, createFavorite, updateFavorite, deleteFavoriteById} from "../controllers/favoritesController";
import { authMiddleware } from '../middleware/authMiddleware'

const router = express.Router();

router.get("/favorites", authMiddleware, getAll);
router.post("/favorites", authMiddleware, createFavorite);
router.delete("/favorites/:id", authMiddleware, deleteFavoriteById);

// DOCUMETACAO SWAGGER

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
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do favorito
 *                 example: "Meu Favorito"
 *               user_id:
 *                 type: integer
 *                 description: ID do usuário associado ao favorito
 *                 example: 1
 *               items:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: IDs dos itens associados ao favorito
 *                 example: [1, 2, 3]
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