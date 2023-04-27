import { Request, Response } from "express";
import User from "../db/user.model";
import joi from "joi";
import Book from "../db/book.model";

export const userSchema = joi.object({
  name: joi.string().min(1).required(),
  age: joi.number().min(1).required(),
  contact: joi.string().min(6),
  address: joi.string().min(6),
  username: joi.string().min(6).max(50).required(),
  password: joi.string().min(8).max(50).required(),
  email: joi.string().min(5).max(22).required().email(),
  image: joi.string(),
});

export const getAllUsers = async (
  req: Request<
    never,
    never,
    {
      name: string;
      age: number;
      contact: string;
      address: string;
      username: string;
      password: string;
      email: string;
    },
    { page: string; pageSize: string },
    never
  >,
  res: Response
) => {
  const page: number = parseInt(req.query.page) || 1;
  const pageSize: number = parseInt(req.query.pageSize) || 10;
  const offset: number = (page - 1) * pageSize;
  const limit: number = pageSize;
  const totalUsers: number = await User.count();
  const totalPages: number = Math.ceil(totalUsers / pageSize);
  const users: any = await User.findAll({
    limit,
    offset,
    include: [{ model: Book, as: "books" }],
  });

  res.status(200).send({
    message: "Displaying all the data",
    success: true,
    error: false,
    data: users,
    page,
    pageSize,
    totalUsers,
    totalPages,
  });
};

export const getSpecificUser = async (
  req: Request<
    never,
    never,
    {
      name: string;
      age: number;
      contact: string;
      address: string;
      username: string;
      password: string;
      email: string;
    },
    never
  >,
  res: Response
) => {
  const { id } = req.params;
  const user: any = await User.findOne({
    where: { id },
    include: [
      { model: Book, as: "books", attributes: { exclude: ["UserId"] } },
    ],
  });
  if (!user) {
    return res.status(404).send({
      message: "Record not found",
      success: false,
      error: true,
      data: null,
    });
  }

  return res.status(200).send({
    message: `User# ${id}`,
    success: true,
    error: false,
    data: user,
  });
};

export const deleteUser = async (
  req: Request<
    never,
    never,
    {
      name: string;
      age: number;
      contact: string;
      address: string;
      username: string;
      password: string;
      email: string;
    },
    never
  >,
  res: Response
) => {
  const { id } = req.params;
  const user: any = await User.findByPk(id);

  if (!user) {
    return res.status(404).send({
      message: "Record not found",
      success: false,
      error: true,
      data: null,
    });
  }

  await user.destroy();
  return res.status(200).send({
    message: `Record ${id} deleted successfully`,
    success: true,
    error: false,
    data: user,
  });
};

export const updateUser = async (
  req: Request<
    never,
    never,
    {
      name: string;
      age: number;
      contact: string;
      address: string;
      username: string;
      password: string;
      email: string;
    },
    never
  >,
  res: Response
) => {
  const { body, params } = req;
  const { id } = params;
  const { name, age, contact, address, username, password, email } = body;
  const user: any = await User.findByPk(id);
  const { error, value } = userSchema.validate({
    name,
    age,
    contact,
    address,
    username,
    password,
    email,
  });

  if (error) {
    return res.status(400).send({
      message: error,
      success: false,
      error: true,
      data: null,
    });
  }

  if (!user)
    return res.status(404).send({
      message: "Record not found",
      success: false,
      error: true,
      data: null,
    });

  user.name = value.name;
  user.age = value.age;
  user.contact = value.contact;
  user.address = value.address;
  user.username = value.username;
  user.password = value.password;
  user.email = value.email;

  await user.save();

  return res.status(200).send({
    message: `User# ${id} has been updated`,
    success: true,
    error: false,
    data: user,
  });
};
