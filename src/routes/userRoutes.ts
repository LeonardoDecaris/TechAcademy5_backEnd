import express from "express";
import { getAll, getUserById, createUser, updateUser, deleteUserById } from "../controllers/userController";
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get("/users", getAll);
router.post("/users", createUser);
router.get("/users/:id", authMiddleware, getUserById);
router.put("/users/:id", authMiddleware, updateUser);
router.delete("/users/:id", authMiddleware, deleteUserById);

// DOCUMETACAO SWAGGER

// GET

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de usuários retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
  *       401:
 *         description: Nao Autorizado
 *        500:
 *         description: Erro de servidor
 */

//POST

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Dados do novo usuário
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario criado com sucesso
 *       400:
 *         description: Comando invalido
 *       500:
 *         description: Erro de servidor
 */

//GET BY ID

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Retorna um usuário específico pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário.
 *     responses:
 *       200:
 *         description: Usuario Encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Nao autorizado
 *       404:
 *         description: Usuario nao encontrado
 *       500:
 *         description: Erro de servidor
 */

//PUT

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     summary: Atualiza os dados de um usuário pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser atualizado.
 *     requestBody:
 *       description: Dados atualizados do usuário.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuario atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Comando invalido
 *       401:
 *         description: Nao autorizado
 *       404:
 *         description: Usuario nao encontrado
 *       500:
 *         description: Erro de servidor
 */

//DELETE

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Exclui um usuário específico pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser removido.
 *     responses:
 *       204:
 *         description: Usuario deletado com sucesso
 *       401:
 *         description: Nao autorizado
 *       404:
 *         description: Usuario nao encontrado
 *       500:
 *         description: Erro de servidor
 */

export default router;