import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import AuthorModel from "./AuthorModel";
import CategoryModel from "./CategoryModel";

// Definição dos atributos do Item
interface ItemAttributes {
  id: number;
  name: string;
<<<<<<< Updated upstream
  time: string;
  directory: string;
  image: string;
=======
  time: string | null;
  directory: string;
  image: string  | null;
>>>>>>> Stashed changes
  category_id: number;
  author_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Definição dos atributos opcionais para criação
interface ItemCreationAttributes extends Optional<ItemAttributes, "id"> {}

// Classe do modelo Item
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

  // Propriedades para associações
  public category?: CategoryModel; // Associação com CategoryModel
  public author?: AuthorModel;     // Associação com AuthorModel
}

// Inicialização do modelo
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
<<<<<<< Updated upstream
      allowNull: false,
=======
      allowNull: true,
>>>>>>> Stashed changes
    },
    directory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
<<<<<<< Updated upstream
      allowNull: false,
=======
      allowNull: true,
>>>>>>> Stashed changes
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

// Definição das associações
ItemModel.belongsTo(CategoryModel, { as: "category", foreignKey: "category_id" });
ItemModel.belongsTo(AuthorModel, { as: "author", foreignKey: "author_id" });

export default ItemModel;