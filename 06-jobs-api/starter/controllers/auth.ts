import { UserModel } from "../models/User";
import { StatusCodes } from "http-status-codes";

const register = async (req, res) => {
  console.log(req.body);
  console.log(UserModel);
  const user = await UserModel.create({
    ...req.body,
  });
  console.log(user);
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  res.send("login user");
};

export { register, login };
