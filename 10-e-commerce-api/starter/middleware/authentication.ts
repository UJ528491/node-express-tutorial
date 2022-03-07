import express from "express";
import CustomError from "../errors";
const authenticateUser = async (
  req: any,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new CustomError.UnauthenticatedError("Token is missing");
  } else {
    console.log("token is present");
  }
  next();
};

export default authenticateUser;
