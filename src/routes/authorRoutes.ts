import express from "express";
import { getAll, getAuthorById, createAuthor, updateAuthor, deleteAuthorById} from "../controllers/authorController";
import { authMiddleware } from '../middleware/authMiddleware'

const router = express.Router();
router.get("/authors", getAll);
router.get("/authors/:id", getAuthorById);
router.post("/authors", authMiddleware, createAuthor);
router.put("/authors/:id", authMiddleware, updateAuthor);
router.delete("/authors/:id", authMiddleware, deleteAuthorById);

// DOCUMETACAO SWAGGER

/**
 * @openapi
 * /authors:
 *   get:
 *     summary: Retorna todos os autores
 *     responses:
 *       200:
 *         description: Lista de autores
 *       500:
 *         description: Erro de servidor
 *   post:
 *     summary: Cria um novo autor
 *     requestBody:
 *       description: Dados do autor
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       201:
 *         description: Autor criado com sucesso
 *       400:
 *         description: Comando inválido
 *       500:
 *         description: Erro de servidor
 * /authors/{id}:
 *   get:
 *     summary: Retorna um autor pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do autor
 *     responses:
 *       200:
 *         description: Autor encontrado
 *       404:
 *         description: Autor não encontrado
 *       500:
 *         description: Erro de servidor
 *   put:
 *     summary: Atualiza um autor pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do autor
 *     requestBody:
 *       description: Dados do autor
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       200:
 *         description: Autor atualizado com sucesso
 *       400:
 *         description: Comando inválido
 *       404:
 *         description: Autor não encontrado
 *       500:
 *         description: Erro de servidor
 *   delete:
 *     summary: Deleta um autor pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do autor
 *     responses:
 *       204:
 *         description: Autor deletado com sucesso
 *       404:
 *         description: Autor não encontrado
 *       500:
 *         description: Erro de servidor
 */

export default router;