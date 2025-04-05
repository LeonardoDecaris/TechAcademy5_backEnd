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
    });


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

    
    test('POST /users should fail when required fields are missing', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                name: "João",
                email: "email@exemplo.com",
                password: "senha123",
            }); 
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });

// Teste de CPF inválido

test('POST /users should fail when fields are invalid', async () => {
    const response = await request(app)
        .post('/users')
        .send({
            id: "1",
            name: "João",
            cpf: "000000000000",
            email: "email@exemplo.com",
            password: "senha123",
        }); 
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
});

    test('POST /users should fail when fields are invalid', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                id: "1",
                name: "João",
                cpf: "invalid-cpf",
                email: "invalid-email",
                password: "short",
            }); 
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });


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

    test('PUT /users/:id should fail if logged-in user tries to update another user', async () => {
        const response = await request(app)
            .put('/users/2') 
            .send({
                name: "Novo Nome",
                password: "novaSenha123",
            })
            .set({ Authorization: 'TestToken' });

        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty('message', 'You can only update your own user');
    });

    test('DELETE /users/:id should return a user by id', async () => {
        const response = await request(app)
            .delete('/users/1')
            .set({Authorization: 'TestToken'})

        expect(response.status).toBe(200)
    })
    test('DELETE /users/:id should return 404 when user not found', async () => {
        const response = await request(app)
            .delete('/users/999')
            .set({Authorization: 'TestToken'})

        expect(response.status).toBe(404)

    })
});