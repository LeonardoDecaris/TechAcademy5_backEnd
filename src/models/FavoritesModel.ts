import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";
import ItemModel from "./ItemModel";
interface FavoritesAttributes {
  id: number;
  name: string;
}

interface FavoritesCreationAttributes extends Optional<FavoritesAttributes, 'id'> {}

class FavoritesModel extends Model<FavoritesAttributes, FavoritesCreationAttributes> {
  public id!: number;
  public name!: string;

  public addItems!: (items: ItemModel[] | ItemModel) => Promise<void>;
  public getItems!: () => Promise<ItemModel[]>;
  public setItems!: (items: ItemModel[] | ItemModel) => Promise<void>;
  public removeItems!: (items: ItemModel[] | ItemModel) => Promise<void>;
}

FavoritesModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Favorites",
  }
);

FavoritesModel.belongsToMany(ItemModel, {
  through: "favorites_item",
  foreignKey: "favorite_id",
  as: "items",
});

ItemModel.belongsToMany(FavoritesModel, {
  through: "favorites_item",
  foreignKey: "item_id",
  as: "favorites",
});

export default FavoritesModel;