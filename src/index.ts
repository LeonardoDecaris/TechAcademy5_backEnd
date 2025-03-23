import express from "express";
import sequelize from "./config/database";
import authorRoutes from './routes/authorRoutes'
import categoryRoutes from './routes/categoryRoutes'
// import favoritesRoutes from './routes/favoritesRoutes.tsss'
import itemRoutes from './routes/itemRoutes'
import userRoutes from './routes/userRoutes'
import "./models/ItemModel"; // Garante que o modelo seja carregado e registrado
import "./models/UserModel";
// import "./models/FavoritesModel.tsss";
import "./models/CategoryModel";
import "./models/AuthorModel";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json())
app.use(authorRoutes)
app.use(categoryRoutes)
// app.use(favoritesRoutes)
app.use(itemRoutes)
app.use(userRoutes)

// Sync Database
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database encontrado");
  })
  .catch((error) => {
    console.log("Database não encontrado");
  });

app.listen(port, () => {
  console.log("server is running on port", port);
});
