import app from '../src/app'
import sequelize from '../src/config/database'
import request from 'supertest'
import { authMiddleware } from '../src/middleware/authMiddleware'


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

    test('GET /users should return a list of users', async () => {
        const response = await request(app)
            .get('/users')
            .set({Authorization: 'TestToken'})

        expect(response.status).toBe(200)
    })

    test('GET /users/:id should return a user', async () => {
        const response = await request(app)
            .get('/users/1')
            .set({Authorization: 'TestToken'})
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('id')
    })

    test('PUT /users/:id should update a user', async () => {
        const response = await request(app)
            .put('/users/1')
            .set({Authorization: 'TestToken'})
            .send({
                id: "1",
                name: "João",
                cpf: "847.671.250-22",
                email: "email@exemplo.com",
                password: "senha123",
            })
        expect(response.status).toBe(200)
    })

    test('DELETE /users/:id should delete a user', async () => {
        const response = await request(app)
            .delete('/users/1')
            .set({Authorization: 'TestToken'})
        expect(response.status).toBe(204)
    })









})
