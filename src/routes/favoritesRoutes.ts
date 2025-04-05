import express from "express";
import { getAll, createFavorite, deleteFavoriteById, getFavoriteById, updateFavorite } from "../controllers/favoritesController";

const router = express.Router();
router.get("/favorites", getAll);
router.post("/favorites", createFavorite);
router.delete("/favorites/:id", deleteFavoriteById);
router.get("/favorites/:id", getFavoriteById);
router.put("/favorites/:id", updateFavorite);

// DOCUMETACAO SWAGGER

/**
 * @openapi
 * /favorites:
 *   get:
 *     summary: Retorna todos os favoritos
 *     responses:
 *       '200':
 *         description: Lista de favoritos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Favorite'
 *       '500':
 *         description: Erro de servidor
 *   post:
 *     summary: Cria um novo favorito
 *     requestBody:
 *       description: Dados do novo favorito
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
 *               items:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: IDs dos itens associados ao favorito
 *                 example: [1, 2, 3]
 *     responses:
 *       '201':
 *         description: Favorito criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FavoriteWithItems'
 *       '400':
 *         description: Requisição inválida
 *       '404':
 *         description: Nenhum item encontrado com os IDs fornecidos
 *       '500':
 *         description: Erro ao criar o favorito
 * /favorites/{id}:
 *   delete:
 *     summary: Remove um favorito pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do favorito a ser removido
 *     responses:
 *       '200':
 *         description: Favorito removido com sucesso
 *       '404':
 *         description: Favorito não encontrado
 *       '500':
 *         description: Erro ao remover o favorito
 *   get:
 *     summary: Retorna um favorito pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do favorito a ser retornado
 *     responses:
 *       '200':
 *         description: Favorito retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FavoriteWithItems'
 *       '404':
 *         description: Favorito não encontrado
 *       '500':
 *         description: Erro ao retornar o favorito
 *   put:
 *     summary: Atualiza um favorito pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do favorito a ser atualizado
 *     requestBody:
 *       description: Dados do favorito a ser atualizado
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do favorito
 *                 example: "Meu Favorito Atualizado"
 *               items:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: IDs dos itens associados ao favorito
 *                 example: [1, 2, 3]
 *     responses:
 *       '200':
 *         description: Favorito atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FavoriteWithItems'
 *       '400':
 *         description: Requisição inválida
 *       '404':
 *         description: Nenhum item encontrado com os IDs fornecidos
 *       '500':
 *         description: Erro ao atualizar o favorito
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Favorite:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     FavoriteWithItems:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Item'
 *     Item:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         time:
 *           type: integer
 *         directory:
 *           type: string
 *         image:
 *           type: string
 *         category_id:
 *           type: integer
 *         author_id:
 *           type: integer
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

export default router;