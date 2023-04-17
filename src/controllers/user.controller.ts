import { Request, Response } from 'express'
import User from '../db/user.model';
import joi from "joi";

const userSchema = joi.object({
  name: joi.string().min(1).required(),
  age: joi.number().min(1).required(),
  contact: joi.string().min(6),
  address: joi.string().min(6),
  username: joi.string().min(6).max(50).required(),
  password: joi.string().min(8).max(50).required(),
  email: joi.string().min(5).max(22).required().email(),
});



export const getAllUsers = async (req: Request<never, never, { name: string; age: number, contact:string, address:string, username:string, password:string, email:string }, never>,
    res: Response) => {
      const users: any = await User.findAll();
      res.status(200).send({
        message: "Displaying all the data",
        success: true,
        error: false,
        data: users,
    });
}


export const getSpecificUser = async (req: Request<never, never, { name: string; age: number, contact:string, address:string, username:string, password:string, email:string }, never>,
    res: Response) => {
    const { id } = req.params;
    const user: any = await User.findByPk(id);
    
    if (!user){
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
}
      

export const deleteUser = async (req: Request<never, never, {name: string; age: number, contact:string, address:string, username:string, password:string, email:string }, never>,
    res: Response) => {
    const { id } = req.params;
    const user: any = await User.findByPk(id);
    
    if (!user){
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
}


export const createUser =  async (
    req: Request<never, never, { name: string, age: number, contact:string, address:string, username:string, password:string, email:string }, never>,
    res: Response
  ) => {
    const { name, age, contact, address, username, password, email } = req.body;
    const { error, value } = userSchema.validate({ name, age, contact, address, username, password, email});
    
    console.log(error)
    if (error) {
      return res.status(400).send({
        message: error,
        success: false,
        error: true,
        data: null,
      });
    }

    const user = await User.create(value);

    return res.status(200).send({
      message: "New record created successfully",
      success: true,
      error: false,
      data: user,
    });
  }

  
export const updateUser = async (
  req: Request<never, never, { name: string, age: number, contact:string, address:string, username:string, password:string, email:string }, never>,
  res: Response
) => {
  const { body, params } = req;
  const { id } = params;
  const { name, age, contact, address, username, password, email } = body;
  const user: any = await User.findByPk(id);
  const { error, value } = userSchema.validate({  name, age, contact, address, username, password, email });
  
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
}