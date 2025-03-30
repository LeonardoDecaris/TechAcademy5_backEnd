import { Sequelize } from "sequelize";

const sequelize = new Sequelize("harmonicsound_homolog", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
