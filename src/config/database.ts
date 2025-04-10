import { Sequelize } from "sequelize";
const isTest = process.env.NODE_ENV === "test";

const sequelize = new Sequelize(
  isTest ? "harmonicsound_test" : "harmonicsound_homolog",
  "root",
  "",
  {
    host: "localhost",
    dialect: "mysql",
    logging: !isTest,
  }
);

if (process.env.NODE_ENV !== "test") {
  (async () => {
    try {
      await sequelize.sync({ alter: true });
      console.log("Banco de dados sincronizado.");
    } catch (error) {
      console.error("Erro ao sincronizar o banco de dados:", error);
    }
  })();
}

export default sequelize;
