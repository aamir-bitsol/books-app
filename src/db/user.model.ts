import { DataTypes } from "sequelize";
import sequelize from "./db.setup"


const User = sequelize.define("users", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    contact: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    username: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
  });

export default User;