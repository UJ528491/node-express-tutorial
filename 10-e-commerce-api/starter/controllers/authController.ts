import express from "express";
import User from "../models/User";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errors";

const register = async (req: any, res: express.Response) => {
  const { email } = req.body;
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json(user);
};
const login = async (req: any, res: express.Response) => {
  res.send("login user");
};
const logout = async (req: any, res: express.Response) => {
  res.send("logout user");
};

export { register, login, logout };
