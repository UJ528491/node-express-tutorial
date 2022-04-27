import CustomError from "../errors";
import { isTokenValid } from "../utils";
import Token from "../models/Token";
import { attachCookiesToResponse } from "../utils";
import express from "express";

const authenticateUser = async (
  req: any,
  res: express.Response,
  next: express.NextFunction
) => {
  const { refreshToken, accessToken } = req.signedCookies;

  try {
    if (accessToken) {
      const payload: any = isTokenValid(accessToken);
      if (payload) {
        req.user = payload.user;
        return next();
      }
    }
    console.log("1");

    const payload: any = isTokenValid(refreshToken);
    console.log("2");
    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    });

    if (!existingToken || !existingToken?.isValid) {
      throw new CustomError.UnauthenticatedError("Invalid token");
    }
    console.log("3");
    attachCookiesToResponse({
      res,
      user: payload.user,
      refreshToken: existingToken.refreshToken,
    });
    console.log("4");
    req.user = payload.user;
    return next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
};

const authorizePermissions = (...roles: string[]) => {
  return (req: any, res: express.Response, next: express.NextFunction) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
    next();
  };
};

export { authenticateUser, authorizePermissions };
