import { DataTypes } from "sequelize";
import sequelize from "./book.setup"


const Book = sequelize.define("books", {
    id: {
      type: DataTypes.NUMBER,
      allowNull: true,
      autoIncrement: true,
      primaryKey: true,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  export default Book;