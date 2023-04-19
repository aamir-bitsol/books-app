import { Sequelize } from "sequelize-typescript";

const sequelize: Sequelize = new Sequelize("booksdb", "postgres", "root", {
  host: "localhost",
  dialect: "postgres",
  logging: true,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err: any) => console.log(err));

export default sequelize;
