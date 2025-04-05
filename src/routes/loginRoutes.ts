import express from 'express'
import { login } from '../controllers/loginController'

const router = express.Router();
router.post('/login', login)

// DOCUMETACAO SWAGGER

/**
 * @openapi
 * /login:
 *   post:
 *     summary: Faz Login do usuario
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Dados do Login
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       201:
 *         description: Usuario criado com sucesso
 *       400:
 *         description: Comando invalido
 *       500:
 *         description: Erro de servidor
 */

export default router;