import { Request, Response } from "express";
import User from "../db/user.model";
import {userSchema} from "./user.controller";
import { sign } from "jsonwebtoken";
import { hashSync, compareSync } from "bcryptjs";

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
      },
      never
    >,
    res: Response
  ) => {
    const { name, age, contact, address, username, password, email } = req.body;
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

    const user = await User.create({
        ...value, password: hashSync(password, 8)
    });
  
    return res.status(200).send({
      message: "New record created successfully",
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

    const user: any = await User.findOne({ where: { username } });
  
    if (!user) {
      return res.status(400).send({
        message: "invalid username",
        success: false,
        error: true,
        data: null,
      });
    }
  
    const passwordIsValid = compareSync(password, user.password);
    const secret_key = process.env.MY_SECRET_KEY;

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Password" });
    }
    const token = sign({ id: user.id }, secret_key as string);
  
    return res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      token,
      message: "logged in successfully",
    });
  };
  