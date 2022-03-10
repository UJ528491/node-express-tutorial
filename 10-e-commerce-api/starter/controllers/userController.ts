import express from "express";
import User from "../models/User";
import StatusCodes from "http-status-codes";
import CustomError from "../errors";
import { attachCookiesToResponse, createTokenUser } from "../utils";

const getAllUsers = async (req: any, res: express.Response) => {
  console.log(req.user);

  const users = await User.find({ role: "user" }).select("-password");
  if (!users) {
    throw new CustomError.NotFoundError("No users found");
  }
  res.status(StatusCodes.OK).send({ users });
};

const getSingleUser = async (req: any, res: express.Response) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    throw new CustomError.NotFoundError(
      `User not found with id : ${req.params.id}`
    );
  }
  res.status(StatusCodes.OK).send({ user });
};

const showCurrentUser = async (req: any, res: express.Response) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUserPassword = async (req: any, res: express.Response) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError("Password is required");
  }
  const user = await User.findOne({ _id: req.user.userId });
  // compare old password with hash
  const isPasswordValid = await user.comparePassword(oldPassword);
  if (!isPasswordValid) {
    throw new CustomError.UnauthenticatedError("Invalid old password");
  }
  user.password = newPassword;
  await user.save();

  res.status(StatusCodes.OK).json({ msg: "Password updated successfully" });
};

// upadateUser with user.save()
const updateUser = async (req: any, res: express.Response) => {
  const { name, email } = req.body;
  if (!name || !email) {
    throw new CustomError.BadRequestError("Name and email are required");
  }
  const user = await User.findOne({ _id: req.user.userId });
  user.name = name;
  user.email = email;
  await user.save();

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

// updateUser with findOneAndUpdate
// const updateUser = async (req: any, res: express.Response) => {
//   const { name, email } = req.body;
//   if (!name || !email) {
//     throw new CustomError.BadRequestError("Name and email are required");
//   }
//   const user = await User.findOneAndUpdate(
//     { _id: req.user.userId },
//     { email, name },
//     { new: true, runValidators: true }
//   );
//   const tokenUser = createTokenUser(user);
//   attachCookiesToResponse({ res, user: tokenUser });
//   res.status(StatusCodes.OK).json({ user: tokenUser });
// };

export {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
