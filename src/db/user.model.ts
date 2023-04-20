import { Model, DataTypes } from "sequelize";
import sequelize from "./db.setup"
import Book from "./book.model";


class User extends Model{}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    image:{
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    tableName: 'user',
    sequelize,
  }
);

User.hasMany(Book, {as: "books"});
Book.belongsTo(User);


export default User;
