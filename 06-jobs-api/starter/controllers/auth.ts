import { UserModel } from "../models/User";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors";
BadRequestError;

const register = async (req, res) => {
  const user = await UserModel.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  res.send("login user");
};

export { register, login };
