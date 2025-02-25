import { Sequelize } from "sequelize";

const sequelize = new Sequelize("biblioteca", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
