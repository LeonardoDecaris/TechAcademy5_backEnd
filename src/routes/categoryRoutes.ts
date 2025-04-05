import express from 'express';
import { getAll, getCategoryById, createCategory, updateCategory, deleteCategoryById } from '../controllers/categoryController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();
router.get('/categories', authMiddleware, getAll);
router.get('/categories/:id', authMiddleware, getCategoryById);
router.post('/categories', authMiddleware, createCategory);
router.put('/categories/:id', authMiddleware, updateCategory);
router.delete('/categories/:id', authMiddleware, deleteCategoryById);

// DOCUMETACAO SWAGGER

/**
 * @openapi
 * /categories:
 *   get:
 *     summary: Retorna todas as categorias
 *     responses:
 *       200:
 *         description: Lista de categorias
 *       500:
 *         description: Erro de servidor
 *   post:
 *     summary: Cria uma nova categoria
 *     requestBody:
 *       description: Dados da categoria
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *       400:
 *         description: Comando inválido
 *       500:
 *         description: Erro de servidor
 * /categories/{id}:
 *   get:
 *     summary: Retorna uma categoria pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da categoria
 *     responses:
 *       200:
 *         description: Categoria encontrada
 *       404:
 *         description: Categoria não encontrada
 *       500:
 *         description: Erro de servidor
 *   put:
 *     summary: Atualiza uma categoria pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da categoria
 *     requestBody:
 *       description: Dados da categoria
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
 *       400:
 *         description: Comando inválido
 *       404:
 *         description: Categoria não encontrada
 *       500:
 *         description: Erro de servidor
 *   delete:
 *     summary: Deleta uma categoria pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da categoria
 *     responses:
 *       204:
 *         description: Categoria deletada com sucesso
 *       404:
 *         description: Categoria não encontrada
 *       500:
 *         description: Erro de servidor
 */

export default router;