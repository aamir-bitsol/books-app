import express, { Express, Router} from 'express';
import sequelize from './db/db.setup';
import * as bodyParser from "body-parser";

const booksRouter:Router = require('./routes/books')
const usersRouter:Router = require('./routes/users')
const app: Express = express();
const port: number = 3000;


app.use(bodyParser.json());
app.use("/books", booksRouter)
app.use("/users", usersRouter)

const start = async (): Promise<void> => {
  try {
    await sequelize.sync({force: true});
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start()
