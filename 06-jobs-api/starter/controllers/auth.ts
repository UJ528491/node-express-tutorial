import { UserModel } from "../models/User";
import { StatusCodes } from "http-status-codes";

const register = async (req, res) => {
  try {
    const user = await UserModel.create({ ...req.body });
    res.status(StatusCodes.CREATED).json(user);
  } catch (error) {
    console.log(error);
    res.send("err!");
  }
};

const login = async (req, res) => {
  res.send("login user");
};

export { register, login };
