import request from 'supertest';
import app from '../src/app';
import sequelize from '../src/config/database';

beforeAll(async () => {
  await sequelize.sync({ force: true });

  // Criação de um usuário para os testes de login
  await request(app).post('/users').send({
    name: "João",
    cpf: "847.671.250-22",
    email: "joao@exemplo.com",
    password: "senha123",
  });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Login Endpoint', () => {
  test('POST /login should return a token for valid credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: "joao@exemplo.com",
        password: "senha123",
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  test('POST /login should fail for invalid credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: "joao@exemplo.com",
        password: "senhaErrada",
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Email or password are invalid'); // Corrigido para verificar a propriedade "error"
  });

  test('POST /login should fail when email is missing', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        password: "senha123",
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Email is required');
  });

  test('POST /login should fail when password is missing', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: "joao@exemplo.com",
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Password is required');
  });
});