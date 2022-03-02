import express from "express";
import User from "../models/User";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errors";
import { attachCookiesToResponse } from "../utils";

const register = async (req: any, res: express.Response) => {
  const { email, name, password } = req.body;
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }
  // first registered user is an admin
  const isFirstUser = (await User.countDocuments({})) === 0;
  const role = isFirstUser ? "admin" : "user";

  const user = await User.create({ email, name, password, role });

  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req: any, res: express.Response) => {
  res.send("login user");
};
const logout = async (req: any, res: express.Response) => {
  res.send("logout user");
};

export { register, login, logout };
