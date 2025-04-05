import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import AuthorModel from "./AuthorModel";
import CategoryModel from "./CategoryModel";

interface ItemAttributes {
  id: number;
  name: string;
  time: string | null;
  directory: string;
  image: string  | null;
  category_id: number;
  author_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ItemCreationAttributes extends Optional<ItemAttributes, "id"> {}

class ItemModel extends Model<ItemAttributes, ItemCreationAttributes> implements ItemAttributes {
  public id!: number;
  public name!: string;
  public time!: string;
  public directory!: string;
  public image!: string;
  public category_id!: number;
  public author_id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public category?: CategoryModel;
  public author?: AuthorModel; 
}

ItemModel.init(
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
    time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    directory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ItemModel",
    tableName: "item",
  }
);

ItemModel.belongsTo(CategoryModel, { as: "category", foreignKey: "category_id" });
ItemModel.belongsTo(AuthorModel, { as: "author", foreignKey: "author_id" });

export default ItemModel;