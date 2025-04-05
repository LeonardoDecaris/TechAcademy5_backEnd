import sequelize from "./config/database";
import app from "./app";

const port = 3000;

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Database connection error:", error);
  });

app.listen(port, () => {
  console.log("Server is running on port", port);
});