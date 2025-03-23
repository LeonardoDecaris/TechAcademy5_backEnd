// filepath: src/index.ts
import express from "express";
import sequelize from "./config/database";
import authorRoutes from './routes/authorRoutes';
import categoryRoutes from './routes/categoryRoutes';
import favoritesRoutes from './routes/favoritesRoutes';
import itemRoutes from './routes/itemRoutes';
import userRoutes from './routes/userRoutes';
import loginRoutes from './routes/loginRoutes';
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swaggerConfig";
import "./models/ItemModel"; 
import "./models/UserModel";
import "./models/FavoritesModel";
import "./models/CategoryModel";
import "./models/AuthorModel";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Rota para a documentação Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(authorRoutes);
app.use(categoryRoutes);
app.use(favoritesRoutes);
app.use(itemRoutes);
app.use(userRoutes);
app.use(loginRoutes)

// Sync Database
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database encontrado");
  })
  .catch((error) => {
    console.log("Database não encontrado");
  });

app.listen(port, () => {
  console.log("server is running on port", port);
});