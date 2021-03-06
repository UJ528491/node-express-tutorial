import User from "../models/User";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errors";
import {
  attachCookiesToResponse,
  createTokenUser,
  sendVerificationEmail,
  sendResetPasswordEmail,
  createHash,
} from "../utils";
import crypto from "crypto";
import Token from "../models/Token";
import express from "express";

const register = async (req: express.Request, res: express.Response) => {
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

  const origin = "http://localhost:3000";

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

const verifyEmail = async (req: express.Request, res: express.Response) => {
  const { verificationToken, email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.BadRequestError("Invalid user");
  }
  if (user.verificationToken !== verificationToken) {
    throw new CustomError.BadRequestError("Invalid verification token");
  }
  user.isVerified = true;
  user.verified = Date.now();
  user.verificationToken = "";

  await user.save();

  res.status(StatusCodes.OK).json({ msg: "Email verified!" });
};

const login = async (req: express.Request, res: express.Response) => {
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

  const token = await Token.create(userToken);

  attachCookiesToResponse({ res, user: tokenUser, refreshToken });

  res.status(StatusCodes.OK).json({ user: tokenUser, token });
};

const logout = async (req: express.Request, res: express.Response) => {
  if (req.user) {
    await Token.findOneAndDelete({
      user: req.user.userId,
    });
  }
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

const forgotPassword = async (req: express.Request, res: express.Response) => {
  const { email } = req.body;
  if (!email) {
    throw new CustomError.BadRequestError("Please provide email");
  }
  const user = await User.findOne({ email });
  if (user) {
    const passwordToken = crypto.randomBytes(70).toString("hex");
    // send email
    const origin = "http://localhost:3000";
    await sendResetPasswordEmail({
      name: user.name,
      email: user.email,
      token: passwordToken,
      origin,
    });

    const tenMinutes = 1000 * 60 * 10;
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);
    user.passwordToken = createHash(passwordToken);
    user.passwordTokenExpirationDate = passwordTokenExpirationDate;
    await user.save();
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: "Please check your email for reset password link" });
};
const resetPassword = async (req: express.Request, res: express.Response) => {
  const { token, email, password } = req.body;
  if (!token || !email || !password) {
    throw new CustomError.BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ email });
  if (user) {
    const currentDate = new Date();
    if (
      user.passwordToken === createHash(token) &&
      user.passwordTokenExpirationDate > currentDate
    ) {
      user.password = password;
      user.passwordToken = null;
      user.passwordTokenExpirationDate = null;
      await user.save();
    }
  }
  res.status(StatusCodes.OK).json({ msg: "Password reset successfully" });
};

export { register, login, logout, verifyEmail, forgotPassword, resetPassword };
