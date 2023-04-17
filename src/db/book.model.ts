import { DataTypes } from "sequelize";
import sequelize from "./db.setup"


const Book = sequelize.define("books", {
    id: {
      type: DataTypes.INTEGER,
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