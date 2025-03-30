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

  // Métodos gerados pelo Sequelize para associações
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