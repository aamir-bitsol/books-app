import { Request, Response } from 'express'
import Book from '../db/book.model';
import joi from "joi";

const book_schema = joi.object({
  title: joi.string().min(1).required(),
  author: joi.string().min(1).required(),
});


export const getAllBooks = async (req: Request<never, never, {title: string, author: string}, never>,
    res: Response) => {
      const books: any = await Book.findAll();
      res.status(200).send({
        message: "Displaying all the data",
        success: true,
        error: false,
        data: books,
    });
}


export const getSpecificBooks = async (req: Request<never, never, {title: string, author: string}, never>,
    res: Response) => {
    const { id } = req.params;
    const book: any = await Book.findByPk(id);
    
    if (!book){
        return res.status(404).send({
        message: "Record not found",
        success: false,
        error: true,
        data: null,
        });
    }

    return res.status(200).send({
        message: `Book# ${id}`,
        success: true,
        error: false,
        data: book,
    });
}
      

export const deleteBook = async (req: Request<never, never, {title: string, author: string}, never>,
    res: Response) => {
    const { id } = req.params;
    const book: any = await Book.findByPk(id);
    
    if (!book){
        return res.status(404).send({
        message: "Record not found",
        success: false,
        error: true,
        data: null,
        });
    }

    await book.destroy();
    return res.status(200).send({
      message: `Record ${id} deleted successfully`,
      success: true,
      error: false,
      data: book,
    });
}


export const createBook =  async (
    req: Request<never, never, { title: string; author: string }, never>,
    res: Response
  ) => {
    const { title, author } = req.body;
    const { error, value } = book_schema.validate({ title, author });

    if (error) {
      return res.status(400).send({
        message: "Invalid input values",
        success: false,
        error: true,
        data: null,
      });
    }

    const book = await Book.create(value);

    return res.status(200).send({
      message: "New record created successfully",
      success: true,
      error: false,
      data: book,
    });
  }

  
export const updateBook = async (
  req: Request<never, never, { title: string; author: string }, never>,
  res: Response
) => {
  const { body, params } = req;
  const { id } = params;
  const { title, author } = body;

  const book: any = await Book.findByPk(id);
  const { error, value } = book_schema.validate({ title, author });
  if (error) {
    return res.status(400).send({
      message: "Invalid input values",
      success: false,
      error: true,
      data: null,
    });
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
}