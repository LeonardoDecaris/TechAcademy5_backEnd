import express from 'express';
import { getAll, getItemById, createItem, updateItem, deleteItemById } from '../controllers/itemController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/items', getAll);
router.get('/items/:id', getItemById);
router.post('/items', authMiddleware, createItem);
router.put('/items/:id', authMiddleware, updateItem);
router.delete('/items/:id', authMiddleware, deleteItemById);

// DOCUMETACAO SWAGGER

/**
 * @openapi
 * /items:
 *   get:
 *     summary: Retorna todos os itens
 *     responses:
 *       200:
 *         description: Lista de itens
 *       500:
 *         description: Erro de servidor
 *   post:
 *     summary: Cria um novo item
 *     requestBody:
 *       description: Dados do item
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       201:
 *         description: Item criado com sucesso
 *       400:
 *         description: Comando inválido
 *       500:
 *         description: Erro de servidor
 * /items/{id}:
 *   get:
 *     summary: Retorna um item pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do item
 *     responses:
 *       200:
 *         description: Item encontrado
 *       404:
 *         description: Item não encontrado
 *       500:
 *         description: Erro de servidor
 *   put:
 *     summary: Atualiza um item pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do item
 *     requestBody:
 *       description: Dados do item
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: Item atualizado com sucesso
 *       400:
 *         description: Comando inválido
 *       404:
 *         description: Item não encontrado
 *       500:
 *         description: Erro de servidor
 *   delete:
 *     summary: Deleta um item pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do item
 *     responses:
 *       204:
 *         description: Item deletado com sucesso
 *       404:
 *         description: Item não encontrado
 *       500:
 *         description: Erro de servidor
 */

export default router;