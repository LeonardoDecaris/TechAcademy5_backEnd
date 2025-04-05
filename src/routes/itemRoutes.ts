import express from 'express';
import { getAll, getItemById, createItem, updateItem, deleteItemById, getPaginatedItems } from '../controllers/itemController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();
router.get('/items', getAll);
router.get('/items/paginated', getPaginatedItems);
router.get('/items/paginated/:page', getPaginatedItems);
router.get('/items/:id', getItemById);
router.post('/items', authMiddleware, createItem);
router.put('/items/:id', authMiddleware, updateItem);
router.delete('/items/:id', authMiddleware, deleteItemById);

// DOCUMETACAO SWAGGER

/**
 * @openapi
 * /items:
 *   get:
 *     tags:
 *       - Items
 *     summary: Retorna todos os itens
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de itens retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 *       '500':
 *         description: Erro de servidor.
 *   post:
 *     tags:
 *       - Items
 *     summary: Cria um novo item
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Dados do item a ser criado
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       '201':
 *         description: Item criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       '400':
 *         description: Comando inválido.
 *       '500':
 *         description: Erro de servidor.
 * /items/{id}:
 *   get:
 *     tags:
 *       - Items
 *     summary: Retorna um item pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do item
 *     responses:
 *       '200':
 *         description: Item encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       '404':
 *         description: Item não encontrado.
 *       '500':
 *         description: Erro de servidor.
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
 *         description: ID do item
 *     requestBody:
 *       description: Dados do item a ser atualizado
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       '200':
 *         description: Item atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       '400':
 *         description: Comando inválido.
 *       '404':
 *         description: Item não encontrado.
 *       '500':
 *         description: Erro de servidor.
 *   delete:
 *     tags:
 *       - Items
 *     summary: Deleta um item pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do item
 *     responses:
 *       '204':
 *         description: Item deletado com sucesso.
 *       '404':
 *         description: Item não encontrado.
 *       '500':
 *         description: Erro de servidor.
 */

export default router;