import { DataTypes, Model } from "sequelize";
import sequelize from '../config/database';
import UserModel from "./UserModel";
import ItemModel from "./ItemModel";

class FavoritesModel extends Model{
    id: number | undefined
    user_id: number | undefined
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
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "FavoritesModel",
        tableName: "favorites"
    }
)

UserModel.hasMany(FavoritesModel, {
    foreignKey: "user_id",
    as: "favorites"
});

FavoritesModel.belongsTo(UserModel, {
    foreignKey: "user_id",
    as: "favorites"
});

export default FavoritesModel;