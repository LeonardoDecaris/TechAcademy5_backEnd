import { Sequelize } from "sequelize";

const sequelize = new Sequelize("harmonicsound_teste", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
