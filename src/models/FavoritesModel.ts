import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

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
        user_id: {
            type: DataTypes.INTEGER, // Alterado de STRING para INTEGER
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "FavoritesModel",
        tableName: "favorites"
    }
);

export default FavoritesModel;