import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUserById,
  getPaginatedUsers,
} from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();
router.get("/users", getAllUsers);
router.get("/users/paginated", getPaginatedUsers);
router.get("/users/paginated/:page", getPaginatedUsers);
router.get("/users/:id", authMiddleware, getUserById);
router.post("/users", createUser);
router.put("/users/:id", authMiddleware, updateUser);
router.delete("/users/:id", authMiddleware, deleteUserById);

// DOCUMETACAO SWAGGER

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
 *       '401':
 *         description: Não autorizado
 *       '500':
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

/**
 * @openapi
 * /items/{id}:
 *   put:
 *     tags:
 *       - Items
 *     summary: Atualiza um item pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do item a ser atualizado
 *     requestBody:
 *       description: Dados atualizados do item
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do item
 *                 example: "Item Atualizado"
 *               time:
 *                 type: integer
 *                 description: Tempo associado ao item
 *                 example: 5
 *               directory:
 *                 type: string
 *                 description: Caminho do diretório do item
 *                 example: "path/to/directory"
 *               image:
 *                 type: string
 *                 description: Caminho da imagem do item
 *                 example: "path/to/image"
 *               category_id:
 *                 type: integer
 *                 description: ID da categoria associada ao item
 *                 example: 1
 *               author_id:
 *                 type: integer
 *                 description: ID do autor associado ao item
 *                 example: 2
 *     responses:
 *       '200':
 *         description: Item atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       '400':
 *         description: Requisição inválida
 *       '404':
 *         description: Item não encontrado
 *       '500':
 *         description: Erro ao atualizar o item
 */

export default router;
