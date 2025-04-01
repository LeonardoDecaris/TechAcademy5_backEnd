import sequelize from "./config/database";
import app from "./app";

const port = 3000;

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