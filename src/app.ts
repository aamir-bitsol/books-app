import * as bodyParser  from 'body-parser';
import express, { Express, Request, Response } from 'express';
import Book from "./db/book.model.js"
import joi from "joi";

const app: Express = express();
const port: number = 3000;

const book_schema = joi.object({
  title: joi.string().min(1).required(),
  author: joi.string().min(1).required()
})

// using json parser
app.use(bodyParser.json());

// post request to create new books
app.post(
  "/",
  async(
    req: Request<never, never, {title: string, author: string}, never>,
    res: Response
  ) => {
    const { title, author } = req.body;
    const {error, value} = book_schema.validate({title, author});

    if(error){
      return res.status(400).send({
        message: "Invalid input values",
        success: false,
        error: true,
        data: null,
      })
    }

    const book = await Book.create(value);

    return res.status(200).send({
      message: "New record created successfully",
      success: true,
      error: false,
      data: book,
    });
  }
);

// get request to get all the books
app.get(
  "/", 
  async(req: Request<never, never, {title: string, author: string}, never>,
  res: Response
  ) => {
    const books: any = await Book.findAll();
    res.status(200).send({
      message: "Displaying all the data",
      success: true,
      error: false,
      data: books,
  });
});

// get request with id to get a specific book
app.get("/:id", 
  async(req: Request<never, never, {title: string, author: string}, never>, 
  res: Response
  ) => {
    const { id } = req.params;

    const book: any = await Book.findByPk(id);

    if (!book)
      return res.status(404).send({
        message: "Record not found",
        success: false,
        error: true,
        data: null,
      });

    return res
      .status(200)
      .send({ message: `Book# ${id}`, success: true, error: false, data: book });
});

// PUT request to update the specific book
app.put(
  "/:id", 
  async(req: Request<never, never, {title: string, author: string}, never>, 
  res: Response
  ) => {
    const { body, params } = req;
    const { id } = params;
    const { title, author } = body;

    const book: any = await Book.findByPk(id);
    const {error, value} = book_schema.validate({title, author});
    if(error){
      return res.status(400).send({
        message: "Invalid input values",
        success: false,
        error: true,
        data: null,
      })
    }
    if (!book)
      return res.status(404).send({
        message: "Record not found",
        success: false,
        error: true,
        data: null,
      });

    book.author = value.author;
    book.title = value.title;
    
    await book.save();

    return res.status(200).send({
      message: `Book# ${id} has been updated`,
      success: true,
      error: false,
      data: book,
  });
});

// Delete request to delete the specific book
app.delete("/:id", async(req: Request<never, never, {title: string, author: string}, never>, res: Response) => {
  const { id } = req.params;
  const book: any = await Book.findByPk(id);

  if (!book)
    return res.status(404).send({
      message: "Record not found",
      success: false,
      error: true,
      data: null,
    });

  await book.destroy();
  return res.status(200).send({
    message: `Record ${id} deleted successfully`,
    success: true,
    error: false,
    data: book,
  });
});

const start = async (): Promise<void> => {
  try {
    // await connection.sync({force: true});
    app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start()
