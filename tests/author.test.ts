import app from '../src/app';
import sequelize from '../src/config/database';
import request from 'supertest';

jest.mock('../src/middleware/authMiddleware', () => {
  return {
    authMiddleware: (req: any, res: any, next: any) => {
      req.body.author = {
        id: 1,
        name: "Author name",
      };

      next();
    },
  };
});

describe('Author Endpoint', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });

    // Criação de um autor para os testes
    await request(app).post('/authors').send({
      name: "Author name",
    });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('POST /authors should create a new author and return success', async () => {
    const response = await request(app)
      .post('/authors')
      .send({
        name: "New Author",
      });
    expect(response.status).toBe(201);
  });

  test('POST /authors should fail when required fields are missing', async () => {
    const response = await request(app)
      .post('/authors')
      .send({
        name: "",
      });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  test('DELETE /authors/:id should delete an author and return success', async () => {
    const response = await request(app).delete('/authors/1');
    expect(response.status).toBe(200);
  });

  test('DELETE /authors/:id should fail when author does not exist', async () => {
    const response = await request(app).delete('/authors/999');
    expect(response.status).toBe(404);
  });

  test('GET /authors should return all authors', async () => {
    const response = await request(app).get('/authors');
    expect(response.status).toBe(200);
  });

  test('GET /authors/:id should fail when author does not exist', async () => {
    const response = await request(app).get('/authors/999');
    expect(response.status).toBe(404);
  });

  test('PUT /authors/:id should fail when author does not exist', async () => {
    const response = await request(app)
      .put('/authors/999')
      .send({
        name: "Updated Author Name",
      });
    expect(response.status).toBe(404);
  });

  test('PUT /authors/:id should fail when required fields are missing', async () => {
    const response = await request(app)
      .put('/authors/1')
      .send({
        name: "",
      });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});