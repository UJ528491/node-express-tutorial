import { UserModel } from "../models/User";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors";
BadRequestError;
import bcrypt from "bcryptjs";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPw = await bcrypt.hash(password, salt);
  const tempUser = { name, email, password: hashedPw };

  const user = await UserModel.create({ ...tempUser });
  res.status(StatusCodes.CREATED).json(user);
};

const login = async (req, res) => {
  res.send("login user");
};

export { register, login };
