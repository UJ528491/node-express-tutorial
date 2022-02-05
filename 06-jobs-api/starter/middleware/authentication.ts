import UserModel from "../models/User";
import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors";

export const auth = (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Missing authorization header");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user to the job routes
    req.user = { userID: payload.userID, name: payload.name };

    next();
  } catch (error) {
    throw new UnauthenticatedError("Invalid token");
  }
};
