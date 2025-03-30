import { DataTypes, Model } from "sequelize";
import sequelize from '../config/database';
import CategoryModel from "./CategoryModel";
import FavoritesModel from "./FavoritesModel";
import AuthorModel from "./AuthorModel";

class ItemModel extends Model{
    id: number | undefined
    name: string | undefined
    time: string | undefined
    directory: string | undefined
    image: string | undefined
    category_id: number | undefined
    author_id: number | undefined
}

ItemModel.init(
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        time:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        directory:{
            type: DataTypes.STRING,
            allowNull: false
        },
        image:{
            type: DataTypes.STRING,
            allowNull: false
        },
        category_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        author_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'ItemModel',
        tableName: 'item'
    }
)

ItemModel.belongsTo(AuthorModel, {
    foreignKey: "author_id",
    as: "author"
});
AuthorModel.hasMany(ItemModel, {
    foreignKey: "author_id",
    as: "items"
});

ItemModel.belongsTo(CategoryModel, {
    foreignKey: "category_id",
    as: "category"
});
CategoryModel.hasMany(ItemModel, {
    foreignKey: "category_id",
    as: "items"
});

export default ItemModel;