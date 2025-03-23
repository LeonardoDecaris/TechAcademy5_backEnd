import { DataTypes, Model } from "sequelize";
import sequelize from '../config/database';
import CategoryModel from "./CategoryModel";
// import FavoritesModel from "./FavoritesModel.tsss";
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

// ItemModel.belongsTo(CategoryModel, {
//     foreignKey: 'category_id', 
//     as: 'category'
// })
// CategoryModel.hasMany(ItemModel, {
//     foreignKey: 'category_id',
//     as: 'item'
// })

// ItemModel.belongsTo(FavoritesModel, {
//     foreignKey: 'favorites_id', 
//     as: 'favorite'
// })
// FavoritesModel.hasMany(ItemModel, {
//     foreignKey: 'favorites_id',
//     as: 'item'
// })

// ItemModel.belongsTo(AuthorModel, {
//     foreignKey: 'author_id', 
//     as: 'author'
// })
// AuthorModel.hasMany(ItemModel, {
//     foreignKey: 'author_id',
//     as: 'item'
// })



ItemModel.belongsTo(AuthorModel, {
    foreignKey: "author_id",
    as: "author"
});
AuthorModel.hasMany(ItemModel, {
    foreignKey: "author_id",
    as: "items"
});







// UserModel.hasMany(FavoritesModel, {
//     foreignKey: "user_id",
//     as: "favorites"
// });
// FavoritesModel.belongsTo(UserModel, {
//     foreignKey: "user_id",
//     as: "user"
// });

ItemModel.belongsTo(CategoryModel, {
    foreignKey: "category_id",
    as: "category"
});
CategoryModel.hasMany(ItemModel, {
    foreignKey: "category_id",
    as: "items"
});









// // Relacionamento Item - Favorites (muitos-para-um ou many-to-many, conforme o domínio)
// // No exemplo abaixo, usamos many-to-one. Se desejar many-to-many, use belongsToMany e defina a tabela intermediária.
// ItemModel.belongsTo(FavoritesModel, {
//     foreignKey: "favorites_id",
//     as: "favorite"
// });
// FavoritesModel.hasMany(ItemModel, {
//     foreignKey: "favorites_id",
//     as: "items" // Alterado para alias único
// });





export default ItemModel;