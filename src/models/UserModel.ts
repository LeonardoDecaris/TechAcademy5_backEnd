import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { cp } from "fs";
import bcrypt from "bcrypt";
import FavoritesModel from "./FavoritesModel";
import ItemModel from "./ItemModel";

class UserModel extends Model {
  id: number | undefined;
  name: string | undefined;
  cpf: string | undefined;
  email: string | undefined;
  password: string | undefined;
  admin: boolean | undefined;

  public async hashPassword() {
    this.password = await bcrypt.hash(this.password!, 10);
  }

  public async validatePassword(password: string) : Promise<boolean> {
    return await bcrypt.compare(password, this.password!);
  }
}


UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    modelName: "UserModel",
    tableName: "users",
  }
);

UserModel.beforeCreate(async (user: UserModel) => {
  await user.hashPassword();
});

UserModel.beforeCreate(async (user: UserModel) => {
  if (user.changed("password")) {
    await user.hashPassword();
  }
});

UserModel.belongsToMany(ItemModel, {
  through: 'users_item',
  foreignKey: 'user_id',
  as: 'item'
})

ItemModel.belongsToMany(UserModel, {
  through: 'users_item',
  foreignKey: 'item_id',
  as: 'users'
})


UserModel.hasMany(FavoritesModel, {
    foreignKey: "user_id",
    as: "favorites"
});
FavoritesModel.belongsTo(UserModel, {
    foreignKey: "user_id",
    as: "user"
});









export default UserModel;
