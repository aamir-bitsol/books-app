import { Request, Response } from 'express'
import Book from '../db/book.model';
import joi from "joi";
import User from '../db/user.model';
import passport from '../passport/strategy';

const book_schema = joi.object({
  title: joi.string().min(1).required(),
  UserId: joi.number().required(),
});


export const getAllBooks = async (req: Request<never, never, {title: string, author: number}, never>,
    res: Response) => {
      const books: any = await Book.findAll({include:User});

      res.status(200).send({
        message: "Displaying all the data",
        success: true,
        error: false,
        data: books,
    });
}


export const getSpecificBook = async (req: Request<never, never, never, never>,
    res: Response) => {
    const { id } = req.params;
    const book: any = await Book.findOne({
      where:{id},
      include:[{model: User, as: "User"}]
    });
    
    if (!book){
        return res.status(404).send({
        message: "Record not found",
        success: false,
        error: true,
        data: null,
        });
    }
    delete book.UserId;

    return res.status(200).send({
        message: `Book# ${id}`,
        success: true,
        error: false,
        data: book,
    });
}
      

export const deleteBook = async (req: Request<never, never, never, never>,
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
    req: Request<never, never, { title: string; UserId: number }, never>,
    res: Response
  ) => {
    const { title, UserId } = req.body;
    const { error, value } = book_schema.validate({ title, UserId });
    const isUser: any = await User.findByPk(UserId);
   
    if(!isUser){
      return res.status(400).send({
        message: "Invalid User ID",
        success: false,
        error: true,
        data: null,
      });
    }

    if (error) {
      return res.status(400).send({
        message: error,
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
  req: Request<never, never, { title: string, UserId: number }, never>,
  res: Response
) => {
  const { body, params } = req;
  const { id } = params;
  const { title, UserId } = body;

  const book: any = await Book.findByPk(id);
  const { error, value } = book_schema.validate({ title, UserId });

  const isUser: any = await User.findByPk(UserId);
   
  if(!isUser){
    return res.status(400).send({
      message: "Invalid User ID",
      success: false,
      error: true,
      data: null,
    });
  }

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

  book.title = value.title;
  book.UserId = value.UserId;

  await book.save();

  return res.status(200).send({
    message: `Book# ${id} has been updated`,
    success: true,
    error: false,
    data: book,
  });
}
