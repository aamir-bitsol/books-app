import express, { Express, Router} from 'express';

const bookRouter:Router = require('./routes/books')
const app: Express = express();
const port: number = 3000;

app.use("/books", bookRouter)

const start = async (): Promise<void> => {
  try {
    // await connection.sync({force: true});
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start()
