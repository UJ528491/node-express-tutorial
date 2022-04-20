import User from "../models/User";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errors";
import {
  attachCookiesToResponse,
  createTokenUser,
  sendVerificationEmail,
} from "../utils";
import crypto from "crypto";
import Token from "../models/Token";
import express from "express";

interface requestUser extends express.Request {
  user: { userId: string };
}

const register = async (req: requestUser, res: express.Response) => {
  const { email, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }

  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const verificationToken = crypto.randomBytes(40).toString("hex");

  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken,
  });

  const origin = "http://localhost:5000";

  // const tempOrigin = req.get('origin')
  // const protocol = req.protocol
  // const host = req.get('host')
  // const forwardedHost = req.get('x-forwarded-host')
  // const forwardedProtocol = req.get('x-forwarded-proto')

  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken,
    origin,
  });
  // send verification token back only while testing in postman!!
  res.status(StatusCodes.CREATED).json({
    msg: "Success! Please check your email for verification token",
    verificationToken: user.verificationToken,
  });

  // const tokenUser = createTokenUser(user);
  // attachCookiesToResponse({ res, user: tokenUser });
  // res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const verifyEmail = async (req: requestUser, res: express.Response) => {
  const { verificationToken, email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.BadRequestError("Invalid user");
  }
  if (user.verificationToken !== verificationToken) {
    throw new CustomError.BadRequestError("Invalid verification token");
  }
  user.isVerified = true;
  user.verivied = Date.now();
  user.verificationToken = "";

  await user.save();

  res.status(StatusCodes.OK).json({ msg: "Email verified!" });
};

const login = async (req: requestUser, res: express.Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  if (!user.isVerified) {
    throw new CustomError.UnauthenticatedError("Please verify your email");
  }
  const tokenUser = createTokenUser(user);

  // create refresh token
  let refreshToken = "";

  // check for existing token
  const existingToken = await Token.findOne({ user: user._id });
  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid) {
      throw new CustomError.UnauthenticatedError("Invalid refresh token");
    }
    refreshToken = existingToken.refreshToken;
    attachCookiesToResponse({ res, user: tokenUser, refreshToken });
    res.status(StatusCodes.OK).json({ user: tokenUser });
  }

  refreshToken = crypto.randomBytes(40).toString("hex");
  const userAgent = req.headers["user-agent"];
  const ip = req.ip;
  const userToken = { refreshToken, ip, userAgent, user: user._id };

  await Token.create(userToken);

  attachCookiesToResponse({ res, user: tokenUser, refreshToken });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req: requestUser, res: express.Response) => {
  await Token.findOneAndDelete({
    user: req.user.userId,
  });
  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

export default {
  register,
  login,
  logout,
  verifyEmail,
};
