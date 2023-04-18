import { Model, DataTypes } from "sequelize";
import sequelize from "./db.setup";
import User from "./user.model";

class Book extends Model {}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      // references: {
      //   model: User, // 'Movies' would also work
      //   key: "id",
      // },
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

// Book.belongsTo(User);

export default Book;
