import path, { resolve } from "path";
import { Request, Response } from "express";
import User from "../db/user.model";
import { userSchema } from "./user.controller";
import { sign } from "jsonwebtoken";
import { hashSync, compareSync } from "bcryptjs";
import Book from "../db/book.model";
import { writeFile } from "fs";

export const signUp = async (
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
      image: string;
    },
    never
  >,
  res: Response
) => {
  const { name, age, contact, address, username, password, email, image } =
    req.body;
  const { error, value } = userSchema.validate({
    name,
    age,
    contact,
    address,
    username,
    password,
    email,
    image,
  });

  if (error) {
    return res.status(400).send({
      message: error,
      success: false,
      error: true,
      data: null,
    });
  }

  let filepath: string = "";
  if (image) {
    const base64Data: any = image.split("base64,").pop();
    filepath = `${resolve()}/public/images/image_${Date.now()}.png`;
    writeFile(filepath, base64Data, "base64", function (err) {
      console.log(err);
    });
  } else if (req.file) {
    filepath = req.file.filename;
  }

  const user: any = await User.create({
    ...value,
    password: hashSync(password, 8),
    image: filepath,
  });

  return res.status(200).send({
    message: "New User created successfully",
    success: true,
    error: false,
    data: user,
  });
};

export const signIn = async (
  req: Request<never, never, { username: string; password: string }, never>,
  res: Response
) => {
  const { body } = req;
  const { username, password } = body;

  const user: any = await User.findOne({
    where: { username },
    attributes: ["id", "username", "email", "password", "image"],
    include: [
      {
        model: Book,
        as: "books",
        required: false,
      },
    ],
  });

  if (!user) {
    return res.status(400).send({
      message: "invalid username",
      success: false,
      error: true,
      data: null,
    });
  }

  const passwordIsValid: boolean = compareSync(password, user.password);
  const secret_key = process.env.MY_SECRET_KEY;

  if (!passwordIsValid) {
    return res.status(401).send({ message: "Invalid Password" });
  }

  const token: string = sign(
    { id: user.id, username: user.username, email: user.email },
    secret_key as string
  );
  return res.status(200).send({
    success: true,
    error: false,
    user,
    token,
    message: "logged in successfully",
  });
};
