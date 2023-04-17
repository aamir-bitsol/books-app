import express, { Express, Router } from "express";
import * as bodyParser from "body-parser";
import dotenv  from "dotenv"
import sequelize from "./db/db.setup";

import bookRoutes from "./routes/book.routes";
import usersRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

dotenv.config()

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/books", bookRoutes);
app.use("/users", usersRoutes);
app.use("/auth", authRoutes);


const start = async (): Promise<void> => {
  try {
    await sequelize.sync({force:true});
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();
