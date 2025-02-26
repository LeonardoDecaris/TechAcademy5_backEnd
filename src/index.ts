import express from "express";
import sequelize from "./config/database";
import UserModel from "./models/UserModel";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  const users = await UserModel.findAll();
  res.json(users);
});

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
