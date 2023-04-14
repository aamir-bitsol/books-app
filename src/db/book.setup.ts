import { Sequelize } from "sequelize-typescript";

const sequelize: Sequelize = new Sequelize("booksdb", "postgres", "root", {
    host: "localhost",
    dialect: 'postgres',
    define: { timestamps: false },
    logging: false,

});


sequelize
  .authenticate()
  .then(() => console.log("DB Connected"))
  .catch((err: any) => console.log(err));

export default sequelize;