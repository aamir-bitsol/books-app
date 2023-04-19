import { Model, DataTypes } from "sequelize";
import sequelize from "./db.setup";

class Book extends Model {}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "book",
    sequelize,
  }
);


export default Book;
