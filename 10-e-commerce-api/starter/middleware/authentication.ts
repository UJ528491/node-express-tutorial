import express from "express";
import CustomError from "../errors";
import { isTokenValid } from "../utils";

const authenticateUser = async (
  req: any,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new CustomError.UnauthenticatedError("Token is missing");
  }
  try {
    const { name, userId, role } = isTokenValid({ token });
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Token is invalid");
  }
};

const authorizePermissions = (
  req: any,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.user.role !== "admin") {
    throw new CustomError.UnauthorizedError("You are not authorized");
  }
  next();
};

export { authenticateUser, authorizePermissions };
