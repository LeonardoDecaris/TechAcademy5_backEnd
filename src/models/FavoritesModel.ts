import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import ItemModel from "./ItemModel";

class FavoritesModel extends Model {
    id: number | undefined;
    name: string | undefined;
    user_id: number | undefined;
}

FavoritesModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: "FavoritesModel",
        tableName: "favorites"
    }
);

// Configuração da associação muitos-para-muitos
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