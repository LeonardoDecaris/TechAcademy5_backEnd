import { DataTypes, Model } from "sequelize";
import sequelize from '../config/database';
import CategoryModel from "./CategoryModel";
import FavoritesModel from "./favoritesModel";
import AuthorModel from "./AuthorModel";
import UserModel from "./UserModel";

class ItemModel extends Model{
    id: number | undefined
    name: string | undefined
    time: number | undefined
    directory: string | undefined
    image: string | undefined
    category_id: number | undefined
    favorites_id: number | undefined
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
            type: DataTypes.TIME,
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
        favorites_id:{
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

ItemModel.belongsTo(CategoryModel, {
    foreignKey: 'category_id', 
    as: 'item'
})
CategoryModel.hasMany(ItemModel, {
    foreignKey: 'category_id',
    as: 'item'
})

ItemModel.belongsTo(FavoritesModel, {
    foreignKey: 'favorites_id', 
    as: 'item'
})
FavoritesModel.hasMany(ItemModel, {
    foreignKey: 'favorites_id',
    as: 'item'
})

ItemModel.belongsTo(AuthorModel, {
    foreignKey: 'author_id', 
    as: 'item'
})
AuthorModel.hasMany(ItemModel, {
    foreignKey: 'author_id',
    as: 'item'
})

export default ItemModel;