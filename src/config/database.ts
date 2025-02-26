import { Sequelize } from "sequelize";

const sequelize = new Sequelize("harmonicsound", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
