import express from "express";
import User from "../models/User";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errors";
import { attachCookiesToResponse, createTokenUser } from "../utils";

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

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req: any, res: express.Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError("Email and password are required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid credentials");
  }
  // compare password with hash
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new CustomError.UnauthenticatedError("Invalid password");
  }
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};
const logout = async (req: any, res: express.Response) => {
  const fiveSeconds = 1000 * 5;
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + fiveSeconds),
  });
  res.status(StatusCodes.OK).json({ message: "Logged out" });
};

export { register, login, logout };
