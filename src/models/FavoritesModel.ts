import { Model, DataTypes, Association } from "sequelize";
import sequelize from "../config/database";
import ItemModel from "./ItemModel";

class FavoritesModel extends Model {
  public id!: number;
  public name!: string;
  public user_id!: number;

  // Association methods
  public addItems!: (items: ItemModel[] | number[]) => Promise<void>;

  // Define associations
  public static associations: {
    items: Association<FavoritesModel, ItemModel>;
  };
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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Favorites",
  }
);

// Define associations
FavoritesModel.belongsToMany(ItemModel, {
  through: "favorites_item", // Nome da tabela intermediária
  foreignKey: "favorite_id", // Chave estrangeira que referencia a tabela de favoritos
  as: "items", // Nome da associação
});

ItemModel.belongsToMany(FavoritesModel, {
  through: "favorites_item", // Nome da tabela intermediária
  foreignKey: "item_id", // Chave estrangeira que referencia a tabela de itens
  as: "favorites", // Nome da associação
});

export default FavoritesModel;