import request from "supertest";
import app from "../src/app";
import sequelize from "../src/config/database";

beforeAll(async () => {
  await sequelize.sync({ force: true });

  // Criando um usuário válido para os testes de login
  const userResponse = await request(app).post("/users").send({
    name: "João",
    cpf: "847.671.250-22",
    email: "joao@exemplo.com",
    password: "senha123",
  });

  expect(userResponse.status).toBe(201);

  // Criando categorias e autores antes de testar endpoints de itens
  const categoryResponse = await request(app)
    .post("/categories")
    .send({ name: "Categoria 1" });
  const authorResponse = await request(app)
    .post("/authors")
    .send({ name: "Autor 1" });

  expect(categoryResponse.status).toBe(201);
  expect(authorResponse.status).toBe(201);

  await request(app).post("/items").send({
    name: "Meu Item",
    time: "03:15",
    directory: "path/to/directory",
    image: "path/to/image",
    category_id: 1,
    author_id: 1,
  });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Login Endpoint", () => {
  test("POST /login should return a token for valid credentials", async () => {
    const response = await request(app).post("/login").send({
      email: "joao@exemplo.com",
      password: "senha123",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  test("POST /login should fail for invalid credentials", async () => {
    const response = await request(app).post("/login").send({
      email: "joao@exemplo.com",
      password: "senhaErrada",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "Email or password are invalid"
    );
  });

  test("POST /login should fail when email is missing", async () => {
    const response = await request(app).post("/login").send({
      password: "senha123",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Email is required");
  });

  test("POST /login should fail when password is missing", async () => {
    const response = await request(app).post("/login").send({
      email: "joao@exemplo.com",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Password is required");
  });
});

describe("Item POST Endpoint", () => {
  test("POST /items should create a new item and return success", async () => {
    const response = await request(app).post("/items").send({
      name: "Novo Item",
      time: "04:20",
      directory: "new/path",
      image: "new/image",
      category_id: 1,
      author_id: 1,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });
});

describe("Item GET Endpoint", () => {
  test("GET /items should return a list of items", async () => {
    const response = await request(app)
      .get("/items")
      .set({ Authorization: "TestToken" });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test("GET /items/:id should return an item by id", async () => {
    const response = await request(app)
      .get("/items/1")
      .set({ Authorization: "TestToken" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name");
  });
});
