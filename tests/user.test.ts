import app from '../src/app'
import sequelize from '../src/config/database'
import request from 'supertest'

jest.mock('../src/middleware/authMiddleware', () => {
    return {
        authMiddleware: (req: any, res: any, next: any) => {
            req.body.user = {
                id: "1",
                name: "João",
                cpf: "847.671.250-22",
                email: "email@exemplo.com",
                password: "senha123",
            }

            next()
        }
    }
})

describe('User Endpoint', () => {
    beforeAll(async () => {
        await sequelize.sync({force: true})
    })

    afterAll(async () => {
        await sequelize.close()
    })

    test('POST /users shold create a new user and return success', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                id: "1",
                name: "João",
                cpf: "847.671.250-22",
                email: "email@exemplo.com",
                password: "senha123",
            })
        expect(response.status).toBe(201)
    })

    test('GET /users should return a list of user', async () => {
        const response = await request(app)
            .get('/users')
            .set({Authorization: 'TestToken'})

        expect(response.status).toBe(200)
    })

    test('GET /users/:id should return a user by id', async () => {
        const response = await request(app)
            .get('/users/1')
            .set({Authorization: 'TestToken'})

        expect(response.status).toBe(200)
    })

    test('PUT /users/:id should update a user and return success', async () => {
        const response = await request(app)
            .put('/users/1')
            .send({
                name: "João Atualizado",
                cpf: "847.671.250-22",
                email: "email@exemplo.com",
                password: "novaSenha123",
            });
        expect(response.status).toBe(200); 
    });

    test('DELETE /users/:id should return a user by id', async () => {
        const response = await request(app)
            .delete('/users/1')
            .set({Authorization: 'TestToken'})

        expect(response.status).toBe(200)
    })
})
