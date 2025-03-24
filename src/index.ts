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

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(authorRoutes);
app.use(categoryRoutes);
app.use(favoritesRoutes);
app.use(itemRoutes);
app.use(userRoutes);
app.use(loginRoutes);

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