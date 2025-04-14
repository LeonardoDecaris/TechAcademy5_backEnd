import app from "../src/app";
import sequelize from "../src/config/database";
import request from "supertest";

jest.mock("../src/middleware/authMiddleware", () => {
  return {
    authMiddleware: (req: any, res: any, next: any) => {
      req.body.item = {
        id: 1,
        name: "Meu Item",
        time: "03:15",
        directory: "path/to/directory",
        image: "path/to/image",
        category_id: 1,
        author_id: 1,
      };
      next();
    },
  };
});

beforeAll(async () => {
  await sequelize.sync({ force: true });

  await request(app).post("/categories").send({ name: "Categoria 1" });
  await request(app).post("/authors").send({ name: "Autor 1" });

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

describe("Item POST Endpoint", () => {
  test("POST /items should create a new item and return success", async () => {
    const response = await request(app).post("/items").send({
      name: "Meu Item",
      time: "03:15",
      directory: "path/to/directory",
      image: "path/to/image",
      category_id: 1,
      author_id: 1,
    });
    expect(response.status).toBe(201);
  });
});

describe("Item GET Endpoint", () => {
  test("GET /items should return a list of items", async () => {
    const response = await request(app)
      .get("/items")
      .set({ Authorization: "TestToken" });

    expect(response.status).toBe(200);
  });

  test("GET /items/:id should return a item by id", async () => {
    const response = await request(app)
      .get("/items/1")
      .set({ Authorization: "TestToken" });

    expect(response.status).toBe(200);
  });
});
