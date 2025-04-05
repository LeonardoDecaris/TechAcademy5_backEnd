
import express from "express";
import cors from "cors";
import authorRoutes from './routes/authorRoutes';
import categoryRoutes from './routes/categoryRoutes';
import favoritesRoutes from './routes/favoritesRoutes';
import itemRoutes from './routes/itemRoutes';
import userRoutes from './routes/userRoutes';
import loginRoutes from './routes/loginRoutes';
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swaggerConfig";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(authorRoutes);
app.use(categoryRoutes);
app.use(favoritesRoutes);
app.use(itemRoutes);
app.use(userRoutes);
app.use(loginRoutes);

export default app;

