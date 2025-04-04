import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import authorRoutes from './routes/authorRoutes';
import categoryRoutes from './routes/categoryRoutes';
import favoritesRoutes from './routes/favoritesRoutes';
import itemRoutes from './routes/itemRoutes';
import userRoutes from './routes/userRoutes';
import loginRoutes from './routes/loginRoutes';
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swaggerConfig";

const app = express();

// CORS CONFIG
app.use(cors());

// Middleware para parsing de JSON com limite aumentado
app.use(express.json({ limit: "50mb" })); // Aumenta o limite para 50 MB

// Configuração da pasta "uploads"
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir); // Cria a pasta "uploads" se ela não existir
  console.log("Pasta 'uploads' criada com sucesso.");
}

// Servir arquivos estáticos da pasta "uploads"
app.use("/uploads", express.static(uploadsDir));

// Rota inicial
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Configuração de rotas
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(authorRoutes);
app.use(categoryRoutes);
app.use(favoritesRoutes);
app.use(itemRoutes);
app.use(userRoutes);
app.use(loginRoutes);

export default app;

